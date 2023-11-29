// Validation Run  For run validation
const { validationResult } = require('express-validator');
const { errorResponse } = require('../controllers/responseController');


// When we make a validation after that we have run the validation other wise it will not work properly
// it will be work express middleware
const runValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        // jodi kono error empty na thake
        if (!errors.isEmpty()) {
            // console.log("From auth file: ", errors.array()[0].msg);
            // console.log(errors)
            return errorResponse(res, { statusCode: 422, message: errors.array()[0].msg });
        }
        return next();
    } catch (error) {
        return next(error)

    }
}

module.exports = runValidation;