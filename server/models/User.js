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
 * @description The Reset schema definition.
 * 
 * @public
 * @constant
 * 
 */
const resetSchema = new mongoose.Schema({

    [C.Model.EMAIL]: {

        type: String,
        required: true
    },
    [C.Model.EXPIRE]: {
        
        type: Date,
        default: Date.now,
        index: { expires: C.Expire.USER_RESET }
    },
    [C.Model.PASSWORD]: {

        type: String,
        required: true
    },
}, { versionKey: false });


/**
 * @description The User schema definition.
 * 
 * @public
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
        index: {

            unique: true,
            collation: {
                
                locale: C.Local.ENGLISH,
                strength: 2
            }
        }
    },
    [C.Model.EXPIRE]: {

        type: Date,
        index: { expires: C.Expire.USER_ACTIVATE }
    },
    [C.Model.IP]: {

        type: String,
        required: true
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
    }
}, { versionKey: false });

/**
 * Export module
 * 
 */
module.exports = {

    Reset: mongoose.model(C.Model.RESET, resetSchema),
    User: mongoose.model(C.Model.USER, userSchema)
};