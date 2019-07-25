/**
 * @description Users router module prefixed with the path /api/users.
 * 
 * @requires constants
 * @requires express
 * @requires express-validator
 * @public
 * @module
 * 
 */
const { check, validationResult } = require("express-validator");
const C = require("../../support/constants");
const router = require("express").Router();

/**
 * @description POST register user endpoint with validation.
 * 
 * @public
 * @constant
 * 
 */
router.post("/", [

        check(C.User.NAME, C.Error.USER_NAME)
            .not()
            .isEmpty({ ignore_whitespace: true })
            .trim(),

        check(C.User.EMAIL, C.Error.USER_EMAIL)
            .isEmail()
            .normalizeEmail(),

        check(C.User.PASSWORD, C.Error.USER_PASSWORD)
            .not()
            .isEmpty()
    ],
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res
                .status(C.Status.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        return res
            .status(C.Status.OK)
            .json(req.body);
    }
);

/**
 * Export module
 * 
 */
module.exports = router;