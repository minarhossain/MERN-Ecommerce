const { body } = require('express-validator');

//Registration validation

const validateUserRegistration = [
    body("name").trim().notEmpty().withMessage("Name is Required").isLength({ min: 3, max: 31 }).withMessage('Name should be 3 to 31 characters long'),

    body("email").trim().notEmpty().withMessage("Email is Required").isEmail().withMessage('Invalid'),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is Required").isLength({ min: 3 }).withMessage('Password Should be at least 6 characters').matches(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/).withMessage('Password should contain al least one uppercase , one  letter, one number, and one special character'),

    body("address").trim().notEmpty().withMessage("Address is Required").isLength({ min: 3 }).withMessage('Address must be provide'),

    body("phone").trim().notEmpty().withMessage("Phone is Required"),

    body("image")
        .custom((value, { req }) => {
            if (!req.file || !req.file.buffer) {
                throw new Error('User image is required');
            }
            return true;
        }).withMessage("User image is required"),

];
// signIn validation

module.exports = { validateUserRegistration }