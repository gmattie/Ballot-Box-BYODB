/**
 * @description Items router module prefixed with the path /api/items.
 * 
 * @requires express
 * @public
 * @module
 * 
 */
const router = require("express").Router();

/**
 * @description GET items root endpoint.
 * @public
 * 
 */
router.get("/", (req, res) => {
    
    return res
        .status(200)
        .send("Items route");
});

/**
 * Export module
 * 
 */
module.exports = router;