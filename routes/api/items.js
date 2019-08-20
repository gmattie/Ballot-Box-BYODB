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
 * @description (POST) Add an item.
 * Only authenticated admin users are authorized to add items.
 * Items are added by providing a "name" value and an option "image" URL within the HTTP request body.
 * 
 * @protected
 * @constant
 * 
 */
router.post(C.Route.ADD, [
    
        auth,
        validation.itemAdd,
        validation.result
    ],
    async (req, res) => {

        try {

            const user = res.locals[C.Local.USER];

            if (user.admin) {

                const { image, name } = req.body;
                const itemExists = await Item.findOne({ name });

                if (itemExists) {

                    throw new Error(C.Error.ITEM_ALREADY_EXISTS);
                }

                const item = new Item({

                    [C.Model.IMAGE]: image,
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
 * @description (PATCH) Edit the name of an item.
 * Only admin users, via admin authentication, are authorized to edit existing items by providing a valid item ID as a request parameter.
 * Items are edited by providing an option "name" value and/or an option "image" URL within the HTTP request body.
 * 
 * @protected
 * @constant
 * 
 */
router.patch(`${C.Route.EDIT}/:${C.Route.ID}`, [
    
        auth,
        validation.itemEdit,
        validation.result
    ],
    async (req, res) => {
    
        try {

            const user = res.locals[C.Local.USER];
            
            if (user.admin) {
                
                const paramItemID = req.params[C.Route.ID];
                const isValidItemID = mongoose.Types.ObjectId.isValid(paramItemID);

                if (!isValidItemID) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                const item = await Item.findById(paramItemID);

                if (!item) {

                    throw new Error(C.Error.ITEM_DOES_NOT_EXIST);
                }

                item[C.Model.DATE] = Date.now();
                
                const { image, name } = req.body;

                if (image) {
                    
                    item[C.Model.IMAGE] = image;
                }
                
                if (name) {
                    
                    item[C.Model.NAME] = name;
                }
                
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
 * Only admin users, via admin authentication, are authorized to delete existing items by providing a valid item ID as a request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.delete(`${C.Route.DELETE}/:${C.Route.ID}`, auth, async (req, res) => {
    
    try {

        const user = res.locals[C.Local.USER];

        if (user.admin) {

            const paramItemID = req.params[C.Route.ID];
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
 * @description (GET) Retrieve an array of either one or all items.
 * All users are authorized to retrieve either a list of all items or a single item by optionally providing a valid item ID as a request parameter.
 * 
 * @protected
 * @constant
 * 
 */
router.get(`/:${C.Route.ID}?`, auth, async (req, res) => {

    try {

        const paramItemID = req.params[C.Route.ID];
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
    catch (error) {

        utils.sendErrorResponse(error, res);
    }
});

/**
 * Export module
 * 
 */
module.exports = router;