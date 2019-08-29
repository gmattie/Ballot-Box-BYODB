/**
 * @description Users router module prefixed with the path /api/users.
 * 
 * @requires auth
 * @requires bcryptjs
 * @requires constants
 * @requires express
 * @requires jsonwebtoken
 * @requires mongoose
 * @requires nodemailer
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
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const router = require("express").Router();
const User = require("../../models/User");
const utils = require("../../support/utilities");
const validation = require("../../middleware/validation");

/**
 * @description Returns an encrypted password.
 * 
 * @param {string} password - The target password to encrypt.
 * @returns (string) The encrypted password.
 * @private
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
 * @private
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
 * @description Returns a JSON Web Token signed with the ID of a user document.
 * 
 * @param {string} userID - The ID of a user document assigned to the JSON Web Token payload.
 * @returns {object} A JSON Web Token.
 * @private
 * @function
 * 
 */
const getJWT = async (userID) => {

    const payload = {

        user: {

            id: userID
        }
    };

    return await jwt.sign(

        payload,
        process.env.JWT_TOKEN,
        { expiresIn: C.Auth.TOKEN_EXPIRATION }
    );
};

/**
 * @description (POST) Register a user.
 * Users are registered by providing "name", "email" and "password" values within the HTTP request body.
 * Admin users are registered by additionally providing valid credentials for both "adminUser" and "adminPass" within the HTTP request body.
 * The registered email address must be verified in order to activate the account and complete user registration.
 * 
 * @public
 * @constant
 * 
 */
router.post(C.Route.REGISTER, [
    
        validation.userRegister,
        validation.result
    ],
    async (req, res) => {

        try {
            
            const { name, email, password, adminUser, adminPass } = req.body;

            const validAdminUser = (adminUser === process.env.DB_USER);
            const validAdminPass = (adminPass === process.env.DB_PASS);

            const userExists = await User.findOne({ email });

            if (userExists) {

                throw new Error(C.Error.USER_ALREADY_EXISTS);
            }

            const user = new User({

                [C.Model.ADMIN]: (validAdminUser && validAdminPass),
                [C.Model.EMAIL]: email,
                [C.Model.IP]: req.ip,
                [C.Model.NAME]: name,
                [C.Model.PASSWORD]: await getEncryptedPassword(password)
            });

            const encodedEmail = encodeURIComponent(user[C.Model.EMAIL]);
            const encodedPassword = encodeURIComponent(user[C.Model.PASSWORD]);
            const query = `?${C.Model.EMAIL}=${encodedEmail}&${C.Model.PASSWORD}=${encodedPassword}`;
            const buttonURL = `${req.protocol}://${req.get("host")}${C.Route.API_USERS}${C.Route.VERIFY}${query}`;
            const html = `
            
                <p>${user[C.Model.NAME]},<p>
                <p>${C.Email.MESSAGE}</p>
                <a style="${C.Email.BUTTON_STYLE}" href="${buttonURL}">
                    ${C.Email.BUTTON_LABEL}
                </a>
            `;
            
            const transporter = nodemailer.createTransport({
            
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
            
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({

                from: `${process.env.npm_package_productName} <${process.env.SMTP_USER}>`,
                to: email,
                subject: C.Email.SUBJECT,
                html: html
            });

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ email: user[C.Model.EMAIL] });
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (GET) Verify the email address registered to a user.
 * User accounts are activated upon successful verification of the email address that has been registered to the user.
 * 
 * @public
 * @constant
 * 
 */
router.get(C.Route.VERIFY, async (req, res) => {

        try {

            const { email, password } = req.query;
            const user = await User.findOne({ email });
            
            if (!user || (user[C.Model.PASSWORD] !== password)) {
                
                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            if (user[C.Model.ACTIVE]) {

                return res.sendStatus(C.Status.OK);
            }
            
            const token = await getJWT(user.id);

            user[C.Model.ACTIVE] = true;
            user[C.Model.IP] = req.ip;
            user[C.Model.TOKEN] = await getEncryptedTokenSignature(token);

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ token });
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (POST) Login a user.
 * Users are logged in by providing valid credentials for both "email" and "password" within the HTTP request body.
 * 
 * @public
 * @constant
 * 
 */
router.post(C.Route.LOGIN, [

        validation.userLogin,
        validation.result
    ],
    async (req, res) => {

        try {

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !user[C.Model.ACTIVE]) {

                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            const validPassword = await bcryptjs.compare(password, user.password);

            if (!validPassword) {

                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            const token = await getJWT(user.id);

            user[C.Model.IP] = req.ip;
            user[C.Model.TOKEN] = await getEncryptedTokenSignature(token);

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ token });
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (PATCH) Update a user.
 * All users are authorized to update the name, password and admin values of their own user document via token authentication.
 * 
 * All users are authorized to edit their own existing User document by providing a valid user ID as a request parameter.
 * Users are edited by providing option "name", "password", "adminUser" and/or "adminPass" values within the HTTP request body.
 * 
 * @protected
 * @constant
 * 
 */
router.patch(C.Route.EDIT, [
    
        auth,
        validation.userEdit,
        validation.result
    ],
    async (req, res) => {

        try {
            
            const user = res.locals[C.Local.USER];
            const { name, password, adminUser, adminPass } = req.body;

            if (name) {

                user[C.Model.NAME] = name;
            }

            if (password) {
                
                user[C.Model.PASSWORD] = await getEncryptedPassword(password);
            }

            if (adminUser && adminPass) {

                user[C.Model.ADMIN] = (adminUser === process.env.DB_USER && adminPass === process.env.DB_PASS);
            }

            const token = await getJWT(user.id);

            user[C.Model.DATE] = Date.now();
            user[C.Model.TOKEN] = await getEncryptedTokenSignature(token);

            await user.save();

            return res
                .status(C.Status.OK)
                .json({ token });            
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (GET) Information on one of more users.
 * All users are authorized to log out via token authentication and optionally providing their own valid user ID as a request parameter.
 * Admin users, via admin authentication, are authorized to log out any user by providing an optional valid user ID request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.get(`${C.Route.LOGOUT}/:${C.Route.PARAM}?`, auth, async (req, res) => {
    
    try {
        
        const user = res.locals[C.Local.USER];
        const paramUserID = req.params[C.Route.PARAM];
        let result;

        if (user.admin) {

            if (paramUserID) {

                const isValidUserID = mongoose.Types.ObjectId.isValid(paramUserID);

                if (!isValidUserID) {

                    throw new Error(C.Error.USER_DOES_NOT_EXIST);
                }

                result = (paramUserID === user.id) ? user : await User
                    .findById(paramUserID)
                    .select(`${C.Model.EMAIL} ${C.Model.NAME}`);

                if (!result) {

                    throw new Error(C.Error.USER_DOES_NOT_EXIST);
                }
            }
            else {

                result = user;
            }
        }
        else {

            if (paramUserID && paramUserID !== user.id) {
                
                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            result = user;
        }

        result[C.Model.TOKEN] = undefined;
        
        await result.save();

        return res
            .status(C.Status.OK)
            .send({ user: result });
    }
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});

/**
 * @description (DELETE) Delete a user.
 * All users are authorized to delete their own user document by providing their own valid user ID as a request parameter.
 * Admin users, via admin authentication, are authorized to delete any user document by providing a valid user ID request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(`${C.Route.DELETE}/:${C.Route.PARAM}`, auth, async (req, res) => {
    
    try {
        
        const user = res.locals[C.Local.USER];
        const paramUserID = req.params[C.Route.PARAM];
        const isValidUserID = mongoose.Types.ObjectId.isValid(paramUserID);
        let result;

        if (!isValidUserID) {

            throw new Error(C.Error.USER_DOES_NOT_EXIST);
        }

        if (user.admin || (paramUserID === user.id)) {

            result = await User
                .findByIdAndRemove(paramUserID)
                .select(`${C.Model.ADMIN} ${C.Model.EMAIL} ${C.Model.NAME}`);
        }
        else{

            throw new Error(C.Error.USER_INVALID_CREDENTIALS);
        }

        if (!result) {
            
            throw new Error(C.Error.USER_DOES_NOT_EXIST);
        }

        return res
            .status(C.Status.OK)
            .json({ user: result });
    }
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});

/**
 * @description (GET) Retrieve an array of either one or all users.
 * All users are authorized to retrieve their own user document via token authentication or by providing their own valid user ID as a request parameter.
 * Admin users, via admin authentication, are authorized to retrieve either a list of all users or a single user by optionally providing a valid user ID as a request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.get(`/:${C.Route.PARAM}?`, auth, async (req, res) => {

    try {

        const user = res.locals[C.Local.USER];
        const paramUserID = req.params[C.Route.PARAM];
        let result;

        if (user.admin) {

            const userFields = `${C.Model.ADMIN} ${C.Model.EMAIL} ${C.Model.IP} ${C.Model.NAME}`;

            if (paramUserID) {

                const isValidUserID = mongoose.Types.ObjectId.isValid(paramUserID);

                if (!isValidUserID) {

                    throw new Error(C.Error.USER_DOES_NOT_EXIST);
                }

                result = (paramUserID === user.id) ? user : await User
                    .findById(paramUserID)
                    .select(userFields);

                if (!result) {

                    throw new Error(C.Error.USER_DOES_NOT_EXIST);
                }

                result = [result];
            }
            else {

                result = await User
                    .find({})
                    .select(userFields);
            }
        }
        else {

            if (paramUserID && paramUserID !== user.id) {
                
                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }

            result = [user];
        }
            
        return res
            .status(C.Status.OK)
            .send({ users: result });
    }
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});

/**
 * Export module
 * 
 */
module.exports = router;