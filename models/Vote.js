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
const Item = require("../models/Item");
const mongoose = require("mongoose");
const User = require("../models/User");

/**
 * @description The Result sub document schema definition.
 * 
 * @private
 * @constant
 * 
 */
const resultSchema = new mongoose.Schema({

    [C.Model.ITEM]: {

        type: Item,
        required: true
    },
    [C.Model.RANK]: {

        type: Number,
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
    [C.Model.RESULT]: {

        type: [resultSchema],
        required: true
    },
    [C.Model.USER]: {

        type: User,
        required: true,
        unique: true
    }
}, { versionKey: false });

/**
 * Export module
 * 
 */
module.exports = mongoose.model(C.Model.VOTE, voteSchema);