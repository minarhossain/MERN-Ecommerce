const express = require('express');
const { getUsers } = require('../controllers/userController');
const userRouter = express.Router();



userRouter.get('/users', getUsers)


module.exports = userRouter;