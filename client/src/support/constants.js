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
 *         <li> PERSIST_COLLAPSED_ADD_ITEM </li>
 *         <li> PERSIST_COLLAPSED_ADMIN_CREDENTIALS </li>
 *         <li> PERSIST_COLLAPSED_EDIT_ITEMS </li>
 *         <li> PERSIST_COLLAPSED_EDIT_USER </li>
 *         <li> PERSIST_COLLAPSED_MANAGE_VOTE </li>
 *         <li> PERSIST_RADIO_AGGREGATE </li>
 *         <li> PERSIST_SCROLL_CANDIDATES </li> 
 *         <li> PERSIST_SCROLL_DASHBOARD </li>
 *         <li> PERSIST_SCROLL_EDIT_ITEMS </li>
 *         <li> PERSIST_SCROLL_RESULTS </li>
 *         <li> PERSIST_SCROLL_VOTES </li>
 *         <li> PERSIST_TEXT_DEADLINE </li>
 *         <li> PERSIST_TEXT_IMAGE </li>
 *         <li> PERSIST_TEXT_NAME </li>
 *         <li> PERSIST_TEXT_QUANTITY </li>
 *         <li> PERSIST_TEXT_THUMBNAIL </li>
 *         <li> PERSIST_TOGGLE_ANONYMOUS </li>
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
        PERSIST_COLLAPSED_ADD_ITEM: "persistCollapsedAddItem",
        PERSIST_COLLAPSED_ADMIN_CREDENTIALS: "persistCollapsedAdminCredentials",
        PERSIST_COLLAPSED_EDIT_ITEMS: "persistCollapsedEditItems",
        PERSIST_COLLAPSED_EDIT_USER: "persistCollapsedEditUser",
        PERSIST_COLLAPSED_MANAGE_VOTE: "persistCollapsedManageVote",
        PERSIST_RADIO_AGGREGATE: "persistRadioAggregate",
        PERSIST_SCROLL_CANDIDATES: "persistScrollCandidates",
        PERSIST_SCROLL_DASHBOARD: "persistScrollDashboard",
        PERSIST_SCROLL_EDIT_ITEMS: "persistScrollEditItems",
        PERSIST_SCROLL_RESULTS: "persistScrollResults",
        PERSIST_SCROLL_VOTES: "persistScrollVotes",
        PERSIST_TEXT_DEADLINE: "persistTextDeadline",
        PERSIST_TEXT_IMAGE: "persistTextImage",
        PERSIST_TEXT_NAME: "persistTextName",
        PERSIST_TEXT_QUANTITY: "persistTextQuantity",
        PERSIST_TEXT_THUMBNAIL: "persistTextThumbnail",
        PERSIST_TOGGLE_ANONYMOUS: "persistToggleAnonymous",
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
 *     <li> FORMAT_COMPACT </li>
 *     <li> FORMAT_LONG </li>
 *     <li> FORMAT_MEDIUM </li>
 *     <li> FORMAT_SHORT </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Date = Object.freeze({

    FORMAT_COMPACT: "MMM d, y 'at' HH:mm",
    FORMAT_LONG: "EEEE, MMMM d, y 'at' HH:mm (O)",
    FORMAT_MEDIUM: "EEE, MMM d, y 'at' HH:mm (O)",
    FORMAT_SHORT: "EEE, MMM d, y 'at' HH:mm",
});

 /**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DAYS </li>
 *     <li> HOURS </li>
 *     <li> SECONDS </li>
 *     <li> MINUTES </li>
 *     <li> ZEROS </li>
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
    ZEROS: "00",
});

 /**
 * @description Properties of type {number} consist of:
 * 
 * <ul>
 *     <li> DEBOUNCE_RESIZE </li>
 *     <li> DEBOUNCE_SCROLL </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Duration = Object.freeze({

    DEBOUNCE_RESIZE: 100,
    DEBOUNCE_SCROLL: 250,
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> DUPLICATE_KEY </li>
 *     <li> ERROR </li>
 *     <li> ERROR_MESSAGE </li>
 *     <li> ERROR_PARAM </li>
 *     <li> ITEM_NAME_ALREADY_EXISTS </li>
 *     <li> MISSING_DATA </li>
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
    ERROR_MESSAGE: "msg",
    ERROR_PARAM: "param",
    ERROR: "error",
    ITEM_NAME_ALREADY_EXISTS: "Item name already exists",
    MISSING_DATA: "Error: missing data",
    USE_LAYOUT_EFFECT_ON_SERVER: "useLayoutEffect does nothing on the server",
    VOTE_DOES_NOT_EXIST: "Vote does not exist",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ANIMATION_END </li>
 *     <li> CLOSE </li>
 *     <li> COMPLETE </li>
 *     <li> DRAG_ENTER </li>
 *     <li> DRAG_OVER </li>
 *         <li> SCROLL_OFFSET </li>
 *     </ul>
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
 *     <li> POP_STATE </li>
 *     <li> RESIZE </li>
 *     <li> SCROLL_OFFSET </li>
 *     <li> TRANSITION_END </li>
 *     <li> VOTE_AGGREGATE </li>
 *     <li> VOTE_CAST </li>
 *     <li> VOTE_CLOSED </li>
 *     <li> VOTE_COMPLETE </li>
 *     <li> VOTE_DEADLINE </li>
 *     <li> VOTE_OPENED </li>
 *     <li> WEBSOCKET_HEARTBEAT </li>
 *     <ul>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Event = Object.freeze({

    ANIMATION_END: "animationend",
    CLOSE: "close",
    COMPLETE: "complete",
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
    POP_STATE: "popstate",
    
    Property: {

        SCROLL_OFFSET: "scrollOffset",
    },

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
 *     <li> COMPONENT_HEIGHT_RESULTS_CONTAINER </li>
 *     <li> LOADED_IMAGE_URLS </li>
 *     <li> STYLE_VARIABLE_FORM_GAP </li>
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
    COMPONENT_HEIGHT_RESULTS_CONTAINER: "__BALLOT_BOX_COMPONENT_HEIGHT_RESULTS_CONTAINER",
    LOADED_IMAGE_URLS: "__BALLOT_BOX_LOADED_IMAGE_URLS",
    STYLE_VARIABLE_FORM_GAP: "__BALLOT_BOX_STYLE_VARIABLE_FORM_GAP",
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
 *         <li> BUTTON </li>
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
        
        BUTTON: "button",
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
 *     <li> LIST_ITEMS_ALL </li>
 *     <li> LIST_ITEMS_CANDIDATE </li>
 *     <li> LIST_ITEMS_VOTE </li>
 *     <li> NAME_ADMIN_PASSWORD </li>
 *     <li> NAME_ADMIN_USERNAME </li>
 *     <li> NAME_ANONYMOUS </li>
 *     <li> NAME_AVATAR </li>
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
    LIST_ITEMS_ALL: "listItemsAll",
    LIST_ITEMS_CANDIDATE: "listItemsCandidate",
    LIST_ITEMS_VOTE: "listItemsVote",
    NAME_ADMIN_PASSWORD: "adminPassword",
    NAME_ADMIN_USERNAME: "adminUsername",
    NAME_ANONYMOUS: "anonymous",
    NAME_AVATAR: "avatar",
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
 *     <li> BLANK </li>
 *     <li> DEFAULT_AVATAR </li>
 *     <li> TRANSPARENT_PLACEHOLDER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Image = Object.freeze({

    BLANK: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    DEFAULT_AVATAR: "http://leamvalleygs.com/content/img/anon-avatar.png",
    TRANSPARENT_PLACEHOLDER: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
});

/**
 * @description Properties of type {number} consist of:
 * 
 * <ul>
 *     <li> ENTER </li>
 *     <li> ESCAPE </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Key = Object.freeze({

    ENTER: "Enter",
    ESCAPE: "Escape",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ACTIVATE </li>
 *     <li> ACTIVE </li>
 *     <li> ADD </li>
 *     <li> ADD_CANDIDATE </li>
 *     <li> ADMIN_CREDENTIALS </li>
 *     <li> ADMIN_PASSWORD </li>
 *     <li> ADMIN_USERNAME </li>
 *     <li> ARROW </li>
 *     <li> AUTHENTICATE </li>
 *     <li> AVATAR </li>
 *     <li> CANCEL </li>
 *     <li> CANDIDATES </li>
 *     <li> CONFIRM </li>
 *     <li> CONFIRM_ACTIVATE_VOTE </li>
 *     <li> CONFIRM_ADD_CANDIDATE </li>
 *     <li> CONFIRM_ADMIN </li>
 *     <li> CONFIRM_DEACTIVATE_VOTE </li>
 *     <li> CONFIRM_EDIT </li>
 *     <li> CONFIRM_EDIT_CANDIDATE </li>
 *     <li> CONFIRM_LOGOUT </li>
 *     <li> CONFIRM_VOTE </li>
 *     <li> DASHBOARD </li>
 *     <li> DAYS </li>
 *     <li> DEACTIVATE </li>
 *     <li> DEADLINE </li>
 *     <li> EDIT_CANDIDATES </li>
 *     <li> EDIT_USER </li>
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
 *     <li> INACTIVE </li>
 *     <li> IP </li>
 *     <li> LIST_PLACEHOLDER </li>
 *     <li> LIVE_UPDATES </li>
 *     <li> LOGIN </li>
 *     <li> LOGOUT </li>
 *     <li> MANAGE_VOTE </li>
 *     <li> MINUTES </li>
 *     <li> NAME </li>
 *     <li> NEW </li>
 *     <li> OK </li>
 *     <li> OPTIONAL </li>
 *     <li> PASSWORD </li>
 *     <li> PENDING_RESULTS </li>
 *     <li> POINT </li>
 *     <li> POINTS </li>
 *     <li> RANK </li>
 *     <li> RANK_SELECTIONS </li>
 *     <li> REGISTER </li>
 *     <li> RESET </li>
 *     <li> RESET_SHORT_TEXT </li>
 *     <li> RESULTS </li>
 *     <li> SCORE </li>
 *     <li> SECONDS </li>
 *     <li> SECRET_BALLOT </li>
 *     <li> SHOW </li>
 *     <li> THUMBNAIL </li>
 *     <li> URL </li>
 *     <li> VOTE </li>
 *     <li> VOTE_CAST </li>
 *     <li> VOTE_SHORT_TEXT </li>
 *     <li> VOTE_STATUS </li>
 *     <li> VOTES </li>
 *     <li> VOTES_CAST </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Label = Object.freeze({

    ACTIVATE: "Activate",
    ACTIVE: "Active",
    ADD_CANDIDATE: "Add Candidate",
    ADD: "Add",
    ADMIN_CREDENTIALS: "Admin Credentials",
    ADMIN_PASSWORD: "Admin Password",
    ADMIN_USERNAME: "Admin Username",
    ARROW: "Arrow",
    AUTHENTICATE: "Authenticate",
    AVATAR: "Avatar",
    CANCEL: "Cancel",
    CANDIDATES: "Candidates",
    CONFIRM_ACTIVATE_VOTE: "Are you sure you want to activate the vote?",
    CONFIRM_ADD_CANDIDATE: "Are you sure you want to add this candidate?",
    CONFIRM_ADMIN: "Are you sure you want to authenticate your admin credentials?",
    CONFIRM_DEACTIVATE_VOTE: "Are you sure you want to deactivate the vote?",
    CONFIRM_EDIT_CANDIDATE: "Are you sure you want to edit this candidate?",
    CONFIRM_EDIT: "Are you sure you want to edit your user account?",
    CONFIRM_LOGOUT: "Are you sure you want to logout?",
    CONFIRM_VOTE: "Are you sure you want to cast this ballot?",
    CONFIRM: "Confirm",
    DASHBOARD: "Dashboard",
    DAYS: "Days",
    DEACTIVATE: "Deactivate",
    DEADLINE: "Deadline",
    EDIT_CANDIDATES: "Edit Candidates",
    EDIT_USER: "Edit User Account",
    EDIT: "Edit",
    EMAIL_REFER: "Please refer to the email in order to",
    EMAIL_REGISTRATION: "complete your registration and activate your account.",
    EMAIL_RESET: "confirm the request to reset your account password.",
    EMAIL_SENT: "An email has been sent to",
    EMAIL: "Email",
    EMPTY_ITEMS: "No Items Available",
    EMPTY_RESULTS: "No Results Available",
    ERROR: "Error",
    HIDE: "Hide",
    HOURS: "Hours",
    ICON: "Icon",
    IMAGE: "Image",
    INACTIVE: "Inactive",
    IP: "IP",
    LIST_PLACEHOLDER: "Drag & drop candidates here",
    LIVE_UPDATES: "Live Updates",
    LOGIN: "Login",
    LOGOUT: "Logout",
    MANAGE_VOTE: "Manage Vote",
    MINUTES: "Minutes",
    NAME: "Name",
    NEW: "New",
    OK: "OK",
    OPTIONAL: "(Optional)",
    PASSWORD: "Password",
    PENDING_RESULTS: "Pending Results",
    POINT: "point",
    POINTS: "points",
    RANK_SELECTIONS: "Rank Selections",
    RANK: "Rank",
    REGISTER: "Register",
    RESET_SHORT_TEXT: "✖",
    RESET: "Reset",
    RESULTS: "Results",
    SCORE: "Score",
    SECONDS: "Seconds",
    SECRET_BALLOT: "Secret Ballot",
    SHOW: "Show",
    THUMBNAIL: "Thumbnail",
    URL: "URL",
    VOTE_CAST: "Your ballot has been cast for the current vote.",
    VOTE_SHORT_TEXT: "✔",
    VOTE_STATUS: "Vote Status",
    VOTE: "Vote",
    VOTES_CAST: "Votes Cast",
    VOTES: "Votes",
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
 *     <li> AVATAR </li>
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
    AVATAR: "avatar",
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
 *     <li> NS </li>
 *     <li> RD </li>
 *     <li> ST </li>
 *     <li> TH </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Ordinal = Object.freeze({

    ND: "nd",
    RD: "rd",
    ST: "st",
    TH: "th",
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
 *     <li> API_ITEMS </li>
 *     <li> API_USERS </li>
 *     <li> API_VOTES </li>
 *     <li> CAST </li>
 *     <li> CLOSE </li>
 *     <li> DASHBOARD </li>
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
    API_ITEMS: "/api/items",
    API_USERS: "/api/users",
    API_VOTES: "/api/votes",
    CAST: "/cast",
    CLOSE: "/close",
    DASHBOARD: "/dashboard",
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
 *     <li> ADD_CANDIDATE </li>
 *     <li> ADD_CANDIDATE_IMAGE </li>
 *     <li> ADD_CANDIDATE_NAME </li>
 *     <li> ADD_CANDIDATE_SUBMIT </li>
 *     <li> ADD_CANDIDATE_SUBMIT_BUTTON </li>
 *     <li> ADD_CANDIDATE_SUBMIT_PRELOADER </li>
 *     <li> ADD_CANDIDATE_THUMBNAIL </li>
 *     <li> ADMIN_CREDENTIALS </li>
 *     <li> ADMIN_CREDENTIALS_BUTTONS </li>
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
 *     <li> DASHBOARD_CONTAINER </li>
 *     <li> DASHBOARD_CONTAINER_ADD_CANDIDATE </li>
 *     <li> DASHBOARD_CONTAINER_ADMIN_CREDENTIALS </li>
 *     <li> DASHBOARD_CONTAINER_EDIT_CANDIDATES_CONTAINER </li>
 *     <li> DASHBOARD_CONTAINER_EDIT_USER </li>
 *     <li> DASHBOARD_CONTAINER_LOGOUT </li>
 *     <li> DASHBOARD_CONTAINER_MANAGE_VOTE </li>
 *     <li> DIALOG </li>
 *     <li> DIALOG_ANIMATION_ENTER</li>
 *     <li> DIALOG_ANIMATION_EXIT</li>
 *     <li> DIALOG_CONTENT </li>
 *     <li> DIALOG_SUBMIT </li>
 *     <li> DIALOG_SUBMIT_PRELOADER </li>
 *     <li> EDIT_CANDIDATE </li>
 *     <li> EDIT_CANDIDATE_IMAGE </li>
 *     <li> EDIT_CANDIDATE_NAME </li>
 *     <li> EDIT_CANDIDATE_SUBMIT </li>
 *     <li> EDIT_CANDIDATE_SUBMIT_BUTTONS </li>
 *     <li> EDIT_CANDIDATE_SUBMIT_PRELOADER </li>
 *     <li> EDIT_CANDIDATE_THUMBNAIL </li>
 *     <li> EDIT_CANDIDATES_CONTAINER </li>
 *     <li> EDIT_CANDIDATES_CONTAINER_CONTENT </li>
 *     <li> EDIT_CANDIDATES_CONTAINER_CONTENT_EMPTY </li>
 *     <li> EDIT_CANDIDATES_CONTAINER_CONTENT_LIST </li>
 *     <li> EDIT_CANDIDATES_CONTAINER_CONTENT_LIST_ITEM_SIZE_CONTAINER </li>
 *     <li> EDIT_CANDIDATES_CONTAINER_CONTENT_PRELOADER </li>
 *     <li> EDIT_CANDIDATES_CONTAINER_CONTENT_SHADOW </li>
 *     <li> EDIT_USER </li>
 *     <li> EDIT_USER_AVATAR </li>
 *     <li> EDIT_USER_BUTTONS </li>
 *     <li> EDIT_USER_NAME </li>
 *     <li> EDIT_USER_PASSWORD </li>
 *     <li> EDIT_USER_PASSWORD_CONFIRM </li>
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
 *     <li> ITEM_DETAIL_INFO </li>
 *     <li> ITEM_DETAIL_INFO_RESULT </li>
 *     <li> ITEM_DETAIL_INFO_RESULT_ENTRY </li>
 *     <li> ITEM_DETAIL_INFO_RESULT_ENTRY_KEY </li>
 *     <li> ITEM_DETAIL_INFO_RESULT_ENTRY_VALUE </li>
 *     <li> ITEM_DETAIL_INFO_RESULT_ENTRY_VALUE_ORDINAL </li>
 *     <li> ITEM_DETAIL_INFO_TITLE </li>
 *     <li> LIST </li>
 *     <li> LIST_BACKGROUND </li>
 *     <li> LIST_CONTAINER </li>
 *     <li> LIST_CONTENT </li>
 *     <li> LIST_ITEM </li>
 *     <li> LIST_ITEM_ACTIVE </li>
 *     <li> LIST_ITEM_ACTIVE_TITLE </li>
 *     <li> LIST_ITEM_IMAGE </li>
 *     <li> LIST_ITEM_IMAGE_ERROR </li>
 *     <li> LIST_ITEM_IMAGE_INTERSECTION </li>
 *     <li> LIST_ITEM_SMALL </li>
 *     <li> LIST_ITEM_SMALL_ACTIVE </li>
 *     <li> LIST_ITEM_SMALL_ACTIVE_TITLE </li>
 *     <li> LIST_ITEM_SMALL_IMAGE </li>
 *     <li> LIST_ITEM_SMALL_TITLE </li>
 *     <li> LIST_ITEM_TITLE </li>
 *     <li> LIST_PLACEHOLDER </li>
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
 *     <li> PORTAL_ANIMATION_ENTER </li>
 *     <li> PORTAL_ANIMATION_EXIT </li>
 *     <li> PROTECTED_CONTAINER </li>
 *     <li> PROTECTED_CONTAINER_NAV </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON </li>
 *     <li> PROTECTED_CONTAINER_NAV_BUTTON_SELECTED </li>
 *     <li> PROTECTED_CONTAINER_NAV_SHADOW </li>
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
 *     <li> RESULT_ACTIVE_LABEL </li>
 *     <li> RESULT_ACTIVE_LABEL_ICON </li>
 *     <li> RESULT_ACTIVE_LABEL_TEXT </li>
 *     <li> RESULT_DETAIL </li>
 *     <li> RESULT_DETAIL_CONTAINER </li>
 *     <li> RESULT_DETAIL_CONTAINER_PRELOADER </li>
 *     <li> RESULT_DETAIL_CONTAINER_TABLE </li>
 *     <li> RESULT_DETAIL_CONTAINER_TABLE_ANIMATION_ENTER </li>
 *     <li> RESULT_DETAIL_TABLE_INFO </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_ACTIVE </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_DATE </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_ENTRY </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_ENTRY_KEY </li>
 *     <li> RESULT_DETAIL_TABLE_INFO_ENTRY_VALUE </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM_NAME </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM_SCORE </li>
 *     <li> RESULT_DETAIL_TABLE_ITEM_ROW_RANK </li>
 *     <li> RESULT_DETAIL_TABLE_USER </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO_AVATAR </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_ERROR </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_INTERSECTION </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_PRELOADER </li>
 *     <li> RESULT_DETAIL_TABLE_USER_INFO_NAME </li>
 *     <li> RESULTS_CONTAINER </li>
 *     <li> RESULTS_CONTAINER_MESSAGE </li>
 *     <li> RESULTS_CONTAINER_MESSAGE_LABEL </li>
 *     <li> RESULTS_CONTAINER_LIST </li>
 *     <li> RESULTS_CONTAINER_LIST_ITEM_SIZE_CONTAINER </li>
 *     <li> RESULTS_CONTAINER_PRELOADER </li>
 *     <li> SPAN_OVERFLOW </li>
 *     <li> SPAN_OVERFLOW_SHORT </li>
 *     <li> TOGGLE </li>
 *     <li> TRANSPARENT </li>
 *     <li> USER_DETAIL </li>
 *     <li> USER_DETAIL_ICON </li>
 *     <li> USER_DETAIL_IMAGE </li>
 *     <li> USER_DETAIL_IMAGE_ERROR </li>
 *     <li> USER_DETAIL_IMAGE_INTERSECTION </li>
 *     <li> USER_DETAIL_IMAGE_PRELOADER </li>
 *     <li> USER_DETAIL_INFO </li>
 *     <li> USER_DETAIL_INFO_EMAIL </li>
 *     <li> USER_DETAIL_INFO_EMAIL_ENTRY </li>
 *     <li> USER_DETAIL_INFO_EMAIL_ENTRY_KEY </li>
 *     <li> USER_DETAIL_INFO_EMAIL_ENTRY_VALUE </li>
 *     <li> USER_DETAIL_INFO_IP </li>
 *     <li> USER_DETAIL_INFO_IP_ENTRY </li>
 *     <li> USER_DETAIL_INFO_IP_ENTRY_KEY </li>
 *     <li> USER_DETAIL_INFO_IP_ENTRY_VALUE </li>
 *     <li> USER_DETAIL_INFO_MISSING_DATA </li>
 *     <li> USER_DETAIL_INFO_NAME </li>
 *     <li> USER_INFO </li>
 *     <li> USER_INFO_AVATAR </li>
 *     <li> USER_INFO_AVATAR_ICON </li>
 *     <li> USER_INFO_AVATAR_IMAGE </li>
 *     <li> USER_INFO_AVATAR_IMAGE_ERROR </li>
 *     <li> USER_INFO_AVATAR_IMAGE_INTERSECTION </li>
 *     <li> USER_INFO_AVATAR_IMAGE_PRELOADER </li>
 *     <li> USER_INFO_DESCRIPTION </li>
 *     <li> USER_INFO_DESCRIPTION_EMAIL </li>
 *     <li> USER_INFO_DESCRIPTION_EMAIL_ENTRY </li>
 *     <li> USER_INFO_DESCRIPTION_EMAIL_ENTRY_KEY </li>
 *     <li> USER_INFO_DESCRIPTION_EMAIL_ENTRY_VALUE </li>
 *     <li> USER_INFO_DESCRIPTION_IP </li>
 *     <li> USER_INFO_DESCRIPTION_IP_ENTRY </li>
 *     <li> USER_INFO_DESCRIPTION_IP_ENTRY_KEY </li>
 *     <li> USER_INFO_DESCRIPTION_IP_ENTRY_VALUE </li>
 *     <li> USER_INFO_DESCRIPTION_NAME </li>
 *     <li> VOTE </li>
 *     <li> VOTE_BUTTONS </li>
 *     <li> VOTE_ERROR </li>
 *     <li> VOTE_INFO </li>
 *     <li> VOTE_INFO_DEADLINE </li>
 *     <li> VOTE_INFO_DEADLINE_HIDE </li>
 *     <li> VOTE_INFO_DEADLINE_SHOW </li>
 *     <li> VOTE_INFO_SHADOW_BOTTOM </li>
 *     <li> VOTE_INFO_SHADOW_TOP </li>
 *     <li> VOTE_INFO_STATUS </li>
 *     <li> VOTE_INFO_STATUS_KEY </li>
 *     <li> VOTE_INFO_STATUS_VALUE </li>
 *     <li> VOTE_INFO_STATUS_VALUE_ACTIVE </li>
 *     <li> VOTE_INFO_STATUS_VALUE_INACTIVE </li>
 *     <li> VOTE_MESSAGE </li>
 *     <li> VOTE_MESSAGE_LABEL </li>
 *     <li> VOTE_PRELOADER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Style = Object.freeze({

    ADD_CANDIDATE_IMAGE: "addCandidate-image",
    ADD_CANDIDATE_NAME: "addCandidate-name",
    ADD_CANDIDATE_SUBMIT_BUTTON: "addCandidate-submit-button",
    ADD_CANDIDATE_SUBMIT_PRELOADER: "addCandidate-submit-preloader",
    ADD_CANDIDATE_SUBMIT: "addCandidate-submit",
    ADD_CANDIDATE_THUMBNAIL: "addCandidate-thumbnail",
    ADD_CANDIDATE: "addCandidate",
    ADMIN_CREDENTIALS_BUTTONS: "adminCredentials-buttons",
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
    DASHBOARD_CONTAINER_ADD_CANDIDATE: "dashboardContainer-addCandidate",
    DASHBOARD_CONTAINER_ADMIN_CREDENTIALS: "dashboardContainer-adminCredentials",
    DASHBOARD_CONTAINER_EDIT_CANDIDATES_CONTAINER: "dashboardContainer-editCandidatesContainer",
    DASHBOARD_CONTAINER_EDIT_USER: "dashboardContainer-editUser",
    DASHBOARD_CONTAINER_LOGOUT: "dashboardContainer-logout",
    DASHBOARD_CONTAINER_MANAGE_VOTE: "dashboardContainer-manageVote",
    DASHBOARD_CONTAINER: "dashboardContainer",
    DIALOG_ANIMATION_ENTER: "dialog-animation-enter",
    DIALOG_ANIMATION_EXIT: "dialog-animation-exit",
    DIALOG_CONTENT: "dialog-content",
    DIALOG_SUBMIT_PRELOADER: "dialog-submit-preloader",
    DIALOG_SUBMIT: "dialog-submit",
    DIALOG: "dialog",
    EDIT_CANDIDATE_IMAGE: "editCandidate-image",
    EDIT_CANDIDATE_NAME: "editCandidate-name",
    EDIT_CANDIDATE_SUBMIT_BUTTONS: "editCandidate-submit-buttons",
    EDIT_CANDIDATE_SUBMIT_PRELOADER: "editCandidate-submit-preloader",
    EDIT_CANDIDATE_SUBMIT: "editCandidate-submit",
    EDIT_CANDIDATE_THUMBNAIL: "editCandidate-thumbnail",
    EDIT_CANDIDATE: "editCandidate",
    EDIT_CANDIDATES_CONTAINER_CONTENT_EMPTY: "editCandidatesContainer-content-empty",
    EDIT_CANDIDATES_CONTAINER_CONTENT_LIST_ITEM_SIZE_CONTAINER: "editCandidatesContainer-content-list-itemSizeContainer",
    EDIT_CANDIDATES_CONTAINER_CONTENT_LIST: "editCandidatesContainer-content-list",
    EDIT_CANDIDATES_CONTAINER_CONTENT_PRELOADER: "editCandidatesContainer-content-preloader",
    EDIT_CANDIDATES_CONTAINER_CONTENT_SHADOW: "editCandidatesContainer-content-shadow",
    EDIT_CANDIDATES_CONTAINER_CONTENT: "editCandidatesContainer-content",
    EDIT_CANDIDATES_CONTAINER: "editCandidatesContainer",
    EDIT_USER_AVATAR: "editUser-avatar",
    EDIT_USER_BUTTONS: "editUser-buttons",
    EDIT_USER_NAME: "editUser-name",
    EDIT_USER_PASSWORD_CONFIRM: "editUser-passwordConfirm",
    EDIT_USER_PASSWORD: "editUser-password",
    EDIT_USER: "editUser",
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
    ITEM_DETAIL_INFO_RESULT_ENTRY_KEY: "itemDetail-info-result-entry-key",
    ITEM_DETAIL_INFO_RESULT_ENTRY_VALUE_ORDINAL: "itemDetail-info-result-entry-value-ordinal",
    ITEM_DETAIL_INFO_RESULT_ENTRY_VALUE: "itemDetail-info-result-entry-value",
    ITEM_DETAIL_INFO_RESULT_ENTRY: "itemDetail-info-result-entry",
    ITEM_DETAIL_INFO_RESULT: "itemDetail-info-result",
    ITEM_DETAIL_INFO_TITLE: "itemDetail-info-title",
    ITEM_DETAIL_INFO: "itemDetail-info",
    ITEM_DETAIL: "itemDetail",
    LIST_BACKGROUND: "list-background",
    LIST_CONTAINER: "listContainer",
    LIST_CONTENT: "list-content",
    LIST_ITEM_ACTIVE_TITLE: "listItem-active-title",
    LIST_ITEM_ACTIVE: "listItem-active",
    LIST_ITEM_IMAGE_ERROR: "listItem-image-error",
    LIST_ITEM_IMAGE_INTERSECTION: "listItem-image-intersection",
    LIST_ITEM_IMAGE: "listItem-image",
    LIST_ITEM_SMALL_ACTIVE_TITLE: "listItem-small-active-title",
    LIST_ITEM_SMALL_ACTIVE: "listItem-small-active",
    LIST_ITEM_SMALL_IMAGE: "listItem-small-image",
    LIST_ITEM_SMALL_TITLE: "listItem-small-title",
    LIST_ITEM_SMALL: "listItem-small",
    LIST_ITEM_TITLE: "listItem-title",
    LIST_ITEM: "listItem",
    LIST_PLACEHOLDER: "list-placeholder",
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
    PORTAL_ANIMATION_ENTER: "portal-animation-enter",
    PORTAL_ANIMATION_EXIT: "portal-animation-exit",
    PORTAL: "portal",
    PROTECTED_CONTAINER_CONTENT: "protectedContainer-content",
    PROTECTED_CONTAINER_NAV_BUTTON_SELECTED: "protectedContainer-nav-button-selected",
    PROTECTED_CONTAINER_NAV_BUTTON: "protectedContainer-nav-button",
    PROTECTED_CONTAINER_NAV_SHADOW: "protectedContainer-nav-shadow",
    PROTECTED_CONTAINER_NAV: "protectedContainer-nav",
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
    RESULT_ACTIVE_LABEL_ICON: "resultActiveLabel-icon",
    RESULT_ACTIVE_LABEL_TEXT: "resultActiveLabel-text",
    RESULT_ACTIVE_LABEL: "resultActiveLabel",
    RESULT_DETAIL_CONTAINER_PRELOADER: "resultDetail-container-preloader",
    RESULT_DETAIL_CONTAINER_TABLE_ANIMATION_ENTER: "resultDetail-container-table-animation-enter",
    RESULT_DETAIL_CONTAINER_TABLE: "resultDetail-container-table",
    RESULT_DETAIL_CONTAINER: "resultDetail-container",
    RESULT_DETAIL_TABLE_INFO_ACTIVE: "resultDetailTableInfo-active",
    RESULT_DETAIL_TABLE_INFO_DATE: "resultDetailTableInfo-date",
    RESULT_DETAIL_TABLE_INFO_ENTRY_KEY: "resultDetailTableInfo-entry-key",
    RESULT_DETAIL_TABLE_INFO_ENTRY_VALUE: "resultDetailTableInfo-entry-value",
    RESULT_DETAIL_TABLE_INFO_ENTRY: "resultDetailTableInfo-entry",
    RESULT_DETAIL_TABLE_INFO: "resultDetailTableInfo",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM_NAME: "resultDetailTableItemRow-header-container-item-name",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM_SCORE: "resultDetailTableItemRow-header-container-item-score",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER_ITEM: "resultDetailTableItemRow-header-container-item",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER_CONTAINER: "resultDetailTableItemRow-header-container",
    RESULT_DETAIL_TABLE_ITEM_ROW_HEADER: "resultDetailTableItemRow-header",
    RESULT_DETAIL_TABLE_ITEM_ROW_RANK: "resultDetailTableItemRow-rank",
    RESULT_DETAIL_TABLE_ITEM_ROW: "resultDetailTableItemRow",
    RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_ERROR: "resultDetailTableUser-info-avatar-image-error",
    RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_INTERSECTION: "resultDetailTableUser-info-avatar-image-intersection",
    RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE_PRELOADER: "resultDetailTableUser-info-avatar-image-preloader",
    RESULT_DETAIL_TABLE_USER_INFO_AVATAR_IMAGE: "resultDetailTableUser-info-avatar-image",
    RESULT_DETAIL_TABLE_USER_INFO_AVATAR: "resultDetailTableUser-info-avatar",
    RESULT_DETAIL_TABLE_USER_INFO_NAME: "resultDetailTableUser-info-name",
    RESULT_DETAIL_TABLE_USER_INFO: "resultDetailTableUser-info",
    RESULT_DETAIL_TABLE_USER: "resultDetailTableUser",
    RESULT_DETAIL: "resultDetail",
    RESULT: "result",
    RESULTS_CONTAINER_MESSAGE_LABEL: "resultsContainer-message-label",
    RESULTS_CONTAINER_MESSAGE: "resultsContainer-message",
    RESULTS_CONTAINER_LIST_ITEM_SIZE_CONTAINER: "resultsContainer-list-itemSizeContainer",
    RESULTS_CONTAINER_LIST: "resultsContainer-list",
    RESULTS_CONTAINER_PRELOADER: "resultsContainer-preloader",
    RESULTS_CONTAINER: "resultsContainer",
    SPAN_OVERFLOW_SHORT: "spanOverflow-short",
    SPAN_OVERFLOW: "spanOverflow",
    TOGGLE: "toggle",
    TRANSPARENT: "transparent",
    USER_DETAIL_ICON: "userDetail-icon",
    USER_DETAIL_IMAGE_ERROR: "userDetail-image-error",
    USER_DETAIL_IMAGE_INTERSECTION: "userDetail-image-intersection",
    USER_DETAIL_IMAGE_PRELOADER: "userDetail-image-preloader",
    USER_DETAIL_IMAGE: "userDetail-image",
    USER_DETAIL_INFO_EMAIL_ENTRY_KEY: "userDetail-info-email-entry-key",
    USER_DETAIL_INFO_EMAIL_ENTRY_VALUE: "userDetail-info-email-entry-value",
    USER_DETAIL_INFO_EMAIL_ENTRY: "userDetail-info-email-entry",
    USER_DETAIL_INFO_EMAIL: "userDetail-info-email",
    USER_DETAIL_INFO_IP_ENTRY_KEY: "userDetail-info-ip-entry-key",
    USER_DETAIL_INFO_IP_ENTRY_VALUE: "userDetail-info-ip-entry-value",
    USER_DETAIL_INFO_IP_ENTRY: "userDetail-info-ip-entry",
    USER_DETAIL_INFO_IP: "userDetail-info-ip",
    USER_DETAIL_INFO_MISSING_DATA: "userDetail-info-missing-data",
    USER_DETAIL_INFO_NAME: "userDetail-info-name",
    USER_DETAIL_INFO: "userDetail-info",
    USER_DETAIL: "userDetail",
    USER_INFO_AVATAR_ICON: "userInfo-avatar-icon",
    USER_INFO_AVATAR_IMAGE_ERROR: "userInfo-avatar-image-error",
    USER_INFO_AVATAR_IMAGE_INTERSECTION: "userInfo-avatar-image-intersection",
    USER_INFO_AVATAR_IMAGE_PRELOADER: "userInfo-avatar-image-preloader",
    USER_INFO_AVATAR_IMAGE: "userInfo-avatar-image",
    USER_INFO_AVATAR: "userInfo-avatar",
    USER_INFO: "userInfo",
    USER_INFO_DESCRIPTION: "userInfo-description",
    USER_INFO_DESCRIPTION_NAME: "userInfo-description-name",
    USER_INFO_DESCRIPTION_EMAIL: "userInfo-description-email",
    USER_INFO_DESCRIPTION_EMAIL_ENTRY: "userInfo-description-email-entry",
    USER_INFO_DESCRIPTION_EMAIL_ENTRY_KEY: "userInfo-description-email-entry-key",
    USER_INFO_DESCRIPTION_EMAIL_ENTRY_VALUE: "userInfo-description-email-entry-value",
    USER_INFO_DESCRIPTION_IP: "userInfo-description-ip",
    USER_INFO_DESCRIPTION_IP_ENTRY: "userInfo-description-ip-entry",
    USER_INFO_DESCRIPTION_IP_ENTRY_KEY: "userInfo-description-ip-entry-key",
    USER_INFO_DESCRIPTION_IP_ENTRY_VALUE: "userInfo-description-ip-entry-value",
    VOTE_BUTTONS: "vote-buttons",
    VOTE_ERROR: "vote-error",
    VOTE_INFO_DEADLINE_HIDE: "voteInfo-deadline-hide",
    VOTE_INFO_DEADLINE_SHOW: "voteInfo-deadline-show",
    VOTE_INFO_DEADLINE: "voteInfo-deadline",
    VOTE_INFO_SHADOW_BOTTOM: "voteInfo-shadow-bottom",
    VOTE_INFO_SHADOW_TOP: "voteInfo-shadow-top",
    VOTE_INFO_STATUS_KEY: "voteInfo-status-key",
    VOTE_INFO_STATUS_VALUE_ACTIVE: "voteInfo-status-value-active",
    VOTE_INFO_STATUS_VALUE_INACTIVE: "voteInfo-status-value-inactive",
    VOTE_INFO_STATUS_VALUE: "voteInfo-status-value",
    VOTE_INFO_STATUS: "voteInfo-status",
    VOTE_INFO: "voteInfo",
    VOTE_MESSAGE_LABEL: "vote-message-label",
    VOTE_MESSAGE: "vote-message",
    VOTE_PRELOADER: "vote-preloader",
    VOTE: "vote",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> FORM_GAP </li>
 *     <li> LIST_WIDTH_BOUNDARY </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const StyleVariable = Object.freeze({

    FORM_GAP: "--FORM_GAP",
    LIST_WIDTH_BOUNDARY: "--LIST_WIDTH_BOUNDARY",
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
    Console,
    CSS,
    Date,
    Deadline,
    Duration,
    Error,
    Event,
    Global,
    HTMLElement,
    ID,
    Image,
    Key,
    Label,
    Local,
    Mode,
    Model,
    Ordinal,
    Request,
    Route,
    Style,
    StyleVariable,
    WebSocket
};