const express = require('express');

const { validateUserRegistration } = require('../validators/auth');
const handleLogin = require('../controllers/authController');

const authRouter = express.Router();



authRouter.post('/login', handleLogin)


module.exports = authRouter;