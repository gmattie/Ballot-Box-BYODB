/**
 * @description Actions associated with the persistReducer.
 * 
 * @requires constants
 * @module
 * 
 */
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "persistCollapsedAddItem" property of the persistReducer state.
 * 
 * @param {boolean} collapsed - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistCollapsedAddItem = (collapsed) => {

    return {

        type: C.Action.Type.PERSIST_COLLAPSED_ADD_ITEM,
        [C.Action.PAYLOAD]: collapsed
    };
};

/**
 * @description Creates an action that sets the "persistCollapsedAdminCredentials" property of the persistReducer state.
 * 
 * @param {boolean} collapsed - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistCollapsedAdminCredentials = (collapsed) => {

    return {

        type: C.Action.Type.PERSIST_COLLAPSED_ADMIN_CREDENTIALS,
        [C.Action.PAYLOAD]: collapsed
    };
};

/**
 * @description Creates an action that sets the "persistCollapsedEditItems" property of the persistReducer state.
 * 
 * @param {boolean} collapsed - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistCollapsedEditItems = (collapsed) => {

    return {

        type: C.Action.Type.PERSIST_COLLAPSED_EDIT_ITEMS,
        [C.Action.PAYLOAD]: collapsed
    };
};

/**
 * @description Creates an action that sets the "persistCollapsedEditUser" property of the persistReducer state.
 * 
 * @param {boolean} collapsed - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistCollapsedEditUser = (collapsed) => {

    return {

        type: C.Action.Type.PERSIST_COLLAPSED_EDIT_USER,
        [C.Action.PAYLOAD]: collapsed
    };
};

/**
 * @description Creates an action that sets the "persistCollapsedManageVote" property of the persistReducer state.
 * 
 * @param {boolean} collapsed - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistCollapsedManageVote = (collapsed) => {

    return {

        type: C.Action.Type.PERSIST_COLLAPSED_MANAGE_VOTE,
        [C.Action.PAYLOAD]: collapsed
    };
};

/**
 * @description Creates an action that sets the "persistRadioAggregate" property of the persistReducer state.
 * 
 * @param {boolean} aggregate - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistRadioAggregate = (aggregate) => {

    return {

        type: C.Action.Type.PERSIST_RADIO_AGGREGATE,
        [C.Action.PAYLOAD]: aggregate
    };
};

/**
 * @description Creates an action that sets the "persistScrollCandidates" property of the persistReducer state.
 * 
 * @param {boolean} scrollOffset - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistScrollCandidates = (scrollOffset) => {

    return {

        type: C.Action.Type.PERSIST_SCROLL_CANDIDATES,
        [C.Action.PAYLOAD]: scrollOffset
    };
};

/**
 * @description Creates an action that sets the "persistScrollDashboard" property of the persistReducer state.
 * 
 * @param {boolean} scrollOffset - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistScrollDashboard = (scrollOffset) => {

    return {

        type: C.Action.Type.PERSIST_SCROLL_DASHBOARD,
        [C.Action.PAYLOAD]: scrollOffset
    };
};

/**
 * @description Creates an action that sets the "persistScrollEditItems" property of the persistReducer state.
 * 
 * @param {boolean} scrollOffset - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistScrollEditItems = (scrollOffset) => {

    return {

        type: C.Action.Type.PERSIST_SCROLL_EDIT_ITEMS,
        [C.Action.PAYLOAD]: scrollOffset
    };
};

/**
 * @description Creates an action that sets the "persistScrollResults" property of the persistReducer state.
 * 
 * @param {boolean} scrollOffset - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistScrollResults = (scrollOffset) => {

    return {

        type: C.Action.Type.PERSIST_SCROLL_RESULTS,
        [C.Action.PAYLOAD]: scrollOffset
    };
};

/**
 * @description Creates an action that sets the "persistScrollVotes" property of the persistReducer state.
 * 
 * @param {boolean} scrollOffset - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistScrollVotes = (scrollOffset) => {

    return {

        type: C.Action.Type.PERSIST_SCROLL_VOTES,
        [C.Action.PAYLOAD]: scrollOffset
    };
};

/**
 * @description Creates an action that sets the "persistTextImage" property of the persistReducer state.
 * 
 * @param {string|null} text - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistTextImage = (text) => {

    return {

        type: C.Action.Type.PERSIST_TEXT_IMAGE,
        [C.Action.PAYLOAD]: text
    };
};

/**
 * @description Creates an action that sets the "persistTextName" property of the persistReducer state.
 * 
 * @param {string|null} text - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistTextName = (text) => {

    return {

        type: C.Action.Type.PERSIST_TEXT_NAME,
        [C.Action.PAYLOAD]: text
    };
};

/**
 * @description Creates an action that sets the "persistTextThumbnail" property of the persistReducer state.
 * 
 * @param {string|null} text - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistTextThumbnail = (text) => {

    return {

        type: C.Action.Type.PERSIST_TEXT_THUMBNAIL,
        [C.Action.PAYLOAD]: text
    };
};

/**
 * @description Creates an action that sets the "persistTextDeadline" property of the persistReducer state.
 * 
 * @param {string|null} text - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistTextDeadline = (text) => {

    return {

        type: C.Action.Type.PERSIST_TEXT_DEADLINE,
        [C.Action.PAYLOAD]: text
    };
};

/**
 * @description Creates an action that sets the "persistTextQuantity" property of the persistReducer state.
 * 
 * @param {string|null} text - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistTextQuantity = (text) => {

    return {

        type: C.Action.Type.PERSIST_TEXT_QUANTITY,
        [C.Action.PAYLOAD]: text
    };
};

/**
 * @description Creates an action that sets the "persistToggleAnonymous" property of the persistReducer state.
 * 
 * @param {boolean} anonymous - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setPersistToggleAnonymous = (anonymous) => {

    return {

        type: C.Action.Type.PERSIST_TOGGLE_ANONYMOUS,
        [C.Action.PAYLOAD]: anonymous
    };
};

/**
 * Export module
 * 
 */
export {

    setPersistCollapsedAddItem,
    setPersistCollapsedAdminCredentials,
    setPersistCollapsedEditItems,
    setPersistCollapsedEditUser,
    setPersistCollapsedManageVote,
    setPersistRadioAggregate,
    setPersistScrollDashboard,
    setPersistScrollCandidates,
    setPersistScrollEditItems,
    setPersistScrollResults,
    setPersistScrollVotes,
    setPersistTextDeadline,
    setPersistTextImage,
    setPersistTextName,
    setPersistTextQuantity,
    setPersistTextThumbnail,
    setPersistToggleAnonymous,
};