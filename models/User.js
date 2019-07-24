/**
 * @description The User model created from Mongoose schema definition.
 * 
 * @requires mongoose
 * @public
 * @module
 * 
 */
const mongoose = require("mongoose");

/**
 * @description The keys for the schema definition include name, email, password and date.
 * 
 * @private
 * @constant
 * 
 */
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
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