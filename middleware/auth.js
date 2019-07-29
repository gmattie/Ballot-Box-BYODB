/**
 * @description Authorization middleware used to authenticate access protected routes via JSON Web Tokens.
 * 
 * @requires bcryptjs
 * @requires config
 * @requires constants
 * @requires jsonwebtoken
 * @requires User
 * @requires utils
 * @public
 * @module
 * 
 */
const bcryptjs = require("bcryptjs");
const C = require("../support/constants");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const utils = require("../support/utilities");

/**
 * @description Verify the JSON Web Token from the request authorization header and compare it to the token value within the User document.
 * 
 * @public
 * @constant
 * 
 */
const auth = async (req, res, next) => {

    const token = req.header(C.Auth.HEADER_X_AUTH_TOKEN);

    if (!token) {

        return res
            .status(C.Status.UNAUTHENTICATED)
            .send(C.Error.USER_INVALID_CREDENTIALS);
    }

    try {

        const tokenSignature = utils.getTokenSignature(token);
        const payload = await jwt.verify(token, config.get(C.Config.JWT_TOKEN));
        const user = await User.findById(payload.user.id);

        if (!user) {

            return res
                .status(C.Status.UNAUTHENTICATED)
                .send(C.Error.USER_INVALID_CREDENTIALS);
        }

        const isUserToken = await bcryptjs.compare(tokenSignature, user.token);

        if (!isUserToken) {

            return res
                .status(C.Status.UNAUTHENTICATED)
                .send(C.Error.USER_INVALID_CREDENTIALS);
        }

        res.locals.user = user;

        next();
    }
    catch (error) {

        return res
            .status(C.Status.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
};

/**
 * Export module
 * 
 */
module.exports = auth;