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
 *     <li> BUILD </li>
 *     <li> ROUTES </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Dir = Object.freeze({

    BUILD: "./client/build",
    ROUTES: "./routes",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> BUTTON_LABEL_ACTIVATE_ACCOUNT </li>
 *     <li> BUTTON_LABEL_RESET_PASSWORD </li>
 *     <li> BUTTON_STYLE </li>
 *     <li> MESSAGE_ACTIVATE </li>
 *     <li> MESSAGE_CREDENTIALS </li>
 *     <li> MESSAGE_EXPIRE </li>
 *     <li> MESSAGE_RESET </li>
 *     <li> SUBJECT_ACTIVATE </li>
 *     <li> SUBJECT_RESET </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Email = Object.freeze({

    BUTTON_LABEL_ACTIVATE_ACCOUNT: "ACTIVATE ACCOUNT",
    BUTTON_LABEL_RESET_PASSWORD: "RESET PASSWORD",
    BUTTON_STYLE: `

        display: inline-block;
        padding: 12px 20px 10px 20px;
        border: 1px solid #dedede;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 600;
    `,
    MESSAGE_ACTIVATE: "Please press the button below to activate your account.",
    MESSAGE_CREDENTIALS: "Once completed, you will be able to login with your new credentials.",
    MESSAGE_EXPIRE: "This option will expire in",
    MESSAGE_RESET: "A request to reset your account password has been submitted.  Please press the button below to confirm this request and reset your password.",
    SUBJECT_ACTIVATE: "Account Activation",
    SUBJECT_RESET: "Confirm Reset Password",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> CAST </li>
 *     <li> DEADLINE </li>
 *     <li> EMAIL </li>
 *     <li> IMAGE </li>
 *     <li> ITEM </li>
 *     <li> ITEM_DOES_NOT_EXIST </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 *     <li> QUANTITY </li>
 *     <li> RANK </li>
 *     <li> USER_ALREADY_EXISTS </li>
 *     <li> USER_DOES_NOT_EXIST </li>
 *     <li> USER_INVALID_CREDENTIALS </li>
 *     <li> VOTE_CLOSED </li>
 *     <li> VOTE_DOES_NOT_EXIST </li>
 *     <li> VOTE_OPENED </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = Object.freeze({

    CAST: "Invalid cast",
    DEADLINE: "Invalid deadline",
    EMAIL: "Invalid email",
    IMAGE: "Invalid image URL",
    ITEM_DOES_NOT_EXIST: "Item does not exist",
    ITEM: "Invalid item",
    NAME: "Invalid name",
    PASSWORD: "Invalid password",
    QUANTITY: "Invalid quantity",
    RANK: "Invalid rank",
    USER_ALREADY_EXISTS: "User already exists",
    USER_DOES_NOT_EXIST: "User does not exist",
    USER_INVALID_CREDENTIALS: "Invalid credentials",
    VOTE_CLOSED: "Voting is closed",
    VOTE_DOES_NOT_EXIST: "Vote does not exist",
    VOTE_OPENED: "Voting is open",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> CLOSE </li>
 *     <li> CONNECTION </li>
 *     <li> VOTE_CLOSED </li>
 *     <li> VOTE_COMPLETE </li>
 *     <li> VOTE_OPENED </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Event = Object.freeze({

    CLOSE: "close",
    CONNECTION: "connection",
    VOTE_CLOSED: "voteClosed",
    VOTE_COMPLETE: "voteComplete",
    VOTE_OPENED: "voteOpened",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> JWT_TOKEN </li>
 *     <li> USER_ACTIVATE </li>
 *     <li> USER_RESET </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Expire = Object.freeze({

    JWT_TOKEN: "2d",
    USER_ACTIVATE: "60 minutes",
    USER_RESET: "30 minutes"
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> INDEX </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const File = Object.freeze({

    INDEX: "index.html"
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> HOST </li>
 *     <li> X_AUTH_TOKEN </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Header = Object.freeze({

    HOST: "Host",
    X_AUTH_TOKEN: "X-Auth-Token",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> CLIENTS </li>
 *     <li> DEADLINE_INTERVAL </li>
 *     <li> ENGLISH </li>
 *     <li> ENV_DEVELOPMENT </li>
 *     <li> ENV_PRODUCTION </li>
 *     <li> IS_VOTE_OPEN </li>
 *     <li> USER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Local = Object.freeze({

    CLIENTS: "clients",
    DEADLINE_INTERVAL: "deadlineInterval",
    ENGLISH: "en",
    ENV_DEVELOPMENT: "development",
    ENV_PRODUCTION: "production",
    IS_VOTE_OPEN: "isVoteOpen",
    USER: "user"
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> CONNECTED_CLIENTS </li>
 *     <li> DATABASE_CONNECTED </li>
 *     <li> SERVER_RUNNING </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */

const Message = Object.freeze({

    CONNECTED_CLIENTS: "Connected clients:",
    DATABASE_CONNECTED: "Database connected",
    SERVER_RUNNING: "Server is running on port:"
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ACTIVE </li>
 *     <li> ADMIN </li>
 *     <li> CAST </li>
 *     <li> DATE </li>
 *     <li> DEADLINE </li>
 *     <li> EMAIL </li>
 *     <li> EXPIRE </li>
 *     <li> IMAGE </li>
 *     <li> IP </li>
 *     <li> ITEM </li>
 *     <li> NAME </li>
 *     <li> PASSWORD </li>
 *     <li> QUANTITY </li>
 *     <li> RANK </li>
 *     <li> RESET </li>
 *     <li> TOKEN </li>
 *     <li> TOTAL </li>
 *     <li> USER </li>
 *     <li> VOTE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Model = Object.freeze({

    ACTIVE: "active",
    ADMIN: "admin",
    CAST: "cast",
    DATE: "date",
    DEADLINE: "deadline",
    EMAIL: "email",
    EXPIRE: "expire",
    IMAGE: "image",
    IP: "ip",
    ITEM: "item",
    NAME: "name",
    PASSWORD: "password",
    QUANTITY: "quantity",
    RANK: "rank",
    RESET: "reset",
    TOKEN: "token",
    TOTAL: "total",
    USER: "user",
    VOTE: "vote",
});

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
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> OPEN </li>
 *     <li> PARAM </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> SELF </li>
 *     <li> VERIFY </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Route = Object.freeze({

    ADD: "/add",
    API_ITEMS: "/api/items",
    API_USERS: "/api/users",
    API_VOTES: "/api/votes",
    CAST: "/cast",
    CLOSE: "/close",
    DELETE: "/delete",
    EDIT: "/edit",
    LOGIN: "/login",
    LOGOUT: "/logout",
    OPEN: "/open",
    PARAM: "param",
    REGISTER: "/register",
    RESET: "/reset",
    SELF: "/self",
    VERIFY: "/verify",
});

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
const Status = Object.freeze({

    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    UNAUTHENTICATED: 401,
});

/**
 * Export module
 * 
 */
module.exports = {

    Dir,
    Email,
    Error,
    Event,
    Expire,
    File,
    Header,
    Local,
    Message,
    Model,
    Route,
    Status
};