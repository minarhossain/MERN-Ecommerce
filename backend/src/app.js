const express = require("express");
const morgan = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');


const app = express();


// Middlewares use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For getting form related data handling 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/home', (req, res) => {

    console.log("Home is Running")
    res.status(200).json({ message: "GET:  Hello World" })
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