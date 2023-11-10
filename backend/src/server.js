const express = require("express");
const morgan = require('morgan');
const PORT = 5000;

const app = express();


// Middlewares use
app.use(express.json());
app.use(morgan('dev'));


app.get('/home', (req, res) => {
    res.status(200).json({ message: "GET:  Hello World" })
})

app.put('/home', (req, res) => {
    res.status(200).json({ message: "PUT:  Hello World" })
})

app.post('/home', (req, res) => {
    res.status(200).json({ message: "POST:  Hello World" })
})

app.delete('/home', (req, res) => {
    res.status(200).json({ message: "DELETE:  Hello World" })
})

app.listen(PORT, () => {
    console.log(`Server running  http://localhost:${PORT}`);
})