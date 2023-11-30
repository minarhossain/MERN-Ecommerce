const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById } = require('../controllers/userController');
const upload = require('../middlewares/uploadfile');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const { isLoggedIn } = require('../middlewares/auth');
const userRouter = express.Router();



userRouter.get('/', isLoggedIn, getUsers)
userRouter.post('/process-register', upload.single('image'), validateUserRegistration, runValidation, processRegister)
userRouter.post('/verify', activateUserAccount)
userRouter.get('/:id', isLoggedIn, getUserById)
userRouter.delete('/:id', isLoggedIn, deleteUserById)
userRouter.put('/:id', upload.single('image'), isLoggedIn, updateUserById)


module.exports = userRouter;