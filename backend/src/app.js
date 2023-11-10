const express = require("express");
const morgan = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const app = express();

// You can use it individual route 

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes",

})


// Middlewares use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For getting form related data handling 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xss());
app.use(rateLimiter)






app.get('/home', (req, res) => {

    console.log("Home is Running")
    res.status(200).json({ message: "GET:  Hello World" })
})

// client error handling (client and server error will be work both one will not be work)
app.use((req, res, next) => {
    next(createError(404, "From http-errors Route Not Found"))
})

// Server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
})

// handle express client error handling if any wrong api hit will show this message
// app.use((req, res, next) => {
//     res.status(404).json({ message: "Route Not Found" })
//   next();
// })


// Server error handling
// app.use((err, req, res, next) => {
//     console.log(err.status)
//     res.status(err.status || 500).json({ message: err.message });

// })

module.exports = app;