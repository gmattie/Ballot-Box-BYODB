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
 * @description The keys for the schema definition include name, email, password and date.
 * 
 * @private
 * @constant
 * 
 */
const userSchema = new mongoose.Schema({

    [C.Model.USER_NAME]: {
        type: String,
        required: true
    },
    [C.Model.USER_EMAIL]: {
        type: String,
        required: true,
        unique: true
    },
    [C.Model.USER_PASSWORD]: {
        type: String,
        required: true
    },
    [C.Model.USER_DATE]: {
        type: Date,
        default: Date.now
    }
});

/**
 * Export module
 * 
 */
module.exports = mongoose.model(C.Model.USER, userSchema);