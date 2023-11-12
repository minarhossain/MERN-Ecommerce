const createError = require('http-errors');

const User = require('../models/userModel');
const { successResponse } = require('./responseController');

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

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 }
        const user = await User.findById(id, options);
        if (!user) throw createError(404, "User Not Found Does not exist")

        return successResponse(res, {
            statusCode: 200,
            message: "User Was Returned Successfully",
            payload: {
                user: user
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUser
};