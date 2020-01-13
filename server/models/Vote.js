/**
 * @description The Rank, Cast and Vote models created from Mongoose schema definitions.
 * 
 * @requires constants
 * @requires Item
 * @requires mongoose
 * @requires User
 * @public
 * @module
 * 
 */
const C = require("../support/constants");
const mongoose = require("mongoose");

/**
 * @description The Rank schema definition.
 * 
 * @public
 * @constant
 * 
 */
const rankSchema = new mongoose.Schema({

    [C.Model.ITEM]: {

        type: mongoose.Schema.Types.ObjectId,
        ref: C.Model.ITEM,
        required: true
    },
    [C.Model.RANK]: {

        type: Number,
        required: true
    }
}, { versionKey: false });

/**
 * @description The Cast schema definition.
 * 
 * @public
 * @constant
 * 
 */
const castSchema = new mongoose.Schema({

    [C.Model.CAST]: {

        type: [rankSchema],
        required: true
    },
    [C.Model.USER]: {

        type: mongoose.Schema.Types.ObjectId,
        ref: C.Model.USER,
        required: true
    }
}, { versionKey: false });

/**
 * @description The Vote schema definition.
 * 
 * @private
 * @constant
 * 
 */
const voteSchema = new mongoose.Schema({

    [C.Model.ACTIVE]: {

        type: Boolean,
        required: true
    },
    [C.Model.AGGREGATE]: {

        type: Boolean,
        default: true
    },
    [C.Model.ANONYMOUS]: {

        type: Boolean,
        default: false
    },
    [C.Model.DATE]: {
        
        type: Date,
        default: Date.now
    },
    [C.Model.DEADLINE]: {

        type: Number,
        default: 0
    },
    [C.Model.QUANTITY]: {

        type: Number,
        default: 1
    },
    [C.Model.TOTAL]: {

        type: [rankSchema]
    },
    [C.Model.VOTE]: {

        type: [castSchema]
    }
}, { versionKey: false });

/**
 * Export module
 * 
 */
module.exports = {

    Rank: mongoose.model(C.Model.RANK, rankSchema),
    Cast: mongoose.model(C.Model.CAST, castSchema),
    Vote: mongoose.model(C.Model.VOTE, voteSchema)
};