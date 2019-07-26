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
 *     <li> HEADER_X_AUTH_TOKEN </li>
 *     <li> TOKEN_EXPIRATION </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Auth = {

    HEADER_X_AUTH_TOKEN: "X-Auth-Token",
    TOKEN_EXPIRATION: "7d"    
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> USER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Config = {

    DB_URI: "dbURI",
    JWT_TOKEN: "jwtToken"
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> USER_INVALID_CREDENTIALS </li>
 *     <li> USER_ALREADY_EXISTS </li>
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

    USER_INVALID_CREDENTIALS: "Invalid Credentials",
    USER_ALREADY_EXISTS: "User already exists",
    USER_EMAIL: "Email is not valid",
    USER_NAME: "Name is required",
    USER_PASSWORD: "Password is required",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DATABASE_CONNECTED </li>
 *     <li> SERVER_RUNNING </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */

const Message = {

    DATABASE_CONNECTED: "Database connected...",
    SERVER_RUNNING: "Server is running on port:",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> USER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Model = {

    USER: "user",
};

/**
 * @description Properties of type {number} consist of:
 * 
 * <ul>
 *     <li> BAD_REQUEST </li>
 *     <li> INTERNAL_SERVER_ERROR </li>
 *     <li> OK </li>
 *     <li> UNAUTHORIZED </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Status = {

    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    UNAUTHORIZED: 401,
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

    Auth,
    Config,
    Error,
    Message,
    Model,
    Status,
    User
};