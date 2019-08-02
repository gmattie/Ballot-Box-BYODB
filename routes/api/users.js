/**
 * @description Users router module prefixed with the path /api/users.
 * 
 * @requires auth
 * @requires bcryptjs
 * @requires config
 * @requires constants
 * @requires express
 * @requires jsonwebtoken
 * @requires User
 * @requires utils
 * @requires validation
 * @public
 * @module
 * 
 */
const auth = require("../../middleware/auth");
const bcryptjs = require("bcryptjs");
const C = require("../../support/constants");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../../models/User");
const utils = require("../../support/utilities");
const validation = require("../../middleware/validation");

/**
 * @description Returns an encrypted password.
 * 
 * @param {string} password - The target password to encrypt.
 * @returns (string) The encrypted password.
 * @public
 * @function
 * 
 */
const getEncryptedPassword = async (password) => {

    try {

        return await bcryptjs.hash(password, 10);
    }
    catch (error) {

        throw new Error(error);
    }
};

/**
 * @description Returns an encrypted signature partition of a JSON Web Token.
 * 
 * @param {string} token - The target JSON Web Token.
 * @returns {string} An encrypted signature partition of the target JSON Web Token.
 * @public
 * @function
 * 
 */
const getEncryptedTokenSignature = async (token) => {

    try {

        const tokenSignature = utils.getTokenSignature(token);
        
        return await bcryptjs.hash(tokenSignature, 10);
    }
    catch (error) {

        throw new Error(error);
    }
};

/**
 * @description Returns a JSON Web Token payload object populated by the id value of a user document.
 * 
 * @param {string} userId - An id value of a user document assigned to the payload object.
 * @returns {object} A JSON Web Token payload object.
 * @public
 * @function
 * 
 */
const getJWTPayload = (userId) => {

    return {

        user: {

            id: userId
        }
    };
};

/**
 * @description (GET) Get A list of all users.
 * Only admin users are authorized to retrieve the list of all user documents via token and admin authentication.
 * 
 * @protected
 * @constant
 * 
 */
router.get("/", auth, async (req, res) => {
    
    try {

        const user = res.locals.user;

        if (user.admin) {

            const users = await User
                .find({})
                .select(`${C.Model.USER_NAME} ${C.Model.USER_EMAIL}`);

            return res
                .status(C.Status.OK)
                .json({ users });
        }
        else {

            throw new Error(C.Error.USER_INVALID_CREDENTIALS);
        }
    }
    catch (error) {
        
        if (error.message === C.Error.USER_INVALID_CREDENTIALS) {

            return res
                .status(C.Status.UNAUTHENTICATED)
                .send(C.Error.USER_INVALID_CREDENTIALS);
        }

        return res
            .status(C.Status.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

/**
 * @description (GET) Check user authentication.
 * User authentication is verified by the presence and/or validity of the token value in the user document.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.AUTH, auth, (req, res) => {
    
    const user = res.locals.user;

    return res
        .status(C.Status.OK)
        .json({ user });
});

/**
 * @description (POST) Register user with input validation and password encryption.
 * 
 * @public
 * @constant
 * 
 */
router.post(C.Route.USERS_REGISTER, [
    
        validation.register,
        validation.result
    ],
    async (req, res) => {

        const { name, email, password, adminUser, adminPass } = req.body;

        try {

            const userExists = await User.findOne({ email });

            if (userExists) {

                throw new Error(C.Error.USER_ALREADY_EXISTS);
            }

            const user = new User({

                [C.Model.USER_NAME]: name,
                [C.Model.USER_EMAIL]: email,
                [C.Model.USER_PASSWORD]: await getEncryptedPassword(password)
            });

            const dbURI = config.get(C.Config.DB_URI);
            const validAdminUser = adminUser === dbURI.user;
            const validAdminPass = adminPass === dbURI.pass;
            
            user[C.Model.USER_ADMIN] = (validAdminUser && validAdminPass);

            const token = await jwt.sign(

                getJWTPayload(user.id),
                config.get(C.Config.JWT_TOKEN),
                { expiresIn: C.Auth.TOKEN_EXPIRATION }
            );

            user[C.Model.USER_TOKEN] = await getEncryptedTokenSignature(token);

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ token });
        }
        catch (error) {

            if (error.message === C.Error.USER_ALREADY_EXISTS) {

                return res
                    .status(C.Status.BAD_REQUEST)
                    .send(C.Error.USER_ALREADY_EXISTS);
            }

            return res
                .status(C.Status.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

/**
 * @description (POST) Login authentication of validated user credentials that responds with a JSON Web Token.
 * 
 * @public
 * @constant
 * 
 */
router.post(C.Route.USERS_LOGIN, [

        validation.login,
        validation.result
    ],
    async (req, res) => {

        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });

            if (!user) {

                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            const validPassword = await bcryptjs.compare(password, user.password);

            if (!validPassword) {

                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            const token = await jwt.sign(

                getJWTPayload(user.id),
                config.get(C.Config.JWT_TOKEN),
                { expiresIn: C.Auth.TOKEN_EXPIRATION }
            );

            user[C.Model.USER_TOKEN] = await getEncryptedTokenSignature(token);

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ token });
        }
        catch (error) {

            if (error.message === C.Error.USER_INVALID_CREDENTIALS) {

                return res
                .status(C.Status.UNAUTHENTICATED)
                .send(C.Error.USER_INVALID_CREDENTIALS);
            }

            return res
                .status(C.Status.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

/**
 * @description (PATCH) Update a user.
 * All users are authorized to update the name, password and admin values of their own user document via token authentication.
 * 
 * @protected
 * @constant
 * 
 */
router.patch(C.Route.USERS_UPDATE, [
    
        auth,
        validation.update,
        validation.result
    ],
    async (req, res) => {

        try {
            
            const user = res.locals.user;
            const { name, password, adminUser, adminPass } = req.body;

            if (name) {

                user[C.Model.USER_NAME] = name;
            }

            if (password) {
                
                user[C.Model.USER_PASSWORD] = await getEncryptedPassword(password);
            }

            const dbURI = config.get(C.Config.DB_URI);

            if (adminUser && adminPass) {

                user[C.Model.USER_ADMIN] = (adminUser === dbURI.user && adminPass === dbURI.pass);
            }

            const token = await jwt.sign(

                getJWTPayload(user.id),
                config.get(C.Config.JWT_TOKEN),
                { expiresIn: C.Auth.TOKEN_EXPIRATION }
            );

            user[C.Model.USER_TOKEN] = await getEncryptedTokenSignature(token);

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ token });            
        }
        catch (error) {

            return res
                .status(C.Status.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

/**
 * @description (GET) Logout a user.
 * All users are authorized to logout and revoke authorization by deleting the token property from their own user document. 
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.USERS_LOGOUT, auth, async (req, res) => {

    const user = res.locals.user;

    try {

        user[C.Model.USER_TOKEN] = undefined;
        
        await user.save();

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
 * @description (DELETE) Delete a user document.
 * All users are authorized to delete their own user document via token authentication.
 * Admin users, via admin authentication, are authorized to delete any user document by providing an optional valid user ID request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(`${C.Route.USERS_DELETE}/:${C.Route.PARAM_USER_ID}?`, auth, async (req, res) => {
    
    try {
        
        const user = res.locals.user;
        const paramUserID = req.params[C.Route.PARAM_USER_ID];
        let deletedUser;

        if (paramUserID) {

            if (user.admin) {

                deletedUser = await User
                    .findByIdAndRemove(paramUserID)
                    .select(`${C.Model.USER_NAME} ${C.Model.USER_EMAIL}`);

                if (!deletedUser) {
                    
                    throw new Error(C.Error.USER_INVALID_CREDENTIALS);
                }
            }
            else {

                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }
        }
        else {

            deletedUser = await user.deleteOne();
        }

        return res
            .status(C.Status.OK)
            .json({ deletedUser });
    }
    catch (error) {
        
        if (error.message === C.Error.USER_INVALID_CREDENTIALS) {

            return res
                .status(C.Status.UNAUTHENTICATED)
                .send(C.Error.USER_INVALID_CREDENTIALS);
        }

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