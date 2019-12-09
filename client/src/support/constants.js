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
 *     <li> PROTECTED </li>
 *     <li> PUBLIC </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Access = Object.freeze({

    PROTECTED: "protected",
    PUBLIC: "public",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> PAYLOAD </li>
 *     <ul>
 *         <li> AUTH_ERROR </li>
 *         <li> AUTH_TOKEN </li>
 *         <li> ITEMS_ADD </li>
 *         <li> ITEMS_ALL </li>
 *         <li> ITEMS_EDIT </li>
 *         <li> ITEMS_ERROR </li>
 *         <li> ITEMS_VOTE </li>
 *         <li> USERS_EDIT </li>
 *         <li> USERS_ERROR </li>
 *         <li> USERS_REGISTER </li>
 *         <li> USERS_RESET </li>
 *         <li> USERS_SELF </li>
 *         <li> VOTES_ACTIVE </li>
 *         <li> VOTES_ALL </li>
 *         <li> VOTES_ERROR </li>
 *         <li> WEBSOCKET_MESSAGE </li>
 *     </ul> 
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Action = Object.freeze({

    PAYLOAD: "payload",

    Type: {

        AUTH_ERROR: "authError",
        AUTH_TOKEN: "authToken",
        ITEMS_ADD: "itemsAdd",
        ITEMS_ALL: "itemsAll",
        ITEMS_EDIT: "itemsEdit",
        ITEMS_ERROR: "itemsError",
        ITEMS_VOTE: "itemsVote",
        USERS_EDIT: "usersEdit",
        USERS_ERROR: "usersError",
        USERS_REGISTER: "usersRegister",
        USERS_RESET: "usersReset",
        USERS_SELF: "usersSelf",
        VOTES_ACTIVE: "votesActive",
        VOTES_ALL: "votesAll",
        VOTES_ERROR: "votesError",
        WEBSOCKET_MESSAGE: "websocketMessage",
    }
});

/**
 * @description Properties of type {number} consist of:
 * 
 * <ul>
 *     <li> ENTER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const CharCode = Object.freeze({

    ENTER: 13
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DUPLICATE_KEY </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = Object.freeze({

    DUPLICATE_KEY: "E11000 duplicate key error",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ANIMATION_END </li>
 *     <li> CLOSE </li>
 *     <li> DRAG_ENTER </li>
 *     <li> DRAG_OVER </li>
 *     <li> DRAG_START </li>
 *     <li> DROP </li>
 *     <li> ERROR </li>
 *     <li> LOAD </li>
 *     <li> MESSAGE </li>
 *     <li> OPEN </li>
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

    ANIMATION_END: "animationend",
    CLOSE: "close",
    DRAG_ENTER: "dragenter",
    DRAG_OVER: "dragover",
    DRAG_START: "dragstart",
    DROP: "drop",
    ERROR: "error",
    LOAD: "load",
    MESSAGE: "message",
    OPEN: "open",
    VOTE_CLOSED: "voteClosed",
    VOTE_COMPLETE: "voteComplete",
    VOTE_OPENED: "voteOpened",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DIV </li>
 *     <ul>
 *         <li> TEXT </li> 
 *         <li> PASSWORD </li> 
 *     </ul>
 *     <li> ROOT </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const HTMLElement = Object.freeze({

    DIV: "div",

    InputType: {
        
        TEXT: "text",
        PASSWORD: "password"
    },

    ROOT: "root",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ELEMENT_DIALOG </li>
 *     <li> ERROR_MESSAGE </li>
 *     <li> ERROR_PARAM </li>
 *     <li> LIST_ITEMS_ALL </li>
 *     <li> LIST_ITEMS_VOTE </li>
 *     <li> NAME_ADMIN_PASSWORD </li>
 *     <li> NAME_ADMIN_USERNAME </li>
 *     <li> NAME_DEADLINE </li>
 *     <li> NAME_EMAIL </li>
 *     <li> NAME_IMAGE </li>
 *     <li> NAME_NAME </li>
 *     <li> NAME_PASSWORD </li>
 *     <li> NAME_PASSWORD_CONFIRM </li>
 *     <li> NAME_QUANTITY </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const ID = Object.freeze({

    ELEMENT_DIALOG: "dialog",
    ERROR_MESSAGE: "msg",
    ERROR_PARAM: "param",
    LIST_ITEMS_ALL: "listItemsCandidate",
    LIST_ITEMS_VOTE: "listItemsVote",
    NAME_ADMIN_PASSWORD: "adminPassword",
    NAME_ADMIN_USERNAME: "adminUsername",
    NAME_DEADLINE: "deadline",
    NAME_EMAIL: "email",
    NAME_IMAGE: "image",
    NAME_NAME: "name",
    NAME_PASSWORD_CONFIRM: "passwordConfirm",
    NAME_PASSWORD: "password",
    NAME_QUANTITY: "quantity",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> TRANSPARENT_PLACEHOLDER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Image = Object.freeze({

    TRANSPARENT_PLACEHOLDER: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ADD </li>
 *     <li> ADD_ITEM </li>
 *     <li> ADMIN </li>
 *     <li> ADMIN_CREDENTIALS </li>
 *     <li> ADMIN_PASSWORD </li>
 *     <li> ADMIN_USERNAME </li>
 *     <li> CANCEL </li>
 *     <li> CLOSE_POOLS </li>
 *     <li> CONFIRM_ADD_ITEM </li>
 *     <li> CONFIRM_CLOSE_POLLS </li>
 *     <li> CONFIRM_EDIT_ITEM </li>
 *     <li> CONFIRM_EDIT </li>
 *     <li> CONFIRM_OPEN_POLLS </li>
 *     <li> DEADLINE </li>
 *     <li> EDIT </li>
 *     <li> EDIT_ITEMS </li>
 *     <li> EMAIL </li>
 *     <li> EMAIL_REFER </li>
 *     <li> EMAIL_REGISTRATION </li>
 *     <li> EMAIL_RESET </li>
 *     <li> EMAIL_SENT </li>
 *     <li> ICON </li>
 *     <li> IMAGE </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> MANAGE_POLLS </li>
 *     <li> NAME </li>
 *     <li> OK </li>
 *     <li> OPEN_POLLS </li>
 *     <li> OPTIONAL </li>
 *     <li> PASSWORD </li>
 *     <li> PASSWORD_CONFIRM </li>
 *     <li> QUANTITY </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> RESULTS </li>
 *     <li> VOTE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Label = Object.freeze({

    ADD: "Add",
    ADD_ITEM: "Add Item",
    ADMIN_CREDENTIALS: "Admin Credentials",
    ADMIN_PASSWORD: "Admin Password",
    ADMIN_USERNAME: "Admin Username",
    ADMIN: "Admin",
    CANCEL: "Cancel",
    CLOSE_POOLS: "Close Pools",
    CONFIRM_ADD_ITEM: "Are you sure you want to add this item?",
    CONFIRM_CLOSE_POLLS: "Are you sure you want to close the polls?",
    CONFIRM_EDIT_ITEM: "Are you sure you want to edit this item?",
    CONFIRM_EDIT: "Are you sure you want to edit your user account?",
    CONFIRM_OPEN_POLLS: "Are you sure you want to open the polls?",
    DEADLINE: "Deadline",
    EDIT_ITEMS: "Edit Items",
    EDIT: "Edit",
    EMAIL_REFER: "Please refer to the email in order to",
    EMAIL_REGISTRATION: "complete your registration and activate your account.",
    EMAIL_RESET: "confirm the request to reset your password.",
    EMAIL_SENT: "An email has been sent to:",
    EMAIL: "Email",
    ICON: "Icon",
    IMAGE: "Image",
    LOGIN: "Login",
    LOGOUT: "Logout",
    MANAGE_POOLS: "Manage Polls",
    NAME: "Name",
    OK: "OK",
    OPEN_POLLS: "Open Polls",
    OPTIONAL: "(Optional)",
    PASSWORD_CONFIRM: "Confirm Password",
    PASSWORD: "Password",
    QUANTITY: "Quantity",
    REGISTER: "Register",
    RESET: "Reset",
    RESULTS: "Results",
    VOTE: "Vote",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ENV_DEVELOPMENT </li>
 *     <li> PROTOCOL_HTTP </li>
 *     <li> PROTOCOL_WEB_SOCKET </li>
 *     <li> TOKEN </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Local = Object.freeze({

    ENV_DEVELOPMENT: "development",
    PROTOCOL_HTTP: "http",
    PROTOCOL_WEB_SOCKET: "ws",
    TOKEN: "token",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> APPLICATION_JSON </li>
 *     <li> HEADER_CONTENT_TYPE </li>
 *     <li> HEADER_X_AUTH_TOKEN </li>
 *     <li> METHOD_GET </li>
 *     <li> METHOD_PATCH </li>
 *     <li> METHOD_POST </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Request = Object.freeze({

    APPLICATION_JSON: "application/json",
    HEADER_CONTENT_TYPE: "content-type",
    HEADER_X_AUTH_TOKEN: "X-Auth-Token",
    METHOD_GET: "GET",
    METHOD_PATCH: "PATCH",
    METHOD_POST: "POST",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ACTIVE </li>
 *     <li> ADD </li>
 *     <li> ADMIN </li>
 *     <li> API_ITEMS </li>
 *     <li> API_USERS </li>
 *     <li> API_VOTES </li>
 *     <li> CLOSE </li>
 *     <li> EDIT </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> OPEN </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> RESULTS </li>
 *     <li> SELF </li>
 *     <li> VOTE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Route = Object.freeze({

    ACTIVE: "/active",
    ADD: "/add",
    ADMIN: "/admin",
    API_ITEMS: "/api/items",
    API_USERS: "/api/users",
    API_VOTES: "/api/votes",
    CLOSE: "/close",
    EDIT: "/edit",
    LOGIN: "/login",
    LOGOUT: "/logout",
    OPEN: "/open",
    REGISTER: "/register",
    RESET: "/reset",
    RESULTS: "/results",
    SELF: "/self",
    VOTE: "/vote",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> APP </li>
 *     <li> COLLAPSIBLE </li>
 *     <li> COLLAPSIBLE_CONTENT </li>
 *     <li> COLLAPSIBLE_CONTENT_HIDE </li>
 *     <li> COLLAPSIBLE_CONTENT_SHOW </li>
 *     <li> COLLAPSIBLE_HEADER_LIST_ITEM </li>
 *     <li> COLLAPSIBLE_HEADER_SECTION </li>
 *     <li> COLLAPSIBLE_HEADER_TITLE </li>
 *     <li> COLLAPSIBLE_HEADER_TITLE_EXPANDED </li>
 *     <li> DIALOG </li>
 *     <li> DIALOG_BUTTONS_CONTAINER </li>
 *     <li> DIALOG_MESSAGE_CONTAINER </li>
 *     <li> INPUT_PASSWORD </li>
 *     <li> INPUT_PASSWORD_HIDE </li>
 *     <li> INPUT_PASSWORD_SHOW </li>
 *     <li> LIST </li>
 *     <li> LIST_CONTAINER </li>
 *     <li> LIST_ITEM </li>
 *     <li> LIST_ITEM_HIDE </li>
 *     <li> PORTAL </li>
 *     <li> PROTECTED_CONTAINER </li>
 *     <li> PROTECTED_CONTAINER_BUTTON </li>
 *     <li> PROTECTED_CONTAINER_BUTTON_SELECTED </li>
 *     <li> PROTECTED_CONTAINER_USER_INFO </li>
 *     <li> PROTECTED_CONTAINER_WEBSOCKET_MESSAGE </li>
 *     <li> PUBLIC_CONTAINER </li>
 *     <li> PUBLIC_CONTAINER_BUTTON </li>
 *     <li> PUBLIC_CONTAINER_BUTTON_SELECTED </li>
 *     <li> VIEWPORT_IMAGE_ERROR </li>
 *     <li> VIEWPORT_IMAGE_INTERSECTION </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Style = Object.freeze({

    APP: "app",
    COLLAPSIBLE_CONTENT_HIDE: "collapsible-content-hide",
    COLLAPSIBLE_CONTENT_SHOW: "collapsible-content-show",
    COLLAPSIBLE_CONTENT: "collapsible-content",
    COLLAPSIBLE_HEADER_LIST_ITEM: "collapsible-header-listItem",
    COLLAPSIBLE_HEADER_SECTION: "collapsible-header-section",
    COLLAPSIBLE_HEADER_TITLE_EXPANDED: "collapsible-header-title-expanded",
    COLLAPSIBLE_HEADER_TITLE: "collapsible-header-title",
    COLLAPSIBLE: "collapsible",
    DIALOG_BUTTONS_CONTAINER: "dialog-buttonsContainer",
    DIALOG_MESSAGE_CONTAINER: "dialog-messageContainer",
    DIALOG: "dialog",
    INPUT_PASSWORD_HIDE: "inputPassword-hide",
    INPUT_PASSWORD_SHOW: "inputPassword-show",
    INPUT_PASSWORD: "inputPassword",
    LIST_CONTAINER: "listContainer",
    LIST_ITEM_ACTIVE: "listItem-active",
    LIST_ITEM: "listItem",
    LIST: "list",
    PORTAL: "portal",
    PROTECTED_CONTAINER_BUTTON_SELECTED: "protectedContainer-button-selected",
    PROTECTED_CONTAINER_BUTTON: "protectedContainer-button",
    PROTECTED_CONTAINER_USER_INFO: "protectedContainer-userInfo",
    PROTECTED_CONTAINER_WEBSOCKET_MESSAGE: "protectedContainer-webSocketMessage",
    PROTECTED_CONTAINER: "protectedContainer",
    PUBLIC_CONTAINER_BUTTON_SELECTED: "publicContainer-button-selected",
    PUBLIC_CONTAINER_BUTTON: "publicContainer-button",
    PUBLIC_CONTAINER: "publicContainer",
    VIEWPORT_IMAGE_ERROR: "viewportImage-error",
    VIEWPORT_IMAGE_INTERSECTION: "viewportImage-intersection",
    VIEWPORT_IMAGE: "viewportImage",
});

/**
 * Export module
 * 
 */
export {

    Access,
    Action,
    CharCode,
    Error,
    Event,
    HTMLElement,
    ID,
    Image,
    Label,
    Local,
    Request,
    Route,
    Style
};