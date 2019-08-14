/**
 * @description Votes router module prefixed with the path /api/votes.
 * 
 * @requires auth
 * @requires constants
 * @requires express
 * @requires mongoose
 * @requires utils
 * @requires validation
 * @requires Vote
 * @requires ws
 * @public
 * @module
 * 
 */
const auth = require("../../middleware/auth");
const C = require("../../support/constants");
const mongoose = require("mongoose");
const router = require("express").Router();
const utils = require("../../support/utilities");
const validation = require("../../middleware/validation");
const Vote = require("../../models/Vote");
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
 * @description Negates the flag that allows users to cast votes and stops an optional running deadline countdown.
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
 * @description (POST) Opens voting to allow clients to cast their votes before an optional deadline.
 * Admin users, via admin authentication, are authorized to open voting with an optional time limit and optional ranking quantity properties.
 * The optional properties are set by providing a "deadline" value (in seconds) and a "quantity" value within the HTTP request body.
 * 
 * @protected
 * @constant
 * 
 */
router.post(C.Route.OPEN, [
    
        auth,
        validation.voteOpen,
        validation.result
    ],
    async (req, res) => {

        try {

            const user = res.locals[C.Local.USER];
    
            if (user.admin) {

                if (!req.app.locals[C.Local.IS_VOTE_OPEN]) {
                    
                    req.app.locals[C.Local.IS_VOTE_OPEN] = true;
                    
                    const { deadline, quantity } = req.body;

                    const vote = new Vote({

                        [C.Model.DEADLINE]: deadline,
                        [C.Model.QUANTITY]: quantity,
                    });

                    let seconds = deadline;
                    
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

                    await vote.save();

                    return res
                        .status(C.Status.OK)
                        .json({ vote });
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
 * @description (GET) Closing voting stops an optional running deadline countdown and blocks clients from casting votes.
 * Admin users, via admin authentication, are authorized to close voting.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.CLOSE, auth, (req, res) => {

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

// Cast (PATCH)
router.patch(C.Route.CAST, auth, (req, res) => {

});

/**
 * @description (DELETE) Delete a vote.
 * Only authenticated admin users are authorized to delete votes.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(`${C.Route.DELETE}/:${C.Route.ID}`, auth, async (req, res) => {

    try {

        const user = res.locals[C.Local.USER];

        if (user.admin) {

            const paramVoteID = req.params[C.Route.ID];
            const isValidVoteID = mongoose.Types.ObjectId.isValid(paramVoteID);

            if (!isValidVoteID) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }
            const vote = await Vote.findByIdAndRemove(paramVoteID);

            if (!vote) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }

            return res
                .status(C.Status.OK)
                .json({ vote });
        }
        else {

            throw new Error(C.Error.USER_INVALID_CREDENTIALS);
        }
    }
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});

/**
 * @description (GET) Retrieve an array of either one or all votes.
 * All users are authorized to retrieve either a list of all votes or a single vote by optionally providing a valid vote ID as a request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.get(`/:${C.Route.ID}?`, auth, async (req, res) => {

    try {

        const paramVoteID = req.params[C.Route.ID];
        let result;

        if (paramVoteID) {

            const isValidVoteID = mongoose.Types.ObjectId.isValid(paramVoteID);

            if (!isValidVoteID) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }

            result = await Vote.findById(paramVoteID);

            if (!result) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }

            result = [result];
        }
        else {

            result = await Vote.find({});
        }

        return res
            .status(C.Status.OK)
            .json({ votes: result });
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