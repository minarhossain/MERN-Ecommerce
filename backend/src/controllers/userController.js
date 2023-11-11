const createError = require('http-errors');

const users = require('../models/userModel');

const getUser = (req, res, next) => {
    try {
        console.log("Home is Running")
        res.status(200).json({ message: "GET:  Hello World", data: users })
    } catch (error) {
        next(error)

    }
}

module.exports = {
    getUser
};