/**
 * @description Validation middleware is used validate and sanitize input via Express Validator.
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
 * @description Sends a response of existing validation errors.
 * 
 * @public
 * @function
 * 
 */
const result = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res
            .status(C.Status.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    next();
};

/**
 * @description Validation for item add route.
 * 
 * @public
 * @constant
 * 
 */
const itemAdd = [

    check(C.Model.NAME, C.Error.NAME)
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim()
];

/**
 * @description Validation for item update route.
 * 
 * @public
 * @constant
 * 
 */
const itemUpdate = itemAdd;

/**
 * @description Validation for user login route.
 * 
 * @public
 * @constant
 * 
 */
const userLogin = [

    check(C.Model.EMAIL, C.Error.EMAIL)
        .isEmail(),

    check(C.Model.PASSWORD, C.Error.PASSWORD)
        .exists()
];

/**
 * @description Validation for user registration route.
 * 
 * @public
 * @constant
 * 
 */
const userRegister = [

    check(C.Model.NAME, C.Error.NAME)
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check(C.Model.EMAIL, C.Error.EMAIL)
        .isEmail()
        .normalizeEmail(),

    check(C.Model.PASSWORD, C.Error.PASSWORD)
        .not()
        .isEmpty()
];

/**
 * @description Validation for user update route.
 * 
 * @public
 * @constant
 * 
 */
const userUpdate = [

    check(C.Model.NAME, C.Error.NAME)
        .optional()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check(C.Model.PASSWORD, C.Error.PASSWORD)
        .optional()
        .not()
        .isEmpty()
];

/**
 * Export module
 * 
 */
module.exports = {
    
    itemAdd,
    itemUpdate,
    result,
    userLogin,
    userRegister,
    userUpdate
};