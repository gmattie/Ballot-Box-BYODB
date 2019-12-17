/**
 * @description Actions associated with the votesReducer.
 * 
 * @requires authActions
 * @requires constants
 * @module
 * 
 */
import * as authActions from "./authActions";
import * as C from "../../support/constants";

/**
 * @description Creates an action that sets the "votesActive" property of the voteReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object|null} The action.
 * @public
 * @function
 *  
 */
const setVotesActive = (data) => {

    return {

        type: C.Action.Type.VOTES_ACTIVE,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "votesAll" property of the voteReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object|null} The action.
 * @public
 * @function
 *  
 */
const setVotesAll = (data) => {

    return {

        type: C.Action.Type.VOTES_ALL,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "votesCast" property of the voteReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object|null} The action.
 * @public
 * @function
 *  
 */
const setVotesCast = (data) => {

    return {

        type: C.Action.Type.VOTES_CAST,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Creates an action that sets the "votesError" property of the votesReducer state. 
 * 
 * @param {string} error - The value of the payload embedded in the action.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const setVotesError = (error) => {

    return {

        type: C.Action.Type.VOTES_ERROR,
        [C.Action.PAYLOAD]: error
    };
};

/**
 * @description Creates an action that sets the "votesOne" property of the voteReducer state.
 * 
 * @param {string} data - The value of the payload embedded in the action.
 * @returns {object|null} The action.
 * @public
 * @function
 *  
 */
const setVotesOne = (data) => {

    return {

        type: C.Action.Type.VOTES_ONE,
        [C.Action.PAYLOAD]: data
    };
};

/**
 * @description Gets data from /api/votes/active and dispatches actions to the votesReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchActive = () => {

    return async (dispatch, getState) => {
        
        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = `${C.Route.API_VOTES}${C.Route.ACTIVE}`;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response.json();

            dispatch((data.error) ? authActions.setAuthError(data) : setVotesActive(data));      
        }
        catch (error) {

            dispatch(setVotesError(error.message));
        }
    };
};

/**
 * @description Gets data from /api/votes and dispatches actions to the votesReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchAll = () => {

    return async (dispatch, getState) => {
        
        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = C.Route.API_VOTES;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response.json();

            dispatch((data.error) ? authActions.setAuthError(data) : setVotesAll(data));      
        }
        catch (error) {

            dispatch(setVotesError(error.message));
        }
    };
};

/**
 * @description Posts data to /api/votes/cast and dispatches actions to the votesReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchCast = () => {

    return async (dispatch, getState) => {
        
        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const itemsVote = getState().items[C.Action.Type.ITEMS_VOTE];
            const url = `${C.Route.API_VOTES}${C.Route.CAST}`;


            const options = {

                method: C.Request.METHOD_POST,
                headers: {
                    
                    [C.Request.HEADER_X_AUTH_TOKEN]: authToken,
                    [C.Request.HEADER_CONTENT_TYPE]: C.Request.APPLICATION_JSON
                },
                body: JSON.stringify({

                    [C.Model.CAST]: itemsVote.map((item, index) => {
                                
                        return {
                    
                            [C.Model.ITEM]: item._id,
                            [C.Model.RANK]: index
                        };
                    })
                })
            };

            const response = await fetch(url, options);
            const data = await response.json();

            dispatch((data.error) ? authActions.setAuthError(data) : setVotesCast(data));      
        }
        catch (error) {

            dispatch(setVotesError(error.message));
        }
    };
};

/**
 * @description Posts data to /api/votes/close and dispatches actions to the votesReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchClose = () => {

    return async (dispatch, getState) => {
        
        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = `${C.Route.API_VOTES}${C.Route.CLOSE}`;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response;

            dispatch((data.error) ? authActions.setAuthError(data) : setVotesActive(null));      
        }
        catch (error) {

            dispatch(setVotesError(error.message));
        }
    };
};

/**
 * @description Gets data from /api/votes/:voteID and dispatches actions to the votesReducer state or from authActions to the authReducer state.
 * 
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchOne = (voteID) => {

    return async (dispatch, getState) => {
        
        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = `${C.Route.API_VOTES}/${voteID}`;
            const options = {

                method: C.Request.METHOD_GET,
                headers: { [C.Request.HEADER_X_AUTH_TOKEN]: authToken }
            };

            const response = await fetch(url, options);
            const data = await response.json();

            dispatch((data.error) ? authActions.setAuthError(data) : setVotesOne(data));      
        }
        catch (error) {

            dispatch(setVotesError(error.message));
        }
    };
};

/**
 * @description Posts data to /api/votes/open and dispatches actions to the votesReducer state or from authActions to the authReducer state.
 * 
 * @param {string} deadline - The duration (in seconds) of the vote.
 * @param {string} quantity - The maximum number of items that a user may cast in their vote.
 * @returns {object} The action.
 * @public
 * @function
 *  
 */
const fetchOpen = (deadline, quantity) => {

    return async (dispatch, getState) => {
        
        try {

            const authToken = getState().auth[C.Action.Type.AUTH_TOKEN][C.Local.TOKEN];
            const url = `${C.Route.API_VOTES}${C.Route.OPEN}`;
            const options = {

                method: C.Request.METHOD_POST,
                headers: {
                    
                    [C.Request.HEADER_X_AUTH_TOKEN]: authToken,
                    [C.Request.HEADER_CONTENT_TYPE]: C.Request.APPLICATION_JSON
                },
                body: JSON.stringify({ deadline, quantity })
            };

            const response = await fetch(url, options);
            const data = await response.json();

            dispatch((data.error) ? authActions.setAuthError(data) : setVotesActive(data));      
        }
        catch (error) {

            dispatch(setVotesError(error.message));
        }
    };
};

/**
 * Export module
 * 
 */
export {

    fetchActive,
    fetchAll,
    fetchCast,
    fetchClose,
    fetchOne,
    fetchOpen,
    setVotesActive,
    setVotesAll,
    setVotesCast,
    setVotesError,
    setVotesOne,
};