/**
 * @description Auth router module prefixed with the path /api/auth.
 * 
 * @requires auth
 * @requires bcryptjs
 * @requires config
 * @requires constants
 * @requires express
 * @requires express-validator
 * @requires jsonwebtoken
 * @requires User
 * @public
 * @module
 * 
 */
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcryptjs = require("bcryptjs");
const C = require("../../support/constants");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../../models/User");

/**
 * @description GET Access user info via auth middleware.
 * 
 * @public
 * @constant
 * 
 */
router.get("/", auth, async (req, res) => {
    
    try {

        const user = await User
            .findById(req.user.id)
            .select(`-${C.User.PASSWORD}`);

        return res
            .status(C.Status.OK)
            .json({ user });
    }
    catch (error) {

        return res
            .status(C.Status.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

/**
 * @description POST authenticate login user credentials and send JSON Web Token.
 * 
 * @public
 * @constant
 * 
 */
router.post("/", [

        check(C.User.EMAIL, C.Error.USER_EMAIL).isEmail(),
        check(C.User.PASSWORD, C.Error.USER_PASSWORD).exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res
                .status(C.Status.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });

            if (!user) {

                return res
                    .status(C.Status.UNAUTHORIZED)
                    .json({ errors: [{ msg: C.Error.USER_INVALID_CREDENTIALS }] });
            }

            const validPassword = await bcryptjs.compare(password, user.password);

            if (!validPassword) {

                return res
                    .status(C.Status.UNAUTHORIZED)
                    .json({ errors: [{ msg: C.Error.USER_INVALID_CREDENTIALS }] });
            }

            const jwtPayload = {

                user: {

                    id: user.id
                }
            };

            jwt.sign(

                jwtPayload,
                config.get(C.Config.JWT_TOKEN),
                { expiresIn: C.Auth.TOKEN_EXPIRATION },

                (error, token) => {

                    if (error) {

                        return res
                            .status(C.Status.INTERNAL_SERVER_ERROR)
                            .send(error.message);
                    }

                    return res
                        .status(C.Status.OK)
                        .json({ token });
                }

            );
        }
        catch (error) {

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