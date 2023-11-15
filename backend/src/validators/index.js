// Validation Run korar jonno
const { validationResult } = require('express-validator');
const { errorResponse } = require('../controllers/responseController');


// When we make a validation after that we have run the validation other wise it will not work properly

const runValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array()[0].msg);
            return errorResponse(res, { statusCode: 422, message: errors.array()[0].msg });
        }
        return next();
    } catch (error) {
        return next(error)

    }
}

module.exports = runValidation;