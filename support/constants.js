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
 *     <li> EMAIL </li>
 *     <li> ITEM_ALREADY_EXISTS </li>
 *     <li> ITEM_DOES_NOT_EXIST </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 *     <li> USER_ALREADY_EXISTS </li>
 *     <li> USER_DOES_NOT_EXIST </li>
 *     <li> USER_INVALID_CREDENTIALS </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = {

    EMAIL: "Email is not valid",
    ITEM_ALREADY_EXISTS: "Item already exists",
    ITEM_DOES_NOT_EXIST: "Item does not exist",
    NAME: "Name is required",
    PASSWORD: "Password is required",
    USER_ALREADY_EXISTS: "User already exists",
    USER_DOES_NOT_EXIST: "User does not exist",
    USER_INVALID_CREDENTIALS: "Invalid credentials",
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
 *     <li> ADMIN </li>
 *     <li> DATE </li>
 *     <li> EMAIL </li>
 *     <li> ITEM </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 *     <li> TOKEN </li>
 *     <li> USER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Model = {

    ADMIN: "admin",
    DATE: "date",
    EMAIL: "email",
    ITEM: "item",
    NAME: "name",
    PASSWORD: "password",
    TOKEN: "token",
    USER: "user",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ITEMS </li>
 *     <li> ITEMS_ADD </li>
 *     <li> ITEMS_DELETE </li>
 *     <li> ITEMS_EDIT </li>
 *     <li> PARAM_ITEM_ID </li>
 *     <li> PARAM_USER_ID </li>
 *     <li> RESULTS </li>
 *     <li> ROUTES </li>
 *     <li> USERS </li>
 *     <li> USERS_DELETE </li>
 *     <li> USERS_EDIT </li>
 *     <li> USERS_INFO </li>
 *     <li> USERS_LOGIN </li>
 *     <li> USERS_LOGOUT </li>
 *     <li> USERS_REGISTER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Route = {

    ITEMS_ADD: "/add",
    ITEMS_DELETE: "/delete",
    ITEMS_EDIT: "/edit",
    ITEMS: "/api/items",
    PARAM_ITEM_ID: "itemID",
    PARAM_USER_ID: "userID",
    RESULTS: "/api/results",
    ROUTES_DIR: "./routes",
    USERS_DELETE: "/delete",
    USERS_EDIT: "/edit",
    USERS_INFO: "/info",
    USERS_LOGIN: "/login",
    USERS_LOGOUT: "/logout",
    USERS_REGISTER: "/register",
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