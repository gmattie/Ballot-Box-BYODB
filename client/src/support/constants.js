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
 *     <li> PX </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const CSS = Object.freeze({

    PX: "px"
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DUPLICATE_KEY </li>
 *     <li> VOTE_DOES_NOT_EXIST </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Error = Object.freeze({

    DUPLICATE_KEY: "E11000 duplicate key error",
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
 *     <li> HEARTBEAT </li>
 *     <li> KEY_DOWN </li>
 *     <li> LOAD </li>
 *     <li> MESSAGE </li>
 *     <li> MOUSE_DOWN </li>
 *     <li> OPEN </li>
 *     <li> TRANSITION_END </li>
 *     <ul>
 *         <li> DEADLINE </li>
 *         <li> VOTE </li>
 *         <li> WEBSOCKET </li>
 *     </ul>
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
    HEARTBEAT: "heartbeat",
    KEY_DOWN: "keydown",
    LOAD: "load",
    MESSAGE: "message",
    MOUSE_DOWN: "mousedown",
    OPEN: "open",
    TRANSITION_END: "transitionend",

    Type: {

        DEADLINE: "deadline",
        VOTE: "vote",
        WEBSOCKET: "webSocket",
    },
    
    VOTE_CAST: "voteCast",
    VOTE_CLOSED: "voteClosed",
    VOTE_COMPLETE: "voteComplete",
    VOTE_OPENED: "voteOpened",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> LIST_ITEM_DRAG_TARGET </li>
 *     <li> WEB_SOCKET_MESSAGE_PROTECTED_CONTAINER </li>
 *     <li> WEB_SOCKET_MESSAGE_RESULT_DETAIL </li>
 *     <li> WEB_SOCKET_MESSAGE_RESULTS_CONTAINER </li>
 *     <li> WEB_SOCKET_MESSAGE_VOTE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Global = Object.freeze({

    LIST_ITEM_DRAG_TARGET: "listItemDragTarget",
    WEB_SOCKET_MESSAGE_PROTECTED_CONTAINER: "webSocketMessageProtectedContainer",
    WEB_SOCKET_MESSAGE_RESULT_DETAIL: "webSocketMessageResultDetail",
    WEB_SOCKET_MESSAGE_RESULTS_CONTAINER: "webSocketMessageResultsContainer",
    WEB_SOCKET_MESSAGE_VOTE: "webSocketMessageVote",
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
        IMAGE: "image",
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
 *     <li> DEADLINE_DAYS </li>
 *     <li> DEADLINE_HOURS </li>
 *     <li> DEADLINE_MINUTES </li>
 *     <li> DEADLINE_SECONDS </li>
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

    DEADLINE_DAYS: "days",
    DEADLINE_HOURS: "hours",
    DEADLINE_MINUTES: "minutes",
    DEADLINE_SECONDS: "seconds",
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
 *     <li> CONFIRM_CLOSE_POLLS </li>
 *     <li> CONFIRM_EDIT </li>
 *     <li> CONFIRM_EDIT_ITEM </li>
 *     <li> CONFIRM_OPEN_POLLS </li>
 *     <li> CONFIRM_VOTE </li>
 *     <li> DEADLINE </li>
 *     <li> DEADLINE_DAYS </li>
 *     <li> DEADLINE_HOURS </li>
 *     <li> DEADLINE_MINUTES </li>
 *     <li> DEADLINE_SECONDS </li>
 *     <li> EDIT </li>
 *     <li> EDIT_ITEMS </li>
 *     <li> EMAIL </li>
 *     <li> EMAIL_REFER </li>
 *     <li> EMAIL_REGISTRATION </li>
 *     <li> EMAIL_RESET </li>
 *     <li> EMAIL_SENT </li>
 *     <li> ERROR </li>
 *     <li> HIDE </li>
 *     <li> ICON </li>
 *     <li> IMAGE </li>
 *     <li> LIVE </li>
 *     <li> LIVE_UPDATES </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> MANAGE_POLLS </li>
 *     <li> NAME </li>
 *     <li> NEW </li>
 *     <li> OK </li>
 *     <li> OPEN </li>
 *     <li> OPTIONAL </li>
 *     <li> PASSWORD </li>
 *     <li> PENDING </li>
 *     <li> PENDING_RESULTS </li>
 *     <li> POLLS_STATUS </li>
 *     <li> QUANTITY </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> RESULTS </li>
 *     <li> SECRET_BALLOT </li>
 *     <li> SHOW </li>
 *     <li> THUMBNAIL </li>
 *     <li> TOTAL_VOTES_CAST </li>
 *     <li> VOTE </li>
 *     <li> VOTE_CAST </li>
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
    CONFIRM_CLOSE_POLLS: "Are you sure you want to close the polls?",
    CONFIRM_EDIT_ITEM: "Are you sure you want to edit this item?",
    CONFIRM_EDIT: "Are you sure you want to edit your user account?",
    CONFIRM_OPEN_POLLS: "Are you sure you want to open the polls?",
    CONFIRM_VOTE: "Are you sure you want to cast this vote?",
    CONFIRM: "Confirm",
    DEADLINE_DAYS: "Days",
    DEADLINE_HOURS: "Hours",
    DEADLINE_MINUTES: "Minutes",
    DEADLINE_SECONDS: "Seconds",
    DEADLINE: "Deadline",
    EDIT_ITEMS: "Edit Items",
    EDIT: "Edit",
    EMAIL_REFER: "Please refer to the email in order to",
    EMAIL_REGISTRATION: "complete your registration and activate your account.",
    EMAIL_RESET: "confirm the request to reset your account password.",
    EMAIL_SENT: "An email has been sent to:",
    EMAIL: "Email",
    ERROR: "Error",
    HIDE: "Hide",
    ICON: "Icon",
    IMAGE: "Image",
    LIVE_UPDATES: "Live Updates",
    LIVE: "Live",
    LOGIN: "Login",
    LOGOUT: "Logout",
    MANAGE_POOLS: "Manage Polls",
    NAME: "Name",
    NEW: "New",
    OK: "OK",
    OPEN: "Open",
    OPTIONAL: "(Optional)",
    PASSWORD: "Password",
    PENDING_RESULTS: "Pending Results",
    PENDING: "Pending",
    POLLS_STATUS: "Polls Status:",
    QUANTITY: "Quantity",
    REGISTER: "Register",
    RESET: "Reset",
    RESULTS: "Results",
    SECRET_BALLOT: "Secret Ballot",
    SHOW: "Show",
    THUMBNAIL: "Thumbnail",
    TOTAL_VOTES_CAST: "Total Votes Cast:",
    VOTE_CAST: "Your vote has been cast for the current poll.",
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
 *     <li> ACTIVE </li>
 *     <li> ADMIN </li>
 *     <li> ANONYMOUS </li>
 *     <li> AGGREGATE </li>
 *     <li> CAST </li>
 *     <li> DATE </li>
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
    ANONYMOUS: "anonymous",
    AGGREGATE: "aggregate",
    CAST: "cast",
    DATE: "date",
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
 *     <li> ADMIN_CONTAINER_MANAGE_POLLS </li>
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
 *     <li> DIALOG_MESSAGE </li>
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
 *     <li> EDIT_ITEMS_CONTAINER_CONTENT_PRELOADER </li>
 *     <li> EDIT_NAME </li>
 *     <li> EDIT_PASSWORD </li>
 *     <li> EDIT_PASSWORD_CONFIRM </li>
 *     <li> ERROR_RESPONSE </li>
 *     <li> ERROR_RESPONSE_ICON </li>
 *     <li> ERROR_RESPONSE_TEXT </li>
 *     <li> HIDDEN </li>
 *     <li> INPUT_PASSWORD </li>
 *     <li> INPUT_PASSWORD_BUTTON </li>
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
 *     <li> MANAGE_POLLS </li>
 *     <li> MANAGE_POLLS_BUTTON_CLOSE </li>
 *     <li> MANAGE_POLLS_BUTTON_OPEN </li>
 *     <li> MANAGE_POLLS_DEADLINE </li>
 *     <li> MANAGE_POLLS_LIVE </li>
 *     <li> MANAGE_POLLS_PENDING </li>
 *     <li> MANAGE_POLLS_PRELOADER </li>
 *     <li> MANAGE_POLLS_QUANTITY </li>
 *     <li> MANAGE_POLLS_SECRET </li>
 *     <li> NO_FOCUS_OUTLINE </li>
 *     <li> PORTAL </li>
 *     <li> PROTECTED_CONTAINER </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON_SELECTED </li>
 *     <li> PROTECTED_CONTAINER_PRELOADER </li>
 *     <li> PROTECTED_CONTAINER_USER_INFO </li>
 *     <li> PROTECTED_CONTAINER_WEBSOCKET_MESSAGE </li>
 *     <li> PUBLIC_CONTAINER </li>
 *     <li> PUBLIC_CONTAINER_CONTENT </li>
 *     <li> PUBLIC_CONTAINER_CONTENT_NAV </li>
 *     <li> PUBLIC_CONTAINER_ICON </li>
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
 *     <li> RESULTS_CONTAINER_PRELOADER </li>
 *     <li> TOGGLE </li>
 *     <li> TRANSPARENT </li>
 *     <li> VISIBLE </li>
 *     <li> VOTE </li>
 *     <li> VOTE_BUTTONS </li>
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
    ADMIN_CONTAINER_MANAGE_POLLS: "adminContainer-managePolls",
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
    DIALOG_MESSAGE: "dialog-message",
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
    EDIT_ITEMS_CONTAINER_CONTENT_PRELOADER: "editItemsContainer-content-preloader",
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
    INPUT_PASSWORD_BUTTON: "inputPassword-button",
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
    MANAGE_POLLS_BUTTON_CLOSE: "managePolls-button-close",
    MANAGE_POLLS_BUTTON_OPEN: "managePolls-button-open",
    MANAGE_POLLS_DEADLINE: "managePolls-deadline",
    MANAGE_POLLS_LIVE: "managePolls-live",
    MANAGE_POLLS_PENDING: "managePolls-pending",
    MANAGE_POLLS_PRELOADER: "managePolls-preloader",
    MANAGE_POLLS_QUANTITY: "managePolls-quantity",
    MANAGE_POLLS_SECRET: "managePolls-secret",
    MANAGE_POLLS: "managePolls",
    NO_FOCUS_OUTLINE: "noFocusOutline",
    PORTAL: "portal",
    PROTECTED_CONTAINER_CONTENT: "protectedContainer-content",
    PROTECTED_CONTAINER_NAV_BUTTON_SELECTED: "protectedContainer-nav-button-selected",
    PROTECTED_CONTAINER_NAV_BUTTON: "protectedContainer-nav-button",
    PROTECTED_CONTAINER_PRELOADER: "protectedContainer-preloader",
    PROTECTED_CONTAINER_USER_INFO: "protectedContainer-userInfo",
    PROTECTED_CONTAINER_WEBSOCKET_MESSAGE: "protectedContainer-webSocketMessage",
    PROTECTED_CONTAINER: "protectedContainer",
    PUBLIC_CONTAINER_CONTENT_NAV: "publicContainer-content-nav",
    PUBLIC_CONTAINER_CONTENT: "publicContainer-content",
    PUBLIC_CONTAINER_ICON: "publicContainer-icon",
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
    RESULTS_CONTAINER_PRELOADER: "resultsContainer-preloader",
    RESULTS_CONTAINER: "resultsContainer",
    TOGGLE: "toggle",
    TRANSPARENT: "transparent",
    VISIBLE: "visible",
    VOTE_BUTTONS: "vote-buttons",
    VOTE_PRELOADER: "vote-preloader",
    VOTE: "vote",
});

/**
 * Export module
 * 
 */
export {

    Access,
    Action,
    CharCode,
    CSS,
    Error,
    Event,
    Global,
    HTMLElement,
    ID,
    Image,
    Label,
    Local,
    Model,
    Request,
    Route,
    Style
};