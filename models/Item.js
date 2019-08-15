/**
 * @description The Item model created from Mongoose schema definition.
 * 
 * @requires constants
 * @requires mongoose
 * @public
 * @module
 * 
 */
const C = require("../support/constants");
const mongoose = require("mongoose");
/**
 * @description The Item schema definition.
 * 
 * @private
 * @constant
 * 
 */
const itemSchema = new mongoose.Schema({

    [C.Model.DATE]: {

        type: Date,
        default: Date.now
    },
    [C.Model.IMAGE]: {

        type: String
    },
    [C.Model.NAME]: {
        
        type: String,
        required: true,
        unique: true
    },
}, { versionKey: false });

/**
 * Export module
 * 
 */
module.exports = mongoose.model(C.Model.ITEM, itemSchema);