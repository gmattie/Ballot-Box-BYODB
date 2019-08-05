/**
 * @description Common and reusable functions 
 * 
 * @requires constants
 * @public
 * @module
 * 
 */
const C = require("./constants");

/**
 * @description Retrieve the signature partition of a JSON Web Token.
 * 
 * @param {string} jwt - A JSON Web Token composed of three partitions delimited by periods.
 * @returns {string} The third and last partition of a JSON Web Token.
 * @public
 * @function
 * 
 */
const getTokenSignature = (jwt) => jwt.slice(jwt.lastIndexOf(".") + 1);


/**
 * @description Sends an error HTTP response according to a provided error message.
 * 
 * @param {object} error - An error object that contains an error message.
 * @param {object} response - An HTTP response object.
 * @returns {object} An HTTP response object.
 * @public
 * @function 
 * 
 */

const sendErrorResponse = (error, response) => {

    switch (error.message) {

        case C.Error.USER_ALREADY_EXISTS:

             return response
                .status(C.Status.BAD_REQUEST)
                .send({ error: C.Error.USER_ALREADY_EXISTS });

        case C.Error.USER_DOES_NOT_EXIST:

            return response
                .status(C.Status.BAD_REQUEST)
                .send({ error: C.Error.USER_DOES_NOT_EXIST });

        case C.Error.USER_INVALID_CREDENTIALS:

            return response
                .status(C.Status.UNAUTHENTICATED)
                .send({ error: C.Error.USER_INVALID_CREDENTIALS });

        default:

            return response
                .status(C.Status.INTERNAL_SERVER_ERROR)
                .send({ error: error.message });
    }
};

/**
 * Export module
 * 
 */
module.exports = {

    getTokenSignature,
    sendErrorResponse
};