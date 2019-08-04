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
    TOKEN_EXPIRATION: "1d"    
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
 *     <li> USER_ALREADY_EXISTS </li>
 *     <li> USER_DOES_NOT_EXIST </li>
 *     <li> USER_EMAIL </li>
 *     <li> USER_INVALID_CREDENTIALS </li>
 *     <li> USER_NAME </li>
 *     <li> USER_PASSWORD </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = {

    USER_ALREADY_EXISTS: "User already exists",
    USER_DOES_NOT_EXIST: "User does not exist",
    USER_EMAIL: "Email is not valid",
    USER_INVALID_CREDENTIALS: "Invalid credentials",
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
 *     <li> USER_ADMIN </li>
 *     <li> USER_DATE </li>
 *     <li> USER_EMAIL </li>
 *     <li> USER_NAME </li>
 *     <li> USER_PASSWORD </li>
 *     <li> USER_TOKEN </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Model = {

    USER_ADMIN: "admin",
    USER_DATE: "date",
    USER_EMAIL: "email",
    USER_NAME: "name",
    USER_PASSWORD: "password",
    USER_TOKEN: "token",
    USER: "user",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ITEMS </li>
 *     <li> PARAM_USER_ID </li>
 *     <li> RESULTS </li>
 *     <li> ROUTES </li>
 *     <li> USERS </li>
 *     <li> USERS_DELETE </li>
 *     <li> USERS_INFO </li>
 *     <li> USERS_LOGIN </li>
 *     <li> USERS_LOGOUT </li>
 *     <li> USERS_REGISTER </li>
 *     <li> USERS_UPDATE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Route = {

    ITEMS: "/api/items",
    PARAM_USER_ID: "userID",
    RESULTS: "/api/results",
    ROUTES_DIR: "./routes",
    USERS_DELETE: "/delete",
    USERS_INFO: "/info",
    USERS_LOGIN: "/login",
    USERS_LOGOUT: "/logout",
    USERS_REGISTER: "/register",
    USERS_UPDATE: "/update",
    USERS: "/api/users",
};

/**
 * @description Properties of type {number} consist of:
 * 
 * <ul>
 *     <li> BAD_REQUEST </li>
 *     <li> INTERNAL_SERVER_ERROR </li>
 *     <li> OK </li>
 *     <li> UNAUTHENTICATED </li>
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
    UNAUTHENTICATED: 401,
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
    Route,
    Status
};