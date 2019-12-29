/**
 * @description Common and reusable functions 
 * 
 * @requires constants
 * @requires ws
 * @public
 * @module
 * 
 */
const C = require("./constants");
const WebSocket = require("ws");

/**
 * @description Broadcasts a WebSocket message to all connected clients.
 * 
 * @param {Set} clients - A set of all connected clients. 
 * @param {*} data - What is sent to each connected client.
 * @private
 * @function
 * 
 */
const broadcast = (clients, data) => {

    if (clients) {

        clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {

                client.send(data);
            }
        });
    }
};

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

    let status;

    switch (error.message) {

        case C.Error.EMAIL_ALREADY_REGISTERED:
            status = C.Status.BAD_REQUEST;
            
            break;
            
        case C.Error.USER_DOES_NOT_EXIST:
            status = C.Status.BAD_REQUEST;
            
            break;
                
        case C.Error.USER_INVALID_CREDENTIALS:
            status = C.Status.UNAUTHENTICATED;
            
            break;
                    
        case C.Error.VERIFICATION_ALREADY_PROCESSED:
            status = C.Status.BAD_REQUEST;
        
            break;

        case C.Error.VOTE_CLOSED:
            status = C.Status.BAD_REQUEST;

            break;

        case C.Error.VOTE_OPENED:
            status = C.Status.BAD_REQUEST;

            break;

        default:
            status = C.Status.INTERNAL_SERVER_ERROR;
    }

    return response
        .status(status)
        .send({ error: error.message });
};

/**
 * Export module
 * 
 */
module.exports = {

    broadcast,
    getTokenSignature,
    sendErrorResponse
};