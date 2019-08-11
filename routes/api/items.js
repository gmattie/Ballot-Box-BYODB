/**
 * @description Items router module prefixed with the path /api/items.
 *  
 * @requires auth
 * @requires constants
 * @requires express
 * @requires mongoose
 * @requires utils
 * @requires validation
 * @public
 * @module
 * 
 */
const auth = require("../../middleware/auth");
const C = require("../../support/constants");
const Item = require("../../models/Item");
const mongoose = require("mongoose");
const router = require("express").Router();
const utils = require("../../support/utilities");
const validation = require("../../middleware/validation");

/**
 * @description (GET) Retrieve an array of either one or all items.
 * Only authenticated admin users are authorized to retrieve either a list or all items or a single item by optionally providing a valid item ID as a request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.get(`/:${C.Route.PARAM_ITEM_ID}?`, auth, async (req, res) => {

    try {

        const user = res.locals[C.Local.USER];
        
        if (user.admin) {
            
            const paramItemID = req.params[C.Route.PARAM_ITEM_ID];
            let result;

            if (paramItemID) {

                const isValidItemID = mongoose.Types.ObjectId.isValid(paramItemID);

                if (!isValidItemID) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                result = await Item.findById(paramItemID);

                if (!result) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                result = [result];
            }
            else {

                result = await Item.find({});
            }

            return res
                .status(C.Status.OK)
                .send({ items: result });
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
 * @description (POST) Add an item.
 * Only authenticated admin users are authorized to add items.
 * 
 * @protected
 * @constant
 * 
 */
router.post(C.Route.ITEMS_ADD, [
    
        auth,
        validation.itemAdd,
        validation.result
    ],
    async (req, res) => {

        try {

            const user = res.locals[C.Local.USER];

            if (user.admin) {

                const { name } = req.body;
                const itemExists = await Item.findOne({ name });

                if (itemExists) {

                    throw new Error(C.Error.ITEM_ALREADY_EXISTS);
                }

                const item = new Item({

                    [C.Model.NAME]: name
                });

                await item.save();

                return res
                    .status(C.Status.OK)
                    .json({ item });
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
 * @description (PATCH) Update the name of an item.
 * Only authenticated admin users are authorized to update the name of an existing item.
 * 
 * @protected
 * @constant
 * 
 */
router.patch(`${C.Route.ITEMS_EDIT}/:${C.Route.PARAM_ITEM_ID}`, [
    
        auth,
        validation.itemUpdate,
        validation.result
    ],
    async (req, res) => {
    
        try {

            const user = res.locals[C.Local.USER];
            
            if (user.admin) {
                
                const paramItemID = req.params[C.Route.PARAM_ITEM_ID];
                const isValidItemID = mongoose.Types.ObjectId.isValid(paramItemID);

                if (!isValidItemID) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                const item = await Item.findById(paramItemID);

                if (!item) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                const { name } = req.body;
                item[C.Model.NAME] = name;
                item[C.Model.DATE] = Date.now();

                await item.save();

                return res
                    .status(C.Status.OK)
                    .json({ item });
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
 * @description (DELETE) Delete an item.
 * Only authenticated admin users are authorized to delete items.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(`${C.Route.ITEMS_DELETE}/:${C.Route.PARAM_ITEM_ID}`, auth, async (req, res) => {
    
    try {

        const user = res.locals[C.Local.USER];

        if (user.admin) {

            const paramItemID = req.params[C.Route.PARAM_ITEM_ID];
            const isValidItemID = mongoose.Types.ObjectId.isValid(paramItemID);

            if (!isValidItemID) {

                throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
            }
            const item = await Item.findByIdAndRemove(paramItemID);

            if (!item) {

                throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
            }

            return res
                .status(C.Status.OK)
                .json({ item });
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
 * Export module
 * 
 */
module.exports = router;