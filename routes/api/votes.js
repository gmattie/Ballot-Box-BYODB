/**
 * @description Votes router module prefixed with the path /api/votes.
 * 
 * @requires auth
 * @requires constants
 * @requires express
 * @requires utils
 * @requires validation
 * @requires ws
 * @public
 * @module
 * 
 */
const auth = require("../../middleware/auth");
const C = require("../../support/constants");
const router = require("express").Router();
const utils = require("../../support/utilities");
const validation = require("../../middleware/validation");
const WebSocket = require("ws");

/**
 * @description Broadcasts a message to all connected clients.
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
 * @description Closes voting.
 * 
 * @param {Object} req - An HTTP request object.
 * @private
 * @function
 * 
 */
const closeVote = (req) => {

    req.app.locals[C.Local.IS_VOTE_OPEN] = false;

    clearInterval(req.app.locals[C.Local.DEADLINE_INTERVAL]);
};

/**
 * @description (GET) Opens voting to allow all connected clients to cast their votes before an optional deadline.
 * Admin users, via admin authentication, are authorized to open voting with an optional time limit by providing a deadline value (in seconds) within the request body.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.VOTES_OPEN, [
    
        auth,
        validation.voteOpen,
        validation.result
    ],
    (req, res) => {

        try {

            const user = res.locals[C.Local.USER];
    
            if (user.admin) {

                if (!req.app.locals[C.Local.IS_VOTE_OPEN]) {
                    
                    req.app.locals[C.Local.IS_VOTE_OPEN] = true;
                    
                    let seconds = req.body[C.Model.DEADLINE];
                    
                    if (seconds) {

                        const parseTimeUnit = (value) => {
                
                            return Math.floor(value)
                                .toString()
                                .padStart(2, "0");
                        };

                        const deadlineIntervalCallback = () => {

                            const clients = req.app.locals[C.Local.CLIENTS];
            
                            const data = {
                    
                                days: parseTimeUnit(seconds / (60 * 60 * 24)),
                                hours: parseTimeUnit((seconds / (60 * 60)) % 24),
                                minutes: parseTimeUnit((seconds / 60) % 60),
                                seconds: parseTimeUnit(seconds % 60)
                            };
            
                            broadcast(clients, JSON.stringify(data));
                    
                            if (seconds === 0) {
                    
                                closeVote(req);
                            }
                            else {
                    
                                seconds--;
                            }
                        };

                        req.app.locals[C.Local.DEADLINE_INTERVAL] = setInterval(deadlineIntervalCallback, 1000);
                    }

                    return res.sendStatus(C.Status.OK);
                }
                else {

                    throw new Error(C.Error.VOTE_ALREADY_OPEN);
                }
            }
            else {

                throw new Error(C.Error.USER_INVALID_CREDENTIALS);
            }
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (GET) Closes voting to block connected clients from casting votes.
 * Admin users, via admin authentication, are authorized to close voting.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.VOTES_CLOSE, auth, (req, res) => {

    try {

        const user = res.locals[C.Local.USER];

        if (user.admin) {
        
            if (req.app.locals[C.Local.IS_VOTE_OPEN]) {

                closeVote(req);

                return res.sendStatus(C.Status.OK);
            }
            else {

                throw new Error(C.Error.VOTE_ALREADY_CLOSED);
            }
        }
        else {

            throw new Error(C.Error.USER_INVALID_CREDENTIALS);
        }
    }
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});


// Cast
router.get(C.Route.VOTES_CAST, auth, (req, res) => {

});

// Results
router.get(C.Route.VOTES_RESULTS, auth, (req, res) => {

});

// Delete
router.get(C.Route.VOTES_DELETE, auth, (req, res) => {

});

/**
 * Export module
 * 
 */
module.exports = router;