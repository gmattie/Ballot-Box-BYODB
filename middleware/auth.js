/**
 * @description Authorization middleware used to authenticate access protected routes via JSON Web Tokens.
 * 
 * @requires config
 * @requires constants
 * @requires jsonwebtoken
 * @public
 * @module
 * 
 */
const C = require("../support/constants");
const config = require("config");
const jwt = require("jsonwebtoken");

/**
 * @description Access and verify a JSON Web Token from the request authorization header.
 * 
 * @public
 * @constant
 * 
 */
const auth = (req, res, next) => {

    const token = req.header(C.Auth.HEADER_X_AUTH_TOKEN);

    if (!token) {

        return res.sendStatus(C.Status.UNAUTHORIZED);
    }

    try {

        const verifiedToken = jwt.verify(token, config.get(C.Config.JWT_TOKEN));
        req.user = verifiedToken.user;

        next();
    }
    catch (error) {

        return res.sendStatus(C.Status.UNAUTHORIZED);
    }

};

/**
 * Export module
 * 
 */
module.exports = auth;