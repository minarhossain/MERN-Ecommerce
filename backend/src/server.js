const express = require("express");
const morgan = require('morgan');
const PORT = 5000;

const app = express();


// Middlewares use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For getting form related data handling 



// middleware
const isLoggedIn = (req, res, next) => {
    const login = true;
    if (login) {
        req.body.id = 101;
        next();
    } // if login is true then next
    else {
        res.status(401).json({ message: "Login First" })
    } // if login is false then error

}

app.get('/home', isLoggedIn, (req, res) => {
    console.log('Id form body: ', req.body.id)
    console.log("Home is Running")
    res.status(200).json({ message: "GET:  Hello World" })
})



app.listen(PORT, () => {
    console.log(`Server running  http://localhost:${PORT}`);
})