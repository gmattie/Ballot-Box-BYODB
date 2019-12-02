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
 *     <li> HISTORY_POP </li>
 *     <li> PAYLOAD </li>
 *     <ul>
 *         <li> AUTH_ERROR </li>
 *         <li> AUTH_TOKEN </li>
 *         <li> ITEMS_CANDIDATE </li>
 *         <li> ITEMS_ERROR </li>
 *         <li> ITEMS_VOTE </li>
 *         <li> USERS_ERROR </li>
 *         <li> USERS_REGISTER </li>
 *         <li> USERS_RESET </li>
 *         <li> USERS_SELF </li>
 *         <li> WEBSOCKET_MESSAGE </li>
 *     </ul> 
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Action = Object.freeze({

    HISTORY_POP: "POP",
    PAYLOAD: "payload",

    Type: {

        AUTH_ERROR: "authError",
        AUTH_TOKEN: "authToken",
        ITEMS_CANDIDATE: "itemsCandidate",
        ITEMS_ERROR: "itemsError",
        ITEMS_VOTE: "itemsVote",
        USERS_ERROR: "usersError",
        USERS_REGISTER: "usersRegister",
        USERS_RESET: "usersReset",
        USERS_SELF: "usersSelf",
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
 *     <li> LIST_ITEMS_CANDIDATE </li>
 *     <li> LIST_ITEMS_VOTE </li>
 *     <li> NAME_ADMIN_PASSWORD </li>
 *     <li> NAME_ADMIN_USERNAME </li>
 *     <li> NAME_EMAIL </li>
 *     <li> NAME_NAME </li>
 *     <li> NAME_PASSWORD </li>
 *     <li> NAME_PASSWORD_CONFIRM </li>
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
    LIST_ITEMS_CANDIDATE: "listItemsCandidate",
    LIST_ITEMS_VOTE: "listItemsVote",
    NAME_ADMIN_PASSWORD: "adminPassword",
    NAME_ADMIN_USERNAME: "adminUsername",
    NAME_EMAIL: "email",
    NAME_NAME: "name",
    NAME_PASSWORD_CONFIRM: "passwordConfirm",
    NAME_PASSWORD: "password",
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
 *     <li> ADMIN </li>
 *     <li> ADMIN_PASSWORD </li>
 *     <li> ADMIN_USERNAME </li>
 *     <li> CANCEL </li>
 *     <li> EDIT </li>
 *     <li> EMAIL </li>
 *     <li> ICON </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> NAME </li>
 *     <li> OK </li>
 *     <li> PASSWORD </li>
 *     <li> PASSWORD_CONFIRM </li>
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

    ADMIN_PASSWORD: "Admin Password",
    ADMIN_USERNAME: "Admin Username",
    ADMIN: "Admin",
    CANCEL: "Cancel",
    EDIT: "Edit",
    EMAIL: "Email",
    ICON: "Icon",
    LOGIN: "Login",
    LOGOUT: "Logout",
    NAME: "Name",
    OK: "OK",
    PASSWORD_CONFIRM: "Confirm Password",
    PASSWORD: "Password",
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
 *     <li> CONTENT_TYPE </li>
 *     <li> HEADER_X_AUTH_TOKEN </li>
 *     <li> METHOD_GET </li>
 *     <li> METHOD_POST </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Request = Object.freeze({

    APPLICATION_JSON: "application/json",
    CONTENT_TYPE: "content-type",
    HEADER_X_AUTH_TOKEN: "X-Auth-Token",
    METHOD_GET: "get",
    METHOD_POST: "post",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ADMIN </li>
 *     <li> API_ITEMS </li>
 *     <li> API_USERS </li>
 *     <li> API_VOTES </li>
 *     <li> EDIT </li>
 *     <li> LOGIN </li>
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

    ADMIN: "/admin",
    API_ITEMS: "/api/items",
    API_USERS: "/api/users",
    API_VOTES: "/api/votes",
    EDIT: "/edit",
    LOGIN: "/login",
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