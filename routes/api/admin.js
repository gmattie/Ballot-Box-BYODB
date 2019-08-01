/**
 * @description Admin router module prefixed with the path /api/admin.
 * 
 * @requires auth
 * @requires constants
 * @requires express
 * @public
 * @module
 * 
 */
const auth = require("../../middleware/auth");
const C = require("../../support/constants");
const router = require("express").Router();

/**
 * @description (GET) Authorize a user admin via middleware that verifies a JSON Web Token.
 * 
 * @protected
 * @constant
 * 
 */
router.get(C.Route.AUTH, auth, (req, res) => {
    
    const user = res.locals.user;

    return res
        .status(C.Status.OK)
        .json({ user });
});

/**
 * Export module
 * 
 */
module.exports = router;