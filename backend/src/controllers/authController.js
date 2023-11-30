const createError = require('http-errors');
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { successResponse } = require('./responseController');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtAccessKey } = require('../../src/secret');



const handleLogin = async (req, res, next) => {
    try {
        // take email and password from req.body
        const { email, password } = req.body;

        //check user is exists
        const user = await User.findOne({ email });

        if (!user) {
            throw createError(404, 'User does not exists with this email, Please register first')
        };

        // compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw createError(401, 'Email or Password does not match')
        };

        //check isBanned
        if (user.isBanned) {
            throw createError(401, 'You are banned Please contact authorize')
        };

        // token generate using jwt (jsonwebtoken)
        const accessToken = createJSONWebToken({ _id: user._id }, jwtAccessKey, '10m');

        // set token in the cookie
        res.cookie('access_token', accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            // secure: true,
            sameSite: 'none'
        })

        //success response
        return successResponse(res, {
            statusCode: 200,
            message: 'User is LoggedIn Successfully',
            payload: { token: accessToken }

        });
    } catch (error) {
        next(error);
    }

}


const handleLogout = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: 'User is Logged out Successfully',
            payload: {}

        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleLogin,
    handleLogout
};