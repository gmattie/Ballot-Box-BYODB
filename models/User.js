/**
 * @description The User model created from Mongoose schema definition.
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
 * @description The User schema definition.
 * 
 * @private
 * @constant
 * 
 */
const userSchema = new mongoose.Schema({

    [C.Model.ADMIN]: {

        type: Boolean,
        default: false
    },
    [C.Model.DATE]: {

        type: Date,
        default: Date.now
    },
    [C.Model.EMAIL]: {

        type: String,
        required: true,
        unique: true
    },
    [C.Model.NAME]: {

        type: String,
        required: true
    },
    [C.Model.PASSWORD]: {

        type: String,
        required: true
    },
    [C.Model.TOKEN]: {
        
        type: String
    },
}, { versionKey: false });

/**
 * Export module
 * 
 */
module.exports = mongoose.model(C.Model.USER, userSchema);