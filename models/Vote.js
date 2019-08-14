/**
 * @description The Vote model created from Mongoose schema definition.
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
 * @description The Rank subdocument schema definition.
 * 
 * @private
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
 * @description The Cast subdocument schema definition.
 * 
 * @private
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

    [C.Model.DATE]: {
        
        type: Date,
        default: Date.now
    },
    [C.Model.DEADLINE]: {

        type: Number,
        default: 0
    },
    [C.Model.VOTE]: {

        type: [castSchema]
    },
    [C.Model.QUANTITY]: {

        type: Number,
        default: 1
    }

}, { versionKey: false });

/**
 * Export module
 * 
 */
module.exports = mongoose.model(C.Model.VOTE, voteSchema);