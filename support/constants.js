/**
 * @description This module contains a collection of categoric constant member objects.
 * 
 * @public
 * @module
 * 
 */

 /**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> USER_EMAIL </li>
 *     <li> USER_NAME </li>
 *     <li> USER_PASSWORD </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = {

    USER_EMAIL: "Email is not valid",
    USER_NAME: "Name is required",
    USER_PASSWORD: "Password is required",
};

 /**
 * @description Properties of type {number} consist of:
 * 
 * <ul>
 *     <li> BAD_REQUEST </li>
 *     <li> OK </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Status = {

    BAD_REQUEST: 400,
    OK: 200,
};

 /**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DATE </li>
 *     <li> EMAIL </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const User = {

    DATE: "date",
    EMAIL: "email",
    NAME: "name",
    PASSWORD: "password",
};

/**
 * Export module
 * 
 */
module.exports = {

    Error,
    Status,
    User
};