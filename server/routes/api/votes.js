/**
 * @description Votes router module prefixed with the path /api/votes.
 * 
 * @requires auth
 * @requires constants
 * @requires express
 * @requires Item
 * @requires mongoose
 * @requires utils
 * @requires validation
 * @requires Vote
 * @public
 * @module
 * 
 */
const { Rank, Cast, Vote } = require("../../models/Vote");
const auth = require("../../middleware/auth");
const C = require("../../support/constants");
const Item = require("../../models/Item");
const mongoose = require("mongoose");
const router = require("express").Router();
const utils = require("../../support/utilities");
const validation = require("../../middleware/validation");

/**
 * @description Cast votes are aggregated and sorted to populate the "total" property of the active Vote document.
 * WebSocket event messages C.Event.VOTE_AGGREGATE is broadcast to all connected clients.  
 * 
 * @param {Object} req - An HTTP request object.
 * @private
 * @function
 * 
 */
const aggregateVotes = async (req) => {

    try {

        const vote = await Vote
            .findOne({ [C.Model.ACTIVE]: true })
            .populate(`${C.Model.VOTE}.${C.Model.CAST}.${C.Model.ITEM}`, `${C.Model.NAME} ${C.Model.IMAGE}`);
        
        if (!vote) {
            
            throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
        }

        let total = new Map();
        const quantity = vote[C.Model.QUANTITY];

        for (const castSchema of vote[C.Model.VOTE]) {

            for (const rankSchema of castSchema[C.Model.CAST]) {

                const item = rankSchema[C.Model.ITEM];
                const rank = quantity - rankSchema[C.Model.RANK];

                if (total.has(item)) {
   
                    total.set(item, total.get(item) + rank);
                }
                else {

                    total.set(item, rank);
                }
            }
        }

        total = Array.from([...total.entries()].sort((a, b) => {
            
            if (a[1] === b[1]) {

                return a[0].name.localeCompare(b[0].name);
            }

            return b[1] - a[1];
        }));

        total = total.map((rankSchema) => {

            return new Rank({

                item: rankSchema[0],
                rank: rankSchema[1]
            });
        });

        vote[C.Model.TOTAL] = total;
        
        await vote.save();

        const clients = req.app.locals[C.Local.CLIENTS];
        utils.broadcast(clients, JSON.stringify({ [C.WebSocket.TYPE]: C.Event.VOTE_AGGREGATE }));
    }
    catch (error) {

        throw error;
    }
};

/**
 * @description Closing the vote blocks clients from casting votes and, if applicable, stops a running deadline countdown.
 * WebSocket event messages C.Event.VOTE_CLOSED and C.Event.VOTE_COMPLETE are broadcast to all connected clients.  
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
        
        const clients = req.app.locals[C.Local.CLIENTS];
        const vote = await Vote.findOne({ [C.Model.ACTIVE]: true });
        
        if (!vote) {
            
            throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
        }
        else if (vote[C.Model.VOTE].length === 0) {
            
            await vote.deleteOne();
        }
        else {
            
            if (!vote[C.Model.AGGREGATE]) {
                
                await aggregateVotes(req);
            }
            
            vote[C.Model.ACTIVE] = false;
            vote[C.Model.DATE] = Date.now();
            
            await vote.save();

            utils.broadcast(clients, JSON.stringify({

                [C.WebSocket.TYPE]: C.Event.VOTE_COMPLETE,
                [C.WebSocket.DATA]: utils.createObjectSubset(
                            
                    vote.toObject(),
                    C.Model.AGGREGATE,
                    C.Model.ANONYMOUS,
                    C.Model.ID,
                    C.Model.ACTIVE,
                    C.Model.DATE)
            }));
        }
        
        utils.broadcast(clients, JSON.stringify({ [C.WebSocket.TYPE]: C.Event.VOTE_CLOSED }));
    }
    catch (error) {

        throw error;
    }
};

/**
 * @description (POST) Opens voting to allow clients to cast their votes before an optional deadline.
 * Admin users, via admin authentication, are authorized to open voting with a vote deadline, ranking quantity and results aggregation properties.
 * The properties are set by providing "deadline" (milliseconds number), "quantity" (amount number) and "aggregate" (boolean) values within the HTTP request body.
 * WebSocket event message C.Event.VOTE_OPENED is broadcast to all connected clients. 
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
                    
                    const { deadline, quantity, aggregate, anonymous } = req.body;
                    const vote = new Vote({

                        [C.Model.ACTIVE]: true,
                        [C.Model.DEADLINE]: deadline,
                        [C.Model.QUANTITY]: quantity,
                        [C.Model.AGGREGATE]: aggregate,
                        [C.Model.ANONYMOUS]: anonymous
                    });

                    const clients = req.app.locals[C.Local.CLIENTS];

                    let seconds = deadline / 1000;

                    if (seconds > 0) {

                        const parseTimeUnit = (value) => {
                
                            return Math.floor(value)
                                .toString()
                                .padStart(2, "0");
                        };

                        const deadlineIntervalCallback = () => {
            
                            const data = {
                    
                                [C.Deadline.DAYS]: parseTimeUnit(seconds / (60 * 60 * 24)),
                                [C.Deadline.HOURS]: parseTimeUnit((seconds / (60 * 60)) % 24),
                                [C.Deadline.MINUTES]: parseTimeUnit((seconds / 60) % 60),
                                [C.Deadline.SECONDS]: parseTimeUnit(seconds % 60)
                            };
            
                            utils.broadcast(clients, JSON.stringify({
                            
                                [C.WebSocket.TYPE]: C.Event.VOTE_DEADLINE,
                                [C.WebSocket.DATA]: data
                            }));
                    
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

                    utils.broadcast(clients, JSON.stringify({

                        [C.WebSocket.TYPE]: C.Event.VOTE_OPENED,
                        [C.WebSocket.DATA]: utils.createObjectSubset(
                            
                            vote.toObject(),
                            C.Model.AGGREGATE,
                            C.Model.ANONYMOUS,
                            C.Model.ID,
                            C.Model.ACTIVE,
                            C.Model.DATE)
                    }));

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
 * @description (GET) Calls the "closeVote" function.
 * Only admin users, via admin authentication, are authorized to close voting.
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
 * When voting is open, all users are authorized to cast votes via token authentication.
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

            const vote = await Vote
                .findOne({ [C.Model.ACTIVE]: true })
                .populate(`${C.Model.VOTE}.${C.Model.USER}`);

            if (!vote) {
    
                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }
            
            const { cast } = req.body;
            const ranks = [];

            if (cast.length > vote[C.Model.QUANTITY]) {

                cast.length = vote[C.Model.QUANTITY];
            }

            const existingItems = [];

            for (const item of await Item.find({})) {

                existingItems.push(item.id);
            }

            for (const rankSchema of cast) {
                
                if (!existingItems.includes(rankSchema[C.Model.ITEM])) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                ranks.push(new Rank({
                    
                    [C.Model.ITEM]: rankSchema[C.Model.ITEM],
                    [C.Model.RANK]: rankSchema[C.Model.RANK]
                }));
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
            
            if (vote[C.Model.AGGREGATE]) {

                await aggregateVotes(req);
            }
            
            const clients = req.app.locals[C.Local.CLIENTS];
            utils.broadcast(clients, JSON.stringify({ [C.WebSocket.TYPE]: C.Event.VOTE_CAST }));

            return res
                .status(C.Status.OK)
                .json({ cast });
        }
        catch (error) {

            utils.sendErrorResponse(error, res);
        }
    }
);

/**
 * @description (DELETE) Delete a vote.
 * Only admin users, via admin authentication, are authorized to delete Vote documents by providing a valid vote ID request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(`${C.Route.DELETE}/:${C.Route.PARAM}`, auth, async (req, res) => {

    try {

        const user = res.locals[C.Local.USER];

        if (user.admin) {

            const paramVoteID = req.params[C.Route.PARAM];
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
 * @description (GET) Retrieve the active vote.
 * All users are authorized to retrieve are authorized to retrieve the active vote if it exists.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.ACTIVE, auth, async (req, res) => {

    try {

        const vote = await Vote.findOne({ [C.Model.ACTIVE]: true });

        return res
            .status(C.Status.OK)
            .json({ vote });
    }
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});

/**
 * @description (GET) Retrieve one vote or an array of all votes.
 * All users are authorized to retrieve either an array of all votes, both active and inactive, or a single vote by optionally providing a valid vote ID as a request parameter.
 * Retrieving an array of all votes include the following properties per vote:  "aggregate", "anonymous", "active" and "date".
 * Retrieving a single vote, in addition to the aforementioned properties, will include all remaining properties of the Vote document model: "deadline", "quantity", "total" and "vote".   
 * 
 * @protected
 * @constant
 * 
 */
router.get(`/:${C.Route.PARAM}?`, auth, async (req, res) => {

    try {

        const paramVoteID = req.params[C.Route.PARAM];

        let result;
        
        if (paramVoteID) {
            
            const isValidVoteID = mongoose.Types.ObjectId.isValid(paramVoteID);
            
            if (!isValidVoteID) {
                
                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }
            
            const popPathVoteUser = `${C.Model.VOTE}.${C.Model.USER}`;
            const popPathVoteItem = `${C.Model.VOTE}.${C.Model.CAST}.${C.Model.ITEM}`;
            const popPathTotalItem = `${C.Model.TOTAL}.${C.Model.ITEM}`;
    
            const popFieldsUser = `${C.Model.EMAIL} ${C.Model.IP} ${C.Model.NAME}`;
            const popFieldsItem = `${C.Model.NAME} ${C.Model.THUMBNAIL}`;

            result = await Vote.findById(paramVoteID)
                .populate(popPathVoteUser, popFieldsUser)
                .populate(popPathVoteItem, popFieldsItem)
                .populate(popPathTotalItem, popFieldsItem);

            if (!result) {

                throw new Error(C.Error.VOTE_DOES_NOT_EXIST);
            }
        }
        else {

            result = await Vote
                .find({})
                .select(`${C.Model.AGGREGATE} ${C.Model.ANONYMOUS} ${C.Model.ACTIVE} ${C.Model.DATE}`)
                .sort(`-${C.Model.DATE}`)
        }

        return res
            .status(C.Status.OK)
            .send(result);
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