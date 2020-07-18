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
 *         <li> ITEMS_CANDIDATE </li>
 *         <li> ITEMS_EDIT </li>
 *         <li> ITEMS_ERROR </li>
 *         <li> ITEMS_VOTE </li>
 *         <li> USERS_EDIT </li>
 *         <li> USERS_ERROR </li>
 *         <li> USERS_LOGOUT </li>
 *         <li> USERS_REGISTER </li>
 *         <li> USERS_RESET </li>
 *         <li> USERS_SELF </li>
 *         <li> VOTES_ACTIVE </li>
 *         <li> VOTES_ALL </li>
 *         <li> VOTES_CAST </li>
 *         <li> VOTES_ERROR </li>
 *         <li> VOTES_ONE </li>
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
        ITEMS_CANDIDATE: "itemsCandidate",
        ITEMS_EDIT: "itemsEdit",
        ITEMS_ERROR: "itemsError",
        ITEMS_VOTE: "itemsVote",
        USERS_EDIT: "usersEdit",
        USERS_ERROR: "usersError",
        USERS_LOGOUT: "usersLogout",
        USERS_REGISTER: "usersRegister",
        USERS_RESET: "usersReset",
        USERS_SELF: "usersSelf",
        VOTES_ACTIVE: "votesActive",
        VOTES_ALL: "votesAll",
        VOTES_CAST: "votesCast",
        VOTES_ERROR: "votesError",
        VOTES_ONE: "votesOne",
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
 *     <ul>
 *         <li> ERROR </li>
 *     </ul>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Console = Object.freeze({

    Method: {

        ERROR: "error"
    }
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> FIXED </li>
 *     <li> PX </li>
 *     <li> STATIC </li>
 *     <li> PERCENT_100 </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const CSS = Object.freeze({

    FIXED: "fixed",
    PX: "px",
    STATIC: "static",
    PERCENT_100: "100%"
});

 /**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DAYS </li>
 *     <li> HOURS </li>
 *     <li> SECONDS </li>
 *     <li> MINUTES </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Deadline = Object.freeze({

    DAYS: "days",
    HOURS: "hours",
    SECONDS: "seconds",
    MINUTES: "minutes",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DUPLICATE_KEY </li>
 *     <li> USE_LAYOUT_EFFECT_ON_SERVER </li>
 *     <li> VOTE_DOES_NOT_EXIST </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = Object.freeze({

    DUPLICATE_KEY: "E11000 duplicate key error",
    USE_LAYOUT_EFFECT_ON_SERVER: "useLayoutEffect does nothing on the server",
    VOTE_DOES_NOT_EXIST: "Vote does not exist",
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
 *     <li> ITEM_ADD </li>
 *     <li> ITEM_EDIT </li>
 *     <li> KEY_DOWN </li>
 *     <li> LOAD </li>
 *     <li> MESSAGE </li>
 *     <li> MOUSE_DOWN </li>
 *     <li> OPEN </li>
 *     <li> RESIZE </li>
 *     <li> TRANSITION_END </li>
 *     <li> VOTE_AGGREGATE </li>
 *     <li> VOTE_CAST </li>
 *     <li> VOTE_CLOSED </li>
 *     <li> VOTE_COMPLETE </li>
 *     <li> VOTE_DEADLINE </li>
 *     <li> VOTE_OPENED </li>
 *     <li> WEBSOCKET_HEARTBEAT </li>
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
    ITEM_ADD: "itemAdd",
    ITEM_EDIT: "itemEdit",
    KEY_DOWN: "keydown",
    LOAD: "load",
    MESSAGE: "message",
    MOUSE_DOWN: "mousedown",
    OPEN: "open",
    RESIZE: "resize",
    TRANSITION_END: "transitionend",
    VOTE_AGGREGATE: "voteAggregate",
    VOTE_CAST: "voteCast",
    VOTE_CLOSED: "voteClosed",
    VOTE_COMPLETE: "voteComplete",
    VOTE_DEADLINE: "voteDeadline",
    VOTE_OPENED: "voteOpened",
    WEBSOCKET_HEARTBEAT: "websocketHeartbeat",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> COMPONENT_HEIGHT_EDIT_ITEM </li>
 *     <li> COMPONENT_HEIGHT_LIST_HEADER </li>
 *     <li> COMPONENT_HEIGHT_LIST_ITEM </li>
 *     <li> COMPONENT_HEIGHT_RESULT </li>
 *     <li> LOADED_IMAGE_URLS </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Global = Object.freeze({

    COMPONENT_HEIGHT_EDIT_ITEM: "__BALLOT_BOX_COMPONENT_HEIGHT_EDIT_ITEM",
    COMPONENT_HEIGHT_LIST_HEADER: "__BALLOT_BOX_COMPONENT_HEIGHT_LIST_HEADER",
    COMPONENT_HEIGHT_LIST_ITEM: "__BALLOT_BOX_COMPONENT_HEIGHT_LIST_ITEM",
    COMPONENT_HEIGHT_RESULT: "__BALLOT_BOX_COMPONENT_HEIGHT_RESULT",
    LOADED_IMAGE_URLS: "__BALLOT_BOX_LOADED_IMAGE_URLS",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <ul>
 *         <li> STYLE </li> 
 *     </ul>
 *     <li> DIV </li>
 *     <ul>
 *         <li> CHECKBOX </li> 
 *         <li> IMAGE </li> 
 *         <li> PASSWORD </li> 
 *         <li> RADIO </li> 
 *         <li> TEXT </li> 
 *     </ul>
 *     <li> ROOT </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const HTMLElement = Object.freeze({

    Attribute: {

        STYLE: "style"
    },

    DIV: "div",

    InputType: {
        
        CHECKBOX: "checkbox",
        PASSWORD: "password",
        RADIO: "radio",
        TEXT: "text",
    },

    ROOT: "root",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ELEMENT_DIALOG </li>
 *     <li> ELEMENT_ITEM_DETAIL </li>
 *     <li> ELEMENT_RESULT_DETAIL </li>
 *     <li> ERROR_MESSAGE </li>
 *     <li> ERROR_PARAM </li>
 *     <li> LIST_ITEMS_ALL </li>
 *     <li> LIST_ITEMS_CANDIDATE </li>
 *     <li> LIST_ITEMS_VOTE </li>
 *     <li> NAME_ADMIN_PASSWORD </li>
 *     <li> NAME_ADMIN_USERNAME </li>
 *     <li> NAME_ANONYMOUS </li>
 *     <li> NAME_CAST </li>
 *     <li> NAME_DEADLINE </li>
 *     <li> NAME_EMAIL </li>
 *     <li> NAME_IMAGE </li>
 *     <li> NAME_ITEM </li>
 *     <li> NAME_NAME </li>
 *     <li> NAME_PASSWORD </li>
 *     <li> NAME_PASSWORD_CONFIRM </li>
 *     <li> NAME_QUANTITY </li>
 *     <li> NAME_RANK </li>
 *     <li> NAME_RESULTS </li>
 *     <li> NAME_THUMBNAIL </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const ID = Object.freeze({

    ELEMENT_DIALOG: "dialog",
    ELEMENT_ITEM_DETAIL: "itemDetail",
    ELEMENT_RESULT_DETAIL: "resultDetail",
    ERROR_MESSAGE: "msg",
    ERROR_PARAM: "param",
    LIST_ITEMS_ALL: "listItemsAll",
    LIST_ITEMS_CANDIDATE: "listItemsCandidate",
    LIST_ITEMS_VOTE: "listItemsVote",
    NAME_ADMIN_PASSWORD: "adminPassword",
    NAME_ADMIN_USERNAME: "adminUsername",
    NAME_ANONYMOUS: "anonymous",
    NAME_CAST: "cast",
    NAME_DEADLINE: "deadline",
    NAME_EMAIL: "email",
    NAME_IMAGE: "image",
    NAME_ITEM: "item",
    NAME_NAME: "name",
    NAME_PASSWORD_CONFIRM: "passwordConfirm",
    NAME_PASSWORD: "password",
    NAME_QUANTITY: "quantity",
    NAME_RANK: "rank",
    NAME_RESULTS: "results",
    NAME_THUMBNAIL: "thumbnail",
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

    TRANSPARENT_PLACEHOLDER: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
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
 *     <li> ARROW </li>
 *     <li> CANCEL </li>
 *     <li> CANDIDATES </li>
 *     <li> CLOSE </li>
 *     <li> CLOSED </li>
 *     <li> CONFIRM </li>
 *     <li> CONFIRM_ADD_ITEM </li>
 *     <li> CONFIRM_CLOSE_VOTE </li>
 *     <li> CONFIRM_EDIT </li>
 *     <li> CONFIRM_EDIT_ITEM </li>
 *     <li> CONFIRM_OPEN_VOTE </li>
 *     <li> CONFIRM_VOTE </li>
 *     <li> DAYS </li>
 *     <li> DEADLINE </li>
 *     <li> EDIT </li>
 *     <li> EDIT_ITEMS </li>
 *     <li> EMAIL </li>
 *     <li> EMAIL_REFER </li>
 *     <li> EMAIL_REGISTRATION </li>
 *     <li> EMAIL_RESET </li>
 *     <li> EMAIL_SENT </li>
 *     <li> EMPTY_ITEMS </li>
 *     <li> EMPTY_RESULTS </li>
 *     <li> ERROR </li>
 *     <li> HIDE </li>
 *     <li> HOURS </li>
 *     <li> ICON </li>
 *     <li> IMAGE </li>
 *     <li> LIVE </li>
 *     <li> LIVE_UPDATES </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> MANAGE_VOTE </li>
 *     <li> MINUTES </li>
 *     <li> NAME </li>
 *     <li> NEW </li>
 *     <li> OK </li>
 *     <li> OPEN </li>
 *     <li> OPTIONAL </li>
 *     <li> PASSWORD </li>
 *     <li> PENDING </li>
 *     <li> PENDING_RESULTS </li>
 *     <li> QUANTITY </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> RESULTS </li>
 *     <li> SECONDS </li>
 *     <li> SECRET_BALLOT </li>
 *     <li> SHOW </li>
 *     <li> THUMBNAIL </li>
 *     <li> TOTAL_VOTES_CAST </li>
 *     <li> VOTE </li>
 *     <li> VOTE_CAST </li>
 *     <li> VOTE_STATUS </li>
 *     <li> VOTES </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Label = Object.freeze({

    ADD_ITEM: "Add Item",
    ADD: "Add",
    ADMIN_CREDENTIALS: "Admin Credentials",
    ADMIN_PASSWORD: "Admin Password",
    ADMIN_USERNAME: "Admin Username",
    ADMIN: "Admin",
    ARROW: "Arrow",
    CANCEL: "Cancel",
    CANDIDATES: "Candidates",
    CLOSE: "Close",
    CLOSED: "Closed",
    CONFIRM_ADD_ITEM: "Are you sure you want to add this item?",
    CONFIRM_CLOSE_VOTE: "Are you sure you want to close the vote?",
    CONFIRM_EDIT_ITEM: "Are you sure you want to edit this item?",
    CONFIRM_EDIT: "Are you sure you want to edit your user account?",
    CONFIRM_OPEN_VOTE: "Are you sure you want to open a vote?",
    CONFIRM_VOTE: "Are you sure you want to cast this ballot?",
    CONFIRM: "Confirm",
    DAYS: "Days",
    DEADLINE: "Deadline",
    EDIT_ITEMS: "Edit Items",
    EDIT: "Edit",
    EMAIL_REFER: "Please refer to the email in order to",
    EMAIL_REGISTRATION: "complete your registration and activate your account.",
    EMAIL_RESET: "confirm the request to reset your account password.",
    EMAIL_SENT: "An email has been sent to:",
    EMAIL: "Email",
    EMPTY_ITEMS: "No Items Available",
    EMPTY_RESULTS: "No Results Available",
    ERROR: "Error",
    HIDE: "Hide",
    HOURS: "Hours",
    ICON: "Icon",
    IMAGE: "Image",
    LIVE_UPDATES: "Live Updates",
    LIVE: "Live",
    LOGIN: "Login",
    LOGOUT: "Logout",
    MANAGE_VOTE: "Manage Vote",
    MINUTES: "Minutes",
    NAME: "Name",
    NEW: "New",
    OK: "OK",
    OPEN: "Open",
    OPTIONAL: "(Optional)",
    PASSWORD: "Password",
    PENDING_RESULTS: "Pending Results",
    PENDING: "Pending",
    QUANTITY: "Quantity",
    REGISTER: "Register",
    RESET: "Reset",
    RESULTS: "Results",
    SECONDS: "Seconds",
    SECRET_BALLOT: "Secret Ballot",
    SHOW: "Show",
    THUMBNAIL: "Thumbnail",
    TOTAL_VOTES_CAST: "Total Votes Cast:",
    VOTE_CAST: "Your ballot has been cast for the current vote.",
    VOTE_STATUS: "Vote Status:",
    VOTE: "Vote",
    VOTES: "Votes",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DATE_FORMAT </li>
 *     <li> DATE_TIME_FORMAT </li>
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

    DATE_FORMAT: "dddd, MMMM Do YYYY",
    DATE_TIME_FORMAT: "dddd, MMMM Do YYYY, h:mm:ss A",
    ENV_DEVELOPMENT: "development",
    PROTOCOL_HTTP: "http",
    PROTOCOL_WEB_SOCKET: "ws",
    TOKEN: "token",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> VIRTUAL </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Mode = Object.freeze({

    VIRTUAL: "virtual"
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ACTIVE </li>
 *     <li> ADMIN </li>
 *     <li> AGGREGATE </li>
 *     <li> ANONYMOUS </li>
 *     <li> CAST </li>
 *     <li> DATE </li>
 *     <li> DEADLINE </li>
 *     <li> EMAIL </li>
 *     <li> ID </li>
 *     <li> IMAGE </li>
 *     <li> IP </li>
 *     <li> ITEM </li>
 *     <li> NAME </li>
 *     <li> QUANTITY </li>
 *     <li> RANK </li>
 *     <li> THUMBNAIL </li>
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
    AGGREGATE: "aggregate",
    ANONYMOUS: "anonymous",
    CAST: "cast",
    DATE: "date",
    DEADLINE: "deadline",
    EMAIL: "email",
    ID: "_id",
    IMAGE: "image",
    IP: "ip",
    ITEM: "item",
    NAME: "name",
    QUANTITY: "quantity",
    RANK: "rank",
    THUMBNAIL: "thumbnail",
    TOKEN: "token",
    TOTAL: "total",
    USER: "user",
    VOTE: "vote",
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
 *     <li> CAST </li>
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
    CAST: "/cast",
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
 *     <li> ADD_ITEM </li>
 *     <li> ADD_ITEM_IMAGE </li>
 *     <li> ADD_ITEM_NAME </li>
 *     <li> ADD_ITEM_SUBMIT </li>
 *     <li> ADD_ITEM_SUBMIT_BUTTON </li>
 *     <li> ADD_ITEM_SUBMIT_PRELOADER </li>
 *     <li> ADD_ITEM_THUMBNAIL </li>
 *     <li> ADMIN_CONTAINER </li>
 *     <li> ADMIN_CONTAINER_ADD_ITEM </li>
 *     <li> ADMIN_CONTAINER_EDIT_ITEMS_CONTAINER </li>
 *     <li> ADMIN_CONTAINER_MANAGE_VOTE </li>
 *     <li> ADMIN_CREDENTIALS </li>
 *     <li> ADMIN_CREDENTIALS_ERROR </li>
 *     <li> ADMIN_CREDENTIALS_ERROR_SHOW </li>
 *     <li> ADMIN_CREDENTIALS_PASSWORD </li>
 *     <li> ADMIN_CREDENTIALS_USERNAME </li>
 *     <li> BUTTON </li>
 *     <li> BUTTON_NAVIGATION </li>
 *     <li> BUTTON_NAVIGATION_SELECTED </li>
 *     <li> BUTTON_SUBMIT </li>
 *     <li> BUTTON_SUBMIT_EMPHASIS </li>
 *     <li> COLLAPSIBLE </li>
 *     <li> COLLAPSIBLE_ARROW </li>
 *     <li> COLLAPSIBLE_ARROW_EXPANDED </li>
 *     <li> COLLAPSIBLE_CONTENT </li>
 *     <li> CONFIRMATION </li>
 *     <li> CONFIRMATION_EMAIL </li>
 *     <li> DIALOG </li>
 *     <li> DIALOG_CONTENT </li>
 *     <li> DIALOG_SUBMIT </li>
 *     <li> DIALOG_SUBMIT_PRELOADER </li>
 *     <li> EDIT </li>
 *     <li> EDIT_ADMIN </li>
 *     <li> EDIT_BUTTONS </li>
 *     <li> EDIT_ITEM </li>
 *     <li> EDIT_ITEM_IMAGE </li>
 *     <li> EDIT_ITEM_NAME </li>
 *     <li> EDIT_ITEM_SUBMIT </li>
 *     <li> EDIT_ITEM_SUBMIT_BUTTONS </li>
 *     <li> EDIT_ITEM_SUBMIT_PRELOADER </li>
 *     <li> EDIT_ITEM_THUMBNAIL </li>
 *     <li> EDIT_ITEMS_CONTAINER </li>
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT </li>
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT_EMPTY </li>
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT_LIST </li>
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT_LIST_ITEM_SIZE_CONTAINER </li>
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT_PRELOADER </li>
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT_SHADOW </li>
 *     <li> EDIT_NAME </li>
 *     <li> EDIT_PASSWORD </li>
 *     <li> EDIT_PASSWORD_CONFIRM </li>
 *     <li> ERROR_RESPONSE </li>
 *     <li> ERROR_RESPONSE_ICON </li>
 *     <li> ERROR_RESPONSE_TEXT </li>
 *     <li> HIDDEN </li>
 *     <li> INPUT_PASSWORD </li>
 *     <li> INPUT_TEXT </li>
 *     <li> INPUT_TEXT_ERROR </li>
 *     <li> INPUT_TEXT_ERROR_SHOW </li>
 *     <li> INPUT_TEXT_INPUT </li>
 *     <li> INPUT_TEXT_INPUT_MAXIMIZE </li>
 *     <li> INPUT_TEXT_PLACEHOLDER </li>
 *     <li> INPUT_TEXT_PLACEHOLDER_MAXIMIZE </li>
 *     <li> ITEM_DETAIL </li>
 *     <li> ITEM_DETAIL_IMAGE </li>
 *     <li> ITEM_DETAIL_IMAGE_ERROR </li>
 *     <li> ITEM_DETAIL_IMAGE_INTERSECTION </li>
 *     <li> ITEM_DETAIL_IMAGE_PRELOADER </li>
 *     <li> ITEM_DETAIL_TITLE </li>
 *     <li> LIST </li>
 *     <li> LIST_CONTAINER </li>
 *     <li> LIST_CONTENT </li>
 *     <li> LIST_ITEM </li>
 *     <li> LIST_ITEM_ACTIVE </li>
 *     <li> LIST_ITEM_IMAGE </li>
 *     <li> LIST_ITEM_IMAGE_ERROR </li>
 *     <li> LIST_ITEM_IMAGE_INTERSECTION </li>
 *     <li> LIST_ITEM_TITLE </li>
 *     <li> LIST_TITLE </li>
 *     <li> LOGIN </li>
 *     <li> LOGIN_EMAIL </li>
 *     <li> LOGIN_ERROR </li>
 *     <li> LOGIN_ERROR_SHOW </li>
 *     <li> LOGIN_PASSWORD </li>
 *     <li> LOGIN_SUBMIT </li>
 *     <li> LOGIN_SUBMIT_BUTTON </li>
 *     <li> LOGIN_SUBMIT_PRELOADER </li>
 *     <li> MANAGE_VOTE </li>
 *     <li> MANAGE_VOTE_DEADLINE </li>
 *     <li> MANAGE_VOTE_LIVE </li>
 *     <li> MANAGE_VOTE_PENDING </li>
 *     <li> MANAGE_VOTE_QUANTITY </li>
 *     <li> MANAGE_VOTE_SECRET </li>
 *     <li> MANAGE_VOTE_SUBMIT </li>
 *     <li> MANAGE_VOTE_SUBMIT_BUTTON </li>
 *     <li> MANAGE_VOTE_SUBMIT_PRELOADER </li>
 *     <li> NO_FOCUS_OUTLINE </li>
 *     <li> PORTAL </li>
 *     <li> PROTECTED_CONTAINER </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON_SELECTED </li>
 *     <li> PROTECTED_CONTAINER_PRELOADER </li>
 *     <li> PUBLIC_CONTAINER </li>
 *     <li> PUBLIC_CONTAINER_CONTENT </li>
 *     <li> PUBLIC_CONTAINER_CONTENT_FORM </li>
 *     <li> PUBLIC_CONTAINER_CONTENT_FORM_NAV </li>
 *     <li> PUBLIC_CONTAINER_CONTENT_ICON: </li>
 *     <li> PUBLIC_CONTAINER_PRELOADER </li>
 *     <li> RADIO </li>
 *     <li> REGISTER </li>
 *     <li> REGISTER_EMAIL </li>
 *     <li> REGISTER_NAME </li>
 *     <li> REGISTER_PASSWORD </li>
 *     <li> REGISTER_PASSWORD_CONFIRM </li>
 *     <li> REGISTER_SUBMIT </li>
 *     <li> REGISTER_SUBMIT_BUTTON </li>
 *     <li> REGISTER_SUBMIT_PRELOADER </li>
 *     <li> RESET </li>
 *     <li> RESET_EMAIL </li>
 *     <li> RESET_PASSWORD </li>
 *     <li> RESET_PASSWORD_CONFIRM </li>
 *     <li> RESET_SUBMIT </li>
 *     <li> RESET_SUBMIT_BUTTON </li>
 *     <li> RESET_SUBMIT_PRELOADER </li>
 *     <li> RESULT </li>
 *     <li> RESULT_ACTIVE_BADGE </li>
 *     <li> RESULT_ACTIVE_BADGE_LIVE </li>
 *     <li> RESULT_ACTIVE_BADGE_PENDING </li>
 *     <li> RESULT_DETAIL </li>
 *     <li> RESULT_DETAIL_CONTAINER </li>
 *     <li> RESULT_DETAIL_CONTAINER_PRELOADER </li>
 *     <li> RESULT_DETAIL_CONTAINER_TABLE </li>
 *     <li> RESULT_DETAIL_TABLE_INFO </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_ACTIVE </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_ANONYMOUS </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_DATE </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_QUANTITY </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_TOTAL </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_ITEM </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_SCORE </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_RANK </li>
 *     <li> RESULT_DETAIL_TABLE_USER_HEADER </li>
 *     <li> RESULT_DETAIL_TABLE_USER_HEADER_USER </li>
 *     <li> RESULT_DETAIL_TABLE_USER_HEADER_USER_EMAIL </li>
 *     <li> RESULT_DETAIL_TABLE_USER_HEADER_USER_IP </li>
 *     <li> RESULT_DETAIL_TABLE_USER_HEADER_USER_NAME </li>
 *     <li> RESULTS_CONTAINER </li>
 *     <li> RESULTS_CONTAINER_EMPTY </li>
 *     <li> RESULTS_CONTAINER_LIST </li>
 *     <li> RESULTS_CONTAINER_LIST_ITEM_SIZE_CONTAINER </li>
 *     <li> RESULTS_CONTAINER_PRELOADER </li>
 *     <li> TOGGLE </li>
 *     <li> TRANSPARENT </li>
 *     <li> USER_INFO </li>
 *     <li> USER_INFO_TABLE </li>
 *     <li> USER_INFO_TABLE_LABEL </li>
 *     <li> VISIBLE </li>
 *     <li> VOTE </li>
 *     <li> VOTE_BUTTONS </li>
 *     <li> VOTE_ERROR </li>
 *     <li> VOTE_INFO </li>
 *     <li> VOTE_INFO_DEADLINE </li>
 *     <li> VOTE_INFO_STATUS </li>
 *     <li> VOTE_INFO_STATUS_LABEL </li>
 *     <li> VOTE_PRELOADER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Style = Object.freeze({

    ADD_ITEM_IMAGE: "addItem-image",
    ADD_ITEM_NAME: "addItem-name",
    ADD_ITEM_SUBMIT_BUTTON: "addItem-submit-button",
    ADD_ITEM_SUBMIT_PRELOADER: "addItem-submit-preloader",
    ADD_ITEM_SUBMIT: "addItem-submit",
    ADD_ITEM_THUMBNAIL: "addItem-thumbnail",
    ADD_ITEM: "addItem",
    ADMIN_CONTAINER_ADD_ITEM: "adminContainer-addItem",
    ADMIN_CONTAINER_EDIT_ITEMS_CONTAINER: "adminContainer-editItemsContainer",
    ADMIN_CONTAINER_MANAGE_VOTE: "adminContainer-manageVote",
    ADMIN_CONTAINER: "adminContainer",
    ADMIN_CREDENTIALS_ERROR_SHOW: "adminCredentials-error-show",
    ADMIN_CREDENTIALS_ERROR: "adminCredentials-error",
    ADMIN_CREDENTIALS_PASSWORD: "adminCredentials-password",
    ADMIN_CREDENTIALS_USERNAME: "adminCredentials-username",
    ADMIN_CREDENTIALS: "adminCredentials",
    BUTTON_NAVIGATION_SELECTED: "button-navigation-selected",
    BUTTON_NAVIGATION: "button-navigation",
    BUTTON_SUBMIT_EMPHASIS: "button-submit-emphasis",
    BUTTON_SUBMIT: "button-submit",
    BUTTON: "button",
    COLLAPSIBLE_ARROW_EXPANDED: "collapsible-arrow-expanded",
    COLLAPSIBLE_ARROW: "collapsible-arrow",
    COLLAPSIBLE_CONTENT: "collapsible-content",
    COLLAPSIBLE: "collapsible",
    CONFIRMATION_EMAIL: "confirmation-email",
    CONFIRMATION: "confirmation",
    DIALOG_CONTENT: "dialog-content",
    DIALOG_SUBMIT_PRELOADER: "dialog-submit-preloader",
    DIALOG_SUBMIT: "dialog-submit",
    DIALOG: "dialog",
    EDIT_ADMIN: "edit-admin",
    EDIT_BUTTONS: "edit-buttons",
    EDIT_ITEM_IMAGE: "editItem-image",
    EDIT_ITEM_NAME: "editItem-name",
    EDIT_ITEM_SUBMIT_BUTTONS: "editItem-submit-buttons",
    EDIT_ITEM_SUBMIT_PRELOADER: "editItem-submit-preloader",
    EDIT_ITEM_SUBMIT: "editItem-submit",
    EDIT_ITEM_THUMBNAIL: "editItem-thumbnail",
    EDIT_ITEM: "editItem",
    EDIT_ITEMS_CONTAINER_CONTENT_EMPTY: "editItemsContainer-content-empty",
    EDIT_ITEMS_CONTAINER_CONTENT_LIST: "editItemsContainer-content-list",
    EDIT_ITEMS_CONTAINER_CONTENT_LIST_ITEM_SIZE_CONTAINER: "editItemsContainer-content-list-itemSizeContainer",
    EDIT_ITEMS_CONTAINER_CONTENT_PRELOADER: "editItemsContainer-content-preloader",
    EDIT_ITEMS_CONTAINER_CONTENT_SHADOW: "editItemsContainer-content-shadow",
    EDIT_ITEMS_CONTAINER_CONTENT: "editItemsContainer-content",
    EDIT_ITEMS_CONTAINER: "editItemsContainer",
    EDIT_NAME: "edit-name",
    EDIT_PASSWORD_CONFIRM: "edit-passwordConfirm",
    EDIT_PASSWORD: "edit-password",
    EDIT: "edit",
    ERROR_RESPONSE_ICON: "errorResponse-icon",
    ERROR_RESPONSE_TEXT: "errorResponse-text",
    ERROR_RESPONSE: "errorResponse",
    HIDDEN: "hidden",
    INPUT_PASSWORD: "inputPassword",
    INPUT_TEXT_ERROR_SHOW: "inputText-error-show",
    INPUT_TEXT_ERROR: "inputText-error",
    INPUT_TEXT_INPUT_MAXIMIZE: "inputText-input-maximize",
    INPUT_TEXT_INPUT: "inputText-input",
    INPUT_TEXT_PLACEHOLDER_MAXIMIZE: "inputText-placeholder-maximize",
    INPUT_TEXT_PLACEHOLDER: "inputText-placeholder",
    INPUT_TEXT: "inputText",
    ITEM_DETAIL_IMAGE_ERROR: "itemDetail-image-error",
    ITEM_DETAIL_IMAGE_INTERSECTION: "itemDetail-image-intersection",
    ITEM_DETAIL_IMAGE_PRELOADER: "itemDetail-image-preloader",
    ITEM_DETAIL_IMAGE: "itemDetail-image",
    ITEM_DETAIL_TITLE: "itemDetail-title",
    ITEM_DETAIL: "itemDetail",
    LIST_CONTAINER: "listContainer",
    LIST_CONTENT: "list-content",
    LIST_ITEM_ACTIVE: "listItem-active",
    LIST_ITEM_IMAGE_ERROR: "listItem-image-error",
    LIST_ITEM_IMAGE_INTERSECTION: "listItem-image-intersection",
    LIST_ITEM_IMAGE: "listItem-image",
    LIST_ITEM_TITLE: "listItem-title",
    LIST_ITEM: "listItem",
    LIST_TITLE: "list-title",
    LIST: "list",
    LOGIN_EMAIL: "login-email",
    LOGIN_ERROR_SHOW: "login-error-show",
    LOGIN_ERROR: "login-error",
    LOGIN_PASSWORD: "login-password",
    LOGIN_SUBMIT_BUTTON: "login-submit-button",
    LOGIN_SUBMIT_PRELOADER: "login-submit-preloader",
    LOGIN_SUBMIT: "login-submit",
    LOGIN: "login",
    MANAGE_VOTE_DEADLINE: "manageVote-deadline",
    MANAGE_VOTE_LIVE: "manageVote-live",
    MANAGE_VOTE_PENDING: "manageVote-pending",
    MANAGE_VOTE_QUANTITY: "manageVote-quantity",
    MANAGE_VOTE_SECRET: "manageVote-secret",
    MANAGE_VOTE_SUBMIT_BUTTON: "manageVote-submit-button",
    MANAGE_VOTE_SUBMIT_PRELOADER: "manageVote-submit-preloader",
    MANAGE_VOTE_SUBMIT: "manageVote-submit",
    MANAGE_VOTE: "manageVote",
    NO_FOCUS_OUTLINE: "noFocusOutline",
    PORTAL: "portal",
    PROTECTED_CONTAINER_CONTENT: "protectedContainer-content",
    PROTECTED_CONTAINER_NAV_BUTTON_SELECTED: "protectedContainer-nav-button-selected",
    PROTECTED_CONTAINER_NAV_BUTTON: "protectedContainer-nav-button",
    PROTECTED_CONTAINER_PRELOADER: "protectedContainer-preloader",
    PROTECTED_CONTAINER: "protectedContainer",
    PUBLIC_CONTAINER_CONTENT_FORM_NAV: "publicContainer-content-form-nav",
    PUBLIC_CONTAINER_CONTENT_FORM: "publicContainer-content-form",
    PUBLIC_CONTAINER_CONTENT_ICON: "publicContainer-content-icon",
    PUBLIC_CONTAINER_CONTENT: "publicContainer-content",
    PUBLIC_CONTAINER_PRELOADER: "publicContainer-preloader",
    PUBLIC_CONTAINER: "publicContainer",
    RADIO: "radio",
    REGISTER_EMAIL: "register-email",
    REGISTER_NAME: "register-name",
    REGISTER_PASSWORD_CONFIRM: "register-passwordConfirm",
    REGISTER_PASSWORD: "register-password",
    REGISTER_SUBMIT_BUTTON: "register-submit-button",
    REGISTER_SUBMIT_PRELOADER: "register-submit-preloader",
    REGISTER_SUBMIT: "register-submit",
    REGISTER: "register",
    RESET_EMAIL: "reset-email",
    RESET_PASSWORD_CONFIRM: "reset-passwordConfirm",
    RESET_PASSWORD: "reset-password",
    RESET_SUBMIT_BUTTON: "reset-submit-button",
    RESET_SUBMIT_PRELOADER: "reset-submit-preloader",
    RESET_SUBMIT: "reset-submit",
    RESET: "reset",
    RESULT_ACTIVE_BADGE_LIVE: "resultActiveBadge-live",
    RESULT_ACTIVE_BADGE_PENDING: "resultActiveBadge-pending",
    RESULT_ACTIVE_BADGE: "resultActiveBadge",
    RESULT_DETAIL_CONTAINER_PRELOADER: "resultDetail-container-preloader",
    RESULT_DETAIL_CONTAINER_TABLE: "resultDetail-container-table",
    RESULT_DETAIL_CONTAINER: "resultDetail-container",
    RESULT_DETAIL_TABLE_INFO_ACTIVE: "resultDetailTableInfo-active",
    RESULT_DETAIL_TABLE_INFO_ANONYMOUS: "resultDetailTableInfo-anonymous",
    RESULT_DETAIL_TABLE_INFO_DATE: "resultDetailTableInfo-date",
    RESULT_DETAIL_TABLE_INFO_QUANTITY: "resultDetailTableInfo-quantity",
    RESULT_DETAIL_TABLE_INFO_TOTAL: "resultDetailTableInfo-total",
    RESULT_DETAIL_TABLE_INFO: "resultDetailTableInfo",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_ITEM: "resultDetailTableItemRow-header-item",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_SCORE: "resultDetailTableItemRow-header-score",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER: "resultDetailTableItemRow-header",
    RESULT_DETAIL_TABLE_ITEM_ROW_RANK: "resultDetailTableItemRow-rank",
    RESULT_DETAIL_TABLE_ITEM_ROW: "resultDetailTableItemRow",
    RESULT_DETAIL_TABLE_USER_HEADER_USER_EMAIL: "resultDetailTableUserHeader-user-email",
    RESULT_DETAIL_TABLE_USER_HEADER_USER_IP: "resultDetailTableUserHeader-user-ip",
    RESULT_DETAIL_TABLE_USER_HEADER_USER_NAME: "resultDetailTableUserHeader-user-name",
    RESULT_DETAIL_TABLE_USER_HEADER_USER: "resultDetailTableUserHeader-user",
    RESULT_DETAIL_TABLE_USER_HEADER: "resultDetailTableUserHeader",
    RESULT_DETAIL: "resultDetail",
    RESULT: "result",
    RESULTS_CONTAINER_EMPTY: "resultsContainer-empty",
    RESULTS_CONTAINER_LIST: "resultsContainer-list",
    RESULTS_CONTAINER_LIST_ITEM_SIZE_CONTAINER: "resultsContainer-list-itemSizeContainer",
    RESULTS_CONTAINER_PRELOADER: "resultsContainer-preloader",
    RESULTS_CONTAINER: "resultsContainer",
    TOGGLE: "toggle",
    TRANSPARENT: "transparent",
    USER_INFO_TABLE_LABEL: "userInfo-table-label",
    USER_INFO_TABLE: "userInfo-table",
    USER_INFO: "userInfo",
    VISIBLE: "visible",
    VOTE_BUTTONS: "vote-buttons",
    VOTE_ERROR: "vote-error",
    VOTE_INFO_DEADLINE: "voteInfo-deadline",
    VOTE_INFO_STATUS_LABEL: "voteInfo-status-label",
    VOTE_INFO_STATUS: "voteInfo-status",
    VOTE_INFO: "voteInfo",
    VOTE_PRELOADER: "vote-preloader",
    VOTE: "vote",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> TYPE </li>
 *     <li> DATA </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const WebSocket = Object.freeze({

    TYPE: "type",
    DATA: "data"
});

/**
 * Export module
 * 
 */
export {

    Access,
    Action,
    CharCode,
    Console,
    CSS,
    Deadline,
    Error,
    Event,
    Global,
    HTMLElement,
    ID,
    Image,
    Label,
    Local,
    Mode,
    Model,
    Request,
    Route,
    Style,
    WebSocket
};