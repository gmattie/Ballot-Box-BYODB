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

    [C.User.NAME]: {
        type: String,
        required: true
    },
    [C.User.EMAIL]: {
        type: String,
        required: true,
        unique: true
    },
    [C.User.PASSWORD]: {
        type: String,
        required: true
    },
    [C.User.DATE]: {
        type: Date,
        default: Date.now
    }
});

/**
 * Export module
 * 
 */
module.exports = {

    user: mongoose.model("user", userSchema)
};