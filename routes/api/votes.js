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
const { Rank, Cast, Vote } = require("../../models/Vote");
const auth = require("../../middleware/auth");
const C = require("../../support/constants");
const mongoose = require("mongoose");
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
 * @description Negates the flag that allows users to cast votes, stops an optional running deadline countdown and broadcasts the vote to all connected clients.
 * 
 * @param {Object} req - An HTTP request object.
 * @private
 * @function
 * 
 */
const closeVote = async (req) => {

    try {
        
        req.app.locals[C.Local.IS_VOTE_OPEN] = false;
        clearInterval(req.app.locals[C.Local.DEADLINE_INTERVAL]);
        
        const vote = await Vote
        .findOne({ [C.Model.ACTIVE]: true })
        .populate(`${C.Model.VOTE}.${C.Model.USER}`, C.Model.NAME)
        .populate(`${C.Model.VOTE}.${C.Model.CAST}.${C.Model.ITEM}`, `${C.Model.NAME} ${C.Model.IMAGE}`);
        
        if (!vote) {
            
            throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
        }
        
        const clients = req.app.locals[C.Local.CLIENTS];
        broadcast(clients, C.Event.WEBSOCKET_VOTE_CLOSED);

        if (vote[C.Model.VOTE].length === 0) {

            await vote.deleteOne();
        }
        else {

            vote[C.Model.DATE] = Date.now();
            vote[C.Model.ACTIVE] = false;
            
            await vote.save();

            broadcast(clients, JSON.stringify(vote));
        }
    }
    catch (error) {

        throw error;
    }
};

/**
 * @description (POST) Opens voting to allow clients to cast their votes before an optional deadline.
 * Admin users, via admin authentication, are authorized to open voting with a vote deadline and ranking quantity properties.
 * The properties are set by providing a "deadline" value (in seconds) and a "quantity" value within the HTTP request body.
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

                        [C.Model.ACTIVE]: true,
                        [C.Model.DEADLINE]: deadline,
                        [C.Model.QUANTITY]: quantity,
                    });

                    const clients = req.app.locals[C.Local.CLIENTS];

                    let seconds = deadline;

                    if (seconds > 0) {

                        const parseTimeUnit = (value) => {
                
                            return Math.floor(value)
                                .toString()
                                .padStart(2, "0");
                        };

                        const deadlineIntervalCallback = () => {
            
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

                    broadcast(clients, C.Event.WEBSOCKET_VOTE_OPENED);

                    return res
                        .status(C.Status.OK)
                        .json({ vote });
                }
                else {

                    throw new Error(C.Error.VOTE_OPENED);
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
 * @description (GET) Closing voting stops a running deadline countdown and blocks clients from casting votes.
 * Admin users, via admin authentication, are authorized to close voting.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.CLOSE, auth, async (req, res) => {

    try {

        const user = res.locals[C.Local.USER];

        if (user.admin) {
        
            if (req.app.locals[C.Local.IS_VOTE_OPEN]) {

                await closeVote(req);

                res.sendStatus(C.Status.OK);
            }
            else {

                throw new Error(C.Error.VOTE_CLOSED);
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

/**
 * @description (POST) Cast a vote.
 * All users are authorized to cast votes via token authentication.
 * Votes are cast by providing a "cast" array of objects that contain "item" and "rank" properties within the HTTP request body. 
 * 
 * @protected
 * @constant
 * 
 */
router.post(C.Route.CAST, [
        
        auth,
        validation.voteCast,
        validation.result
    ],
    async (req, res) => {

        try {

            if (!req.app.locals[C.Local.IS_VOTE_OPEN]) {

                throw new Error(C.Error.VOTE_CLOSED);
            }
            
            const { cast } = req.body;
            const ranks = [];
            
            for (const rank of cast) {
                
                ranks.push(new Rank({
                    
                    [C.Model.ITEM]: rank[C.Model.ITEM],
                    [C.Model.RANK]: rank[C.Model.RANK]
                }));
            }

            const vote = await Vote
                .findOne({ [C.Model.ACTIVE]: true })
                .populate(`${C.Model.VOTE}.${C.Model.USER}`);

            if (!vote) {
    
                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }
            
            const user = res.locals[C.Local.USER];
            const previousCastIndex = vote[C.Model.VOTE].findIndex((cast) => cast.user.id === user.id);

            if (previousCastIndex !== -1) {

                 vote[C.Model.VOTE].splice(previousCastIndex, 1);
            }

            vote[C.Model.VOTE].push(new Cast({

                [C.Model.CAST]: ranks,
                [C.Model.USER]: user.id
            }));
            
            await vote.save();

            return res.sendStatus(C.Status.OK);
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (DELETE) Delete a vote.
 * Only admin users, via admin authentication, are authorized to delete Vote documents providing an valid vote ID request parameter.
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
 * All users are authorized to retrieve either a list of all inactive votes or a single inactive vote by optionally providing a valid vote ID as a request parameter.
 * Admin users, via admin authentication, are authorized to additionally retrieve the active vote, if available.
 * 
 * @protected
 * @constant
 * 
 */
router.get(`/:${C.Route.ID}?`, auth, async (req, res) => {

    try {

        const user = res.locals[C.Local.USER];
        const paramVoteID = req.params[C.Route.ID];
        
        const popPathUser = `${C.Model.VOTE}.${C.Model.USER}`;
        const popFieldsUser = C.Model.NAME;
        const popPathItem = `${C.Model.VOTE}.${C.Model.CAST}.${C.Model.ITEM}`;
        const popFieldsItem = `${C.Model.NAME} ${C.Model.IMAGE}`;
        
        let result;

        if (paramVoteID) {

            const isValidVoteID = mongoose.Types.ObjectId.isValid(paramVoteID);

            if (!isValidVoteID) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }

            result = await Vote.findById(paramVoteID)
                .populate(popPathUser, popFieldsUser)
                .populate(popPathItem, popFieldsItem);

            if (!result || (result[C.Model.ACTIVE] && !user.admin)) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }

            result = [result];
        }
        else {

            const filter = (user.admin) ? {} : { [C.Model.ACTIVE]: false };

            result = await Vote.find(filter)
                .sort(`-${C.Model.DATE}`)
                .populate(popPathUser, popFieldsUser)
                .populate(popPathItem, popFieldsItem);
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