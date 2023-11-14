const createError = require('http-errors');
const mongoose = require('mongoose');
const fs = require('fs').promises;

const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jsonSecretKey, clientURL } = require('../secret');
const emailWithNodemailer = require('../helper/email');

// get all users and by his pagination
const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            // jara admin na tader filter we can use name email phone
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        };
        const options = {
            password: 0,
        }
        const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit);
        const count = await User.find(filter).countDocuments();
        if (!users) throw createError(404, "User Not Found")


        // think more this pagination code again and again
        // res.status(200).json({
        //     message: "Users Were Returned",
        //     users,
        //     pagination: {
        //         totalPages: Math.ceil(count / limit),
        //         currentPage: page,
        //         previousPage: page - 1 > 0 ? page - 1 : null,
        //         nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        //     }
        // })

        return successResponse(res, {
            statusCode: 200,
            message: "Users Were Returned Successfully",
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}



// get a single user by his id

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 }
        const user = await findWithId(User, id, options);
        return successResponse(res, {
            statusCode: 200,
            message: "User Returned Successfully",
            payload: {
                user: user
            }
        });
    } catch (error) {
        next(error);
    }
}



const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };
        const user = await findWithId(User, id, options);

        const userImagePath = user.image;

        deleteImage(userImagePath)

        // fs.access(userImagePath, (error) => {
        //     if (error) {
        //         console.error('User Image Does not exists')

        //     } else {
        //         fs.unlink(userImagePath, (error) => {
        //             if (error) throw error;
        //             console.log("User image is deleted")
        //         })
        //     }
        // })

        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false
        })

        return successResponse(res, {
            statusCode: 200,
            message: "User Delete Successfully!",
        });
    } catch (error) {
        next(error)

    }
}


// Process Register
const processRegister = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const userExists = await User.exists({ email: email });

        if (userExists) {
            throw createError(409, "User Already Exists, Please Login")
        }

        // create webtoken with json
        const token = createJSONWebToken({ name, email, password, phone, address }, jsonSecretKey, '10m');

        // prepare email
        const emailData = {
            email,
            subject: 'Account Activation Mail',
            html: `
            <h2>Hello ${name} !</h2>
            <p>Please Click here to <a href="${clientURL}/api/users/activate/${token}" target="_blank">activate your account</a></p>
            `
        }

        // send email with nodemailer
        try {

            await emailWithNodemailer(emailData)
        } catch (error) {
            next(createError(500, "Fail to Send Verification email"));
            return
        }


        return successResponse(res, {
            statusCode: 200,
            message: `Please Go to your email for completing your ${email} registration`,
            payload: { token }

        });
    } catch (error) {
        next(error)

    }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUserById,
    processRegister
};