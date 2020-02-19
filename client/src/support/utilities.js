/**
 * @description Common and reusable functions 
 * 
 * @public
 * @module
 * 
 */

/**
 * @description Concatenates and returns a string of non-null class names.
 * 
 * @param  {...string|null} classNames - The strings to be concatenated.
 * @private
 * @function
 * 
 */
const concatClassNames = (...classNames) => {
    
    return classNames
        .filter((className) => className)
        .join(" ");
};

/**
 * Export module
 * 
 */
module.exports = {

    concatClassNames
};