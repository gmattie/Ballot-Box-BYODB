/**
 * @description Users router module prefixed with the path /api/users.
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
 * @description JSON Web Token payload object populated by the id key of a user document.
 * 
 * @public
 * @constant
 * 
 */
const jwtPayload = (userId) => {

    return {

        user: {

            id: userId
        }
    };
};


/**
 * @description (POST) Register user with input validation and password encryption.
 * 
 * @public
 * @constant
 * 
 */
router.post(C.Route.USERS_REGISTER, [

        check(C.Model.USER_NAME, C.Error.USER_NAME)
            .not()
            .isEmpty({ ignore_whitespace: true })
            .trim(),

        check(C.Model.USER_EMAIL, C.Error.USER_EMAIL)
            .isEmail()
            .normalizeEmail(),

        check(C.Model.USER_PASSWORD, C.Error.USER_PASSWORD)
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

                [C.Model.USER_NAME]: name,
                [C.Model.USER_EMAIL]: email,
                [C.Model.USER_PASSWORD]: encryptedPassword
            });

            jwt.sign(

                jwtPayload(user.id),
                config.get(C.Config.JWT_TOKEN),
                { expiresIn: C.Auth.TOKEN_EXPIRATION },

                async (error, token) => {

                    if (error) {

                        return res
                            .status(C.Status.INTERNAL_SERVER_ERROR)
                            .send(error.message);
                    }

                    await user.save();

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
 * @description (POST) Login authentication of user credentials that responds with a JSON Web Token.
 * 
 * @public
 * @constant
 * 
 */
router.post(C.Route.USERS_LOGIN, [

        check(C.Model.USER_EMAIL, C.Error.USER_EMAIL).isEmail(),
        check(C.Model.USER_PASSWORD, C.Error.USER_PASSWORD).exists()
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

            jwt.sign(

                jwtPayload(user.id),
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
 * @description (GET) Authorize a user via middleware that verifies a JSON Web Token.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.USERS_AUTH, auth, async (req, res) => {
    
    try {

        const user = await User
            .findById(req.user.id)
            .select(`-${C.Model.USER_PASSWORD}`);

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
 * @description (PATCH) Update the name and/or password keys of an authorized user document.
 * 
 * @protected
 * @constant
 * 
 */
router.patch(C.Route.USERS_UPDATE, [auth, [

        check(C.Model.USER_NAME, C.Error.USER_NAME)
            .optional()
            .not()
            .isEmpty({ ignore_whitespace: true })
            .trim(),

        check(C.Model.USER_PASSWORD, C.Error.USER_PASSWORD)
            .optional()
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res
                .status(C.Status.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const update = req.body;

        try {

            if (update.password) {
                
                const salt = await bcryptjs.genSalt();
                const encryptedPassword = await bcryptjs.hash(update.password, salt);

                update.password = encryptedPassword;
            }

            const user = await User.findByIdAndUpdate(

                req.user.id,
                { $set: update },
                { new: true }
            );

            jwt.sign(

                jwtPayload(user.id),
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
 * @description (DELETE) Delete an authorized user document.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(C.Route.USERS_DELETE, auth, async (req, res) => {
    
    try {

        const user = await User
            .findByIdAndDelete(req.user.id)
            .select(`-${C.Model.USER_PASSWORD}`);

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
 * Export module
 * 
 */
module.exports = router;