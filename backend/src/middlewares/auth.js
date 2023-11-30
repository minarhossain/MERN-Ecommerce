const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../secret');
const isLoggedIn = async (req, res, next) => {

    try {
        const token = req.cookies.access_token;
        if (!token) {
            throw createError(401, 'Access token not found')
        }
        const decoded = jwt.verify(token, jwtAccessKey);

        if (!decoded) {
            throw createError(401, 'Invalid access token, Please login.')
        }
        req.body.userId = decoded._id;
        next()
        // console.log(token);

    } catch (error) {
        next(error);
    }
}

module.exports = { isLoggedIn }