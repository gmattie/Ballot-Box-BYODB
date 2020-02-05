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
 *     <li> LOAD </li>
 *     <li> MESSAGE </li>
 *     <li> OPEN </li>
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
    LOAD: "load",
    MESSAGE: "message",
    OPEN: "open",

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
 *     <li> WEB_SOCKET_MESSAGE_VOTE_RESULT_DETAIL </li>
 *     <li> WEB_SOCKET_PROTECTED_CONTAINER </li>
 *     <li> WEB_SOCKET_VOTE </li>
 *     <li> WEB_SOCKET_VOTE_RESULTS_CONTAINER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Global = Object.freeze({

    LIST_ITEM_DRAG_TARGET: "listItemDragTarget",
    WEB_SOCKET_MESSAGE_PROTECTED_CONTAINER: "webSocketMessageProtectedContainer",
    WEB_SOCKET_MESSAGE_VOTE_RESULT_DETAIL: "webSocketMessageVoteResultDetail",
    WEB_SOCKET_MESSAGE_VOTE_RESULTS_CONTAINER: "webSocketMessageVoteResultsContainer",
    WEB_SOCKET_MESSAGE_VOTE: "webSocketMessageVote",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DIV </li>
 *     <ul>
 *         <li> CHECKBOX </li> 
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
 *     <li> DEADLINE_DAYS </li>
 *     <li> DEADLINE_HOURS </li>
 *     <li> DEADLINE_MINUTES </li>
 *     <li> DEADLINE_SECONDS </li>
 *     <li> ELEMENT_DIALOG </li>
 *     <li> ELEMENT_ITEM_DETAIL </li>
 *     <li> ELEMENT_VOTE_RESULT_DETAIL </li>
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
    ELEMENT_VOTE_RESULT_DETAIL: "voteResultDetail",
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
 *     <li> ANONYMOUS </li>
 *     <li> CANCEL </li>
 *     <li> CANDIDATES </li>
 *     <li> CAST_VOTE </li>
 *     <li> CLOSE_POOLS </li>
 *     <li> CLOSED </li>
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
 *     <li> ICON </li>
 *     <li> IMAGE </li>
 *     <li> LIVE </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> MANAGE_POLLS </li>
 *     <li> NAME </li>
 *     <li> OK </li>
 *     <li> OPEN </li>
 *     <li> OPEN_POLLS </li>
 *     <li> OPTIONAL </li>
 *     <li> PASSWORD </li>
 *     <li> PASSWORD_CONFIRM </li>
 *     <li> PENDING </li>
 *     <li> POLLS_STATUS </li>
 *     <li> QUANTITY </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> RESULTS </li>
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
    ANONYMOUS: "Anonymous",
    CANCEL: "Cancel",
    CANDIDATES: "Candidates",
    CAST_VOTE: "Cast Vote",
    CLOSE_POOLS: "Close Pools",
    CLOSED: "Closed",
    CONFIRM_ADD_ITEM: "Are you sure you want to add this item?",
    CONFIRM_CLOSE_POLLS: "Are you sure you want to close the polls?",
    CONFIRM_EDIT_ITEM: "Are you sure you want to edit this item?",
    CONFIRM_EDIT: "Are you sure you want to edit your user account?",
    CONFIRM_OPEN_POLLS: "Are you sure you want to open the polls?",
    CONFIRM_VOTE: "Are you sure you want to cast this vote?",
    DEADLINE_DAYS: "Days",
    DEADLINE_HOURS: "Hours",
    DEADLINE_MINUTES: "Minutes",
    DEADLINE_SECONDS: "Seconds",
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
    LIVE: "Live",
    LOGIN: "Login",
    LOGOUT: "Logout",
    MANAGE_POOLS: "Manage Polls",
    NAME: "Name",
    OK: "OK",
    OPEN_POLLS: "Open Polls",
    OPEN: "Open",
    OPTIONAL: "(Optional)",
    PASSWORD_CONFIRM: "Confirm Password",
    PASSWORD: "Password",
    PENDING: "Pending",
    POLLS_STATUS: "Polls Status:",
    QUANTITY: "Quantity",
    REGISTER: "Register",
    RESET: "Reset",
    RESULTS: "Results",
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
 *     <li> EDIT_ITEMS_CONTAINER </li>
 *     <li> HIDDEN </li>
 *     <li> INPUT_PASSWORD </li>
 *     <li> INPUT_PASSWORD_HIDE </li>
 *     <li> INPUT_PASSWORD_SHOW </li>
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
 *     <li> MANAGE_POLLS </li>
 *     <li> PORTAL </li>
 *     <li> PROTECTED_CONTAINER </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON_SELECTED </li>
 *     <li> PROTECTED_CONTAINER_USER_INFO </li>
 *     <li> PROTECTED_CONTAINER_WEBSOCKET_MESSAGE </li>
 *     <li> PUBLIC_CONTAINER </li>
 *     <li> PUBLIC_CONTAINER_NAV_BUTTON </li>
 *     <li> PUBLIC_CONTAINER_NAV_BUTTON_SELECTED </li>
 *     <li> TABLE_ITEM_ROW </li>
 *     <li> TABLE_ITEM_ROW_HEADER </li>
 *     <li> TABLE_ITEM_ROW_HEADER_ITEM </li>
 *     <li> TABLE_ITEM_ROW_HEADER_SCORE </li>
 *     <li> TABLE_ITEM_ROW_RANK </li>
 *     <li> TABLE_USER_HEADER </li>
 *     <li> TABLE_USER_HEADER_USER </li>
 *     <li> TABLE_USER_HEADER_USER_EMAIL </li>
 *     <li> TABLE_USER_HEADER_USER_IP </li>
 *     <li> TABLE_USER_HEADER_USER_NAME </li>
 *     <li> TRANSPARENT </li>
 *     <li> VISIBLE </li>
 *     <li> VOTE </li>
 *     <li> VOTE_RESULT </li>
 *     <li> VOTE_RESULT_ACTIVE </li>
 *     <li> VOTE_RESULT_DETAIL </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_ACTIVE </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_ANONYMOUS </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_DATE </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_QUANTITY </li>
 *     <li> VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_TOTAL </li>
 *     <li> VOTE_RESULTS_CONTAINER </li>
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
    EDIT_ITEMS_CONTAINER: "editItemsContainer",
    HIDDEN: "hidden",
    INPUT_PASSWORD_HIDE: "inputPassword-hide",
    INPUT_PASSWORD_SHOW: "inputPassword-show",
    INPUT_PASSWORD: "inputPassword",
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
    MANAGE_POLLS: "managePolls",
    PORTAL: "portal",
    PROTECTED_CONTAINER_CONTENT: "protectedContainer-content",
    PROTECTED_CONTAINER_NAV_BUTTON_SELECTED: "protectedContainer-nav-button-selected",
    PROTECTED_CONTAINER_NAV_BUTTON: "protectedContainer-nav-button",
    PROTECTED_CONTAINER_USER_INFO: "protectedContainer-userInfo",
    PROTECTED_CONTAINER_WEBSOCKET_MESSAGE: "protectedContainer-webSocketMessage",
    PROTECTED_CONTAINER: "protectedContainer",
    PUBLIC_CONTAINER_NAV_BUTTON_SELECTED: "publicContainer-nav-button-selected",
    PUBLIC_CONTAINER_NAV_BUTTON: "publicContainer-nav-button",
    PUBLIC_CONTAINER: "publicContainer",
    TABLE_ITEM_ROW_HEADER_ITEM: "tableItemRow-header-item",
    TABLE_ITEM_ROW_HEADER_SCORE: "tableItemRow-header-score",
    TABLE_ITEM_ROW_HEADER: "tableItemRow-header",
    TABLE_ITEM_ROW_RANK: "tableItemRow-rank",
    TABLE_ITEM_ROW: "tableItemRow",
    TABLE_USER_HEADER_USER_EMAIL: "tableUserHeader-user-email",
    TABLE_USER_HEADER_USER_IP: "tableUserHeader-user-ip",
    TABLE_USER_HEADER_USER_NAME: "tableUserHeader-user-name",
    TABLE_USER_HEADER_USER: "tableUserHeader-user",
    TABLE_USER_HEADER: "tableUserHeader",
    TRANSPARENT: "transparent",
    VISIBLE: "visible",
    VOTE_ACTIVE_BADGE_LIVE: "voteActiveBadge-live",
    VOTE_ACTIVE_BADGE_PENDING: "voteActiveBadge-pending",
    VOTE_ACTIVE_BADGE: "voteActiveBadge",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_ACTIVE: "voteResultDetail-container-table-info-active",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_ANONYMOUS: "voteResultDetail-container-table-info-anonymous",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_DATE: "voteResultDetail-container-table-info-date",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_QUANTITY: "voteResultDetail-container-table-info-quantity",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO_TOTAL: "voteResultDetail-container-table-info-total",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE_INFO: "voteResultDetail-container-table-info",
    VOTE_RESULT_DETAIL_CONTAINER_TABLE: "voteResultDetail-container-table",
    VOTE_RESULT_DETAIL_CONTAINER: "voteResultDetail-container",
    VOTE_RESULT_DETAIL: "voteResultDetail",
    VOTE_RESULT: "voteResult",
    VOTE_RESULTS_CONTAINER: "voteResultsContainer",
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