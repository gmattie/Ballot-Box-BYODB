/**
 * @description Results router module prefixed with the path /api/results.
 * 
 * @requires express
 * @public
 * @module
 * 
 */
const router = require("express").Router();

/**
 * @description GET results root endpoint.
 * 
 * @public
 * @constant
 * 
 */
router.get("/", (req, res) => {
    
    return res
        .status(200)
        .send("Results route");
});

/**
 * Export module
 * 
 */
module.exports = router;