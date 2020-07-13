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

const { body, check, validationResult } = require("express-validator");
const C = require("../support/constants");
const mongoose = require("mongoose");

/**
 * @description A custom validator function that determines if the supplied URL argument is valid image URL.
 * Valid image URLs must begin with "http://" or "https://" and end with an image extension of either ".bmp", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".tif", ".tiff" or ".webp". 
 *  
 * @param {string} value - The string value to test. 
 * @private
 * @function
 * 
 */
const isImageURL = (value) => /^(http(s?):\/\/)(.+)(\.(bmp|gif|jpe?g|png|svg|tif?f|webp))$/i.test(value);

/**
 * @description A custom validator function that determines if the supplied argument matches the "password" property within the Request body object.
 * 
 * @param {string} value - The string value to test.
 * @param {object} express.req - The Express Request object.
 * @private
 * @function
 * 
 */
const isConfirmedPassword = (value, { req }) => value === req.body[C.Request.PASSWORD];

/**
 * @description A custom validator function that determines if the supplied arguments include valid "adminUsername" and "adminPassword" credentials for admin authorization.
 * 
 * @param {string} value - The string value to test.
 * @param {object} express.req - The Express Request object.
 * @private
 * @function
 * 
 */
const isAdminUsername = (value, { req }) => value === process.env.DB_USERNAME && req.body[C.Request.ADMIN_PASSWORD] === process.env.DB_PASSWORD;

/**
 * @description A custom validator function that determines if the supplied arguments include valid "adminPassword" and "adminUsername" credentials for admin authorization.
 * 
 * @param {string} value - The string value to test.
 * @param {object} express.req - The Express Request object.
 * @private
 * @function
 * 
 */
const isAdminPassword = (value, { req }) => value === process.env.DB_PASSWORD && req.body[C.Request.ADMIN_USERNAME] === process.env.DB_USERNAME

/**
 * @description Validation for /api/items/add route.
 * 
 * @public
 * @constant
 * 
 */
const itemAdd = [

    check(C.Request.ITEM, C.Error.ITEM)
        .isArray()
        .not()
        .isEmpty(),

    check(`${C.Request.ITEM}.*.${C.Request.NAME}`, C.Error.NAME)
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),
        
    check(`${C.Request.ITEM}.*.${C.Request.THUMBNAIL}`, C.Error.IMAGE_URL)
        .optional({ checkFalsy: true })
        .custom(isImageURL),

    check(`${C.Request.ITEM}.*.${C.Request.IMAGE}`, C.Error.IMAGE_URL)
        .optional({ checkFalsy: true })
        .custom(isImageURL),
];

/**
 * @description Validation for /api/items/edit route.
 * 
 * @public
 * @constant
 * 
 */
const itemEdit = [

    body().custom((value) => {

        const allowedKeys = [

            C.Request.NAME,
            C.Request.THUMBNAIL,
            C.Request.IMAGE,
            C.Request.ACTIVE
        ];

        for (const key of Object.keys(value)) {

            if (allowedKeys.indexOf(key) === -1) {

                return false;
            }
        }

        return true;
    }),

    check(C.Request.NAME, C.Error.NAME)
        .optional({ checkFalsy: true })
        .trim(),

    check(C.Request.THUMBNAIL, C.Error.IMAGE_URL)
        .optional({ checkFalsy: true })
        .custom(isImageURL),

    check(C.Request.IMAGE, C.Error.IMAGE_URL)
        .optional({ checkFalsy: true })
        .custom(isImageURL),
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
            .json({ error: errors.array() });
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

    body().custom((value) => {

        const allowedKeys = [

            C.Request.NAME,
            C.Request.PASSWORD,
            C.Request.PASSWORD_CONFIRM,
            C.Request.ADMIN_USERNAME,
            C.Request.ADMIN_PASSWORD
        ];

        for (const key of Object.keys(value)) {

            if (allowedKeys.indexOf(key) === -1) {

                return false;
            }
        }

        return true;
    }),

    check(C.Request.NAME, C.Error.NAME)
        .optional({ checkFalsy: true })
        .trim(),

    check(C.Request.PASSWORD, C.Error.PASSWORD)
        .optional({ checkFalsy: true }),
    
    check(C.Request.PASSWORD_CONFIRM, C.Error.PASSWORDS_DO_NOT_MATCH)
        .custom(isConfirmedPassword),

    check(C.Request.ADMIN_USERNAME, C.Error.USER_INVALID_CREDENTIALS)
        .optional({ checkFalsy: true })
        .custom(isAdminUsername),

    check(C.Request.ADMIN_PASSWORD, C.Error.USER_INVALID_CREDENTIALS)
        .optional({ checkFalsy: true })
        .custom(isAdminPassword)
];

/**
 * @description Validation for /api/users/login route.
 * 
 * @public
 * @constant
 * 
 */
const userLogin = [

    check(C.Request.EMAIL, C.Error.EMAIL)
        .isEmail(),

    check(C.Request.PASSWORD, C.Error.PASSWORD)
        .not()
        .isEmpty()
];

/**
 * @description Validation for /api/users/register route.
 * 
 * @public
 * @constant
 * 
 */
const userRegister = [

    check(C.Request.NAME, C.Error.NAME)
        .not()
        .isEmpty({ ignore_whitespace: true })
        .trim(),

    check(C.Request.EMAIL, C.Error.EMAIL)
        .isEmail()
        .normalizeEmail(),

    check(C.Request.PASSWORD, C.Error.PASSWORD)
        .not()
        .isEmpty(),

    check(C.Request.PASSWORD_CONFIRM, C.Error.PASSWORDS_DO_NOT_MATCH)
        .custom(isConfirmedPassword),

    check(C.Request.ADMIN_USERNAME, C.Error.USER_INVALID_CREDENTIALS)
        .optional({ checkFalsy: true })
        .custom(isAdminUsername),

    check(C.Request.ADMIN_PASSWORD, C.Error.USER_INVALID_CREDENTIALS)
        .optional({ checkFalsy: true })
        .custom(isAdminPassword)
];

/**
 * @description Validation for /api/users/reset route.
 * 
 * @public
 * @constant
 * 
 */
const userReset = [

    check(C.Request.EMAIL, C.Error.EMAIL)
        .isEmail(),

    check(C.Request.PASSWORD, C.Error.PASSWORD)
        .not()
        .isEmpty(),

    check(C.Request.PASSWORD_CONFIRM, C.Error.PASSWORDS_DO_NOT_MATCH)
        .custom(isConfirmedPassword)
];

/**
 * @description Validation for /api/votes/cast route.
 * 
 * @public
 * @constant
 * 
 */
const voteCast = [

    check(C.Request.CAST, C.Error.CAST)
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

    check(`${C.Request.CAST}.*.${C.Request.ITEM}`, C.Error.ITEM)
        .custom((value) => mongoose.Types.ObjectId.isValid(value)),

    check(`${C.Request.CAST}.*.${C.Request.RANK}`, C.Error.RANK)
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

    check(C.Request.DEADLINE, C.Error.DEADLINE)
        .isInt()
        .custom((value) => value == 0 || (value >= 1000 && value <= 31557600000)),

    check(C.Request.QUANTITY, C.Error.QUANTITY)
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
    userReset,
    voteCast,
    voteOpen, 
};