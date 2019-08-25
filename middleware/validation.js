/**
 * @description Validation middleware is used validate and sanitize input via Express Validator.
 * 
 * @requires constants
 * @requires express-validator
 * @requires mongoose
 * @public
 * @module
 * 
 */

const { check, validationResult } = require("express-validator");
const C = require("../support/constants");
const mongoose = require("mongoose");

/**
 * @description Validation for /api/items/add route.
 * 
 * @public
 * @constant
 * 
 */
const itemAdd = [

    check(C.Model.ITEM, C.Error.ITEM)
        .isArray()
        .not()
        .isEmpty(),

    check(`${C.Model.ITEM}.*.${C.Model.NAME}`, C.Error.NAME)
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check(`${C.Model.ITEM}.*.${C.Model.IMAGE}`, C.Error.IMAGE)
        .optional()
        .isURL()
];

/**
 * @description Validation for /api/items/edit route.
 * 
 * @public
 * @constant
 * 
 */
const itemEdit = [

    check(C.Model.NAME, C.Error.NAME)
        .optional()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check(C.Model.IMAGE, C.Error.IMAGE)
        .optional()
        .isURL()
];

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
 * @description Validation for /api/users/edit route.
 * 
 * @public
 * @constant
 * 
 */
const userEdit = [

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
 * @description Validation for /api/users/login route.
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
 * @description Validation for /api/users/register route.
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
 * @description Validation for /api/votes/cast route.
 * 
 * @public
 * @constant
 * 
 */
const voteCast = [

    check(C.Model.CAST, C.Error.CAST)
        .isArray()
        .not()
        .isEmpty()
        .custom((array) => {
            
            const items = new Set();
            const ranks = new Set();

            for (const element of array) {

                items.add(element.item);
                ranks.add(element.rank);
            }

            const isUnique = (items.size === array.length && ranks.size === array.length);

            const isOrdered = Array
                .from(ranks)
                .sort((a, b) => a - b)
                .every((element, index) => parseInt(element) === index);

            return (isUnique && isOrdered);
        }),

    check(`${C.Model.CAST}.*.${C.Model.ITEM}`, C.Error.ITEM)
        .custom((value) => mongoose.Types.ObjectId.isValid(value)),

    check(`${C.Model.CAST}.*.${C.Model.RANK}`, C.Error.RANK)
        .isInt({ min: 0 })
];

/**
 * @description Validation for /api/votes/open route.
 * 
 * @public
 * @constant
 * 
 */
const voteOpen = [

    check(C.Model.DEADLINE, C.Error.DEADLINE)
        .isInt({ min: 0, max: 31622400 }),

    check(C.Model.QUANTITY, C.Error.QUANTITY)
        .isInt({ min: 1 })
];

/**
 * Export module
 * 
 */
module.exports = {
    
    itemAdd,
    itemEdit,
    result,
    userEdit,
    userLogin,
    userRegister,
    voteCast,
    voteOpen, 
};