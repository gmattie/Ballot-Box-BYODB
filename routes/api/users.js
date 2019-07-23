/**
 * @description Users router module prefixed with the path /api/users.
 * 
 * @requires express
 * @public
 * @module
 * 
 */
const router = require("express").Router();

/**
 * @description GET users root endpoint.
 * @public
 * 
 */
router.get("/", (req, res) => {
    
    return res
        .status(200)
        .send("Users route");
});

/**
 * Export module
 * 
 */
module.exports = router;