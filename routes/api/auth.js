/**
 * @description Auth router module prefixed with the path /api/auth.
 * 
 * @requires express
 * @public
 * @module
 * 
 */
const router = require("express").Router();

/**
 * @description GET auth root endpoint.
 * @public
 * 
 */
router.get("/", (req, res) => {
    
    return res
        .status(200)
        .send("Auth route");
});

/**
 * Export module
 * 
 */
module.exports = router;