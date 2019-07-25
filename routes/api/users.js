/**
 * @description Users router module prefixed with the path /api/users.
 * 
 * @requires bcryptjs
 * @requires constants
 * @requires express
 * @requires express-validator
 * @requires User
 * @public
 * @module
 * 
 */
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const C = require("../../support/constants");
const router = require("express").Router();
const User = require("../../models/User");

/**
 * @description POST register user endpoint with validation and password encryption.
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
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res
                .status(C.Status.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            const userExists = await User.findOne({ email });

            if (userExists) {

                return res
                    .status(C.Status.BAD_REQUEST)
                    .json({ errors: [{ msg: C.Error.USER_ALREADY_EXISTS }] });
            }

            const salt = await bcryptjs.genSalt();
            const encryptedPassword = await bcryptjs.hash(password, salt);

            const user = new User({

                name,
                email,
                password: encryptedPassword
            });

            await user.save();

            return res
                .status(C.Status.OK)
                .send(C.Message.USER_REGISTERED);
        }
        catch(error) {

            return res
                .status(C.Status.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

/**
 * Export module
 * 
 */
module.exports = router;