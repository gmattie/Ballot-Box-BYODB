/**
 * @description Validation middleware is used validate and sanitize user input via Express Validator.
 * 
 * @requires constants
 * @requires express-validator
 * @public
 * @module
 * 
 */

const { check, validationResult } = require("express-validator");
const C = require("../support/constants");

/**
 * @description Validation for user registration.
 * 
 * @public
 * @constant
 * 
 */
const register = [

    check(C.Model.USER_NAME, C.Error.USER_NAME)
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check([C.Model.USER_EMAIL], C.Error.USER_EMAIL)
        .isEmail()
        .normalizeEmail(),

    check(C.Model.USER_PASSWORD, C.Error.USER_PASSWORD)
        .not()
        .isEmpty()
];

/**
 * @description Validation for user login.
 * 
 * @public
 * @constant
 * 
 */
const login = [

    check(C.Model.USER_EMAIL, C.Error.USER_EMAIL)
        .isEmail(),

    check(C.Model.USER_PASSWORD, C.Error.USER_PASSWORD)
        .not()
        .isEmpty()
];

/**
 * @description Validation for user update.
 * 
 * @public
 * @constant
 * 
 */
const update = [

    check(C.Model.USER_NAME, C.Error.USER_NAME)
        .optional()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check(C.Model.USER_PASSWORD, C.Error.USER_PASSWORD)
        .optional()
        .not()
        .isEmpty()
];

/**
 * @description Sends a response of existing validation errors.
 * 
 * @public
 * @constant
 * 
 */
const result = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res
            .status(C.Status.BAD_REQUEST)
            .send({ error: errors.array() });
    }

    next();
};

/**
 * Export module
 * 
 */
module.exports = {
    
    login,
    register,
    result,
    update
};