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
    TOKEN_EXPIRATION: "2d"    
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DB_URI </li>
 *     <li> JWT_TOKEN </li>
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
 *     <li> CLIENT </li>
 *     <li> ROUTES </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Dir = {

    ROUTES: "./routes",
    CLIENT: "./client",    
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DEADLINE </li>
 *     <li> EMAIL </li>
 *     <li> IMAGE </li>
 *     <li> ITEM_ALREADY_EXISTS </li>
 *     <li> ITEM_DOES_NOT_EXIST </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 *     <li> QUANTITY </li>
 *     <li> USER_ALREADY_EXISTS </li>
 *     <li> USER_DOES_NOT_EXIST </li>
 *     <li> USER_INVALID_CREDENTIALS </li>
 *     <li> VOTE_ALREADY_CLOSED </li>
 *     <li> VOTE_ALREADY_OPEN </li>
 *     <li> VOTE_DOES_NOT_EXIST </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = {

    DEADLINE: "Invalid deadline",
    EMAIL: "Invalid email",
    IMAGE: "Invalid image URL",
    ITEM_ALREADY_EXISTS: "Item already exists",
    ITEM_DOES_NOT_EXIST: "Item does not exist",
    NAME: "Name is required",
    PASSWORD: "Password is required",
    QUANTITY: "Invalid quantity",
    USER_ALREADY_EXISTS: "User already exists",
    USER_DOES_NOT_EXIST: "User does not exist",
    USER_INVALID_CREDENTIALS: "Invalid credentials",
    VOTE_ALREADY_CLOSED: "Voting is already closed",
    VOTE_ALREADY_OPEN: "Voting is already open",
    VOTE_DOES_NOT_EXIST: "Vote does not exist",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> CLOSE </li>
 *     <li> CONNECTION </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Event = {

    CLOSE: "close",
    CONNECTION: "connection",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> CLIENTS </li>
 *     <li> IS_VOTE_OPEN </li>
 *     <li> DEADLINE_INTERVAL </li>
 *     <li> USER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Local = {

    CLIENTS: "clients",
    IS_VOTE_OPEN: "isVoteOpen",
    DEADLINE_INTERVAL: "deadlineInterval",
    USER: "user"
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DATABASE_CONNECTED </li>
 *     <li> CONNECTED_CLIENTS </li>
 *     <li> SERVER_RUNNING </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */

const Message = {

    DATABASE_CONNECTED: "Database connected",
    CONNECTED_CLIENTS: "Connected clients:",
    SERVER_RUNNING: "Server is running on port:",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ADMIN </li>
 *     <li> CAST </li>
 *     <li> DATE </li>
 *     <li> DEADLINE </li>
 *     <li> EMAIL </li>
 *     <li> IMAGE </li>
 *     <li> ITEM </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 *     <li> QUANTITY </li>
 *     <li> RANK </li>
 *     <li> TOKEN </li>
 *     <li> USER </li>
 *     <li> VOTE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Model = {

    ADMIN: "admin",
    CAST: "cast",
    DATE: "date",
    DEADLINE: "deadline",
    EMAIL: "email",
    IMAGE: "image",
    ITEM: "item",
    NAME: "name",
    PASSWORD: "password",
    QUANTITY: "quantity",
    RANK: "rank",
    TOKEN: "token",
    USER: "user",
    VOTE: "vote",
};

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ADD </li>
 *     <li> API_ITEMS </li>
 *     <li> API_USERS </li>
 *     <li> API_VOTES </li>
 *     <li> CAST </li>
 *     <li> CLOSE </li>
 *     <li> DELETE </li>
 *     <li> EDIT </li>
 *     <li> ID </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> OPEN </li>
 *     <li> REGISTER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Route = {

    ADD: "/add",
    API_ITEMS: "/api/items",
    API_USERS: "/api/users",
    API_VOTES: "/api/votes",
    CAST: "/cast",
    CLOSE: "/close",
    DELETE: "/delete",
    EDIT: "/edit",
    ID: "id",
    LOGIN: "/login",
    LOGOUT: "/logout",
    OPEN: "/open",
    REGISTER: "/register",
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
    Dir,
    Error,
    Event,
    Local,
    Message,
    Model,
    Route,
    Status
};