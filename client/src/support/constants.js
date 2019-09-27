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
 *     <li> PAYLOAD </li>
 *     <ul>
 *         <li> ERROR </li>
 *         <li> ITEMS </li>
 *         <li> MESSAGE </li>
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

        ERROR: "error",
        ITEMS: "items",
        MESSAGE: "message",
    }
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
 *     <li> ROOT </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const HTMLElement = Object.freeze({

    ROOT: "root",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> PLACEHOLDER </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Image = Object.freeze({

    PLACEHOLDER: "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> ENV_DEVELOPMENT </li>
 *     <li> PROTOCOL_WEB_SOCKET </li>
 *     <li> PROTOCOL_HTTP </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Local = Object.freeze({

    ENV_DEVELOPMENT: "development",
    PROTOCOL_WEB_SOCKET: "ws",
    PROTOCOL_HTTP: "http",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> METHOD_GET </li>
 *     <li> HEADER_X_AUTH_TOKEN </li>
 * </ul>
 * 
 * @public
 * @constant
 * 
 */
const Request = Object.freeze({

    METHOD_GET: "get",
    HEADER_X_AUTH_TOKEN: "X-Auth-Token",
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
 *     <li> REGISTER </li>
 *     <li> RESET </li>
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
    REGISTER: "/register",
    RESET: "/reset",
});

/**
 * @description Properties of type {string} consist of:
 * 
 * <ul>
 *     <li> APP </li>
 *     <li> LIST </li>
 *     <li> LIST_ITEM </li>
 *     <li> LIST_ITEM_HIDE </li>
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
    LIST_ITEM_ACTIVE: "listItem-active",
    LIST_ITEM: "listItem",
    LIST: "list",
    VIEWPORT_IMAGE: "viewportImage",
    VIEWPORT_IMAGE_ERROR: "viewportImage-error",
    VIEWPORT_IMAGE_INTERSECTION: "viewportImage-intersection",
});

/**
 * Export module
 * 
 */
export {

    Action,
    Event,
    HTMLElement,
    Image,
    Local,
    Request,
    Route,
    Style
};