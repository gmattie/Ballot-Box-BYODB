/**
 * @description Retrieve the signature partition of a JSON Web Token.
 * 
 * @param {string} jwt - A JSON Web Token composed of three partitions delimited by periods.
 * @returns {string} The third and last partition of a JSON Web Token.
 * @public
 * @function
 * 
 */
const getTokenSignature = (jwt) => jwt.slice(jwt.lastIndexOf(".") + 1);

/**
 * Export module
 * 
 */
module.exports = {

    getTokenSignature,
};