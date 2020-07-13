/**
 * @description ProtectedContainer component.
 * 
 * @requires AdminContainer
 * @requires constants
 * @requires Edit
 * @requires react
 * @requires react-router-dom
 * @requires Results
 * @requires ResultsContainer
 * @requires useAuth
 * @requires useItems
 * @requires UserInfo
 * @requires useUsers
 * @requires useVotes
 * @requires useWebSocket
 * @requires Vote
 * @requires VoteInfo

 * @public
 * @module
 * 
 */
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import AdminContainer from "./admin/AdminContainer";
import Edit from "./edit/Edit";
import React, { createContext, useRef, useState } from "react";
import ResultsContainer from "./results/ResultsContainer";
import useAuth from "../../../hooks/useAuth";
import useItems from "../../../hooks/useItems";
import UserInfo from "./info/UserInfo";
import useUsers from "../../../hooks/useUsers";
import useVotes from "../../../hooks/useVotes";
import useWebSocket from "../../../hooks/useWebSocket";
import Vote from "./Vote";
import VoteInfo from "./info/VoteInfo";

/**
 * @description Creates an exportable Context object.
 * This Context object allows the ProtectedContainer component to provide its "logout" function to be consumed by the
 * protected route components and/or their descendants without having to pass props down manually to each component.
 * 
 * @public
 * @object
 * 
 */
const LogoutAPI = createContext();

/**
 * @description The ProtectedContainer component groups the UI components of the application that are only accessible via user authentication.
 * This component contains vote and user information, a logout button and navigation buttons for all the protected route components: Vote, Results, AdminContainer and Edit.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ProtectedContainer = () => {
    
    /**
     * State
     * 
     */
    const [ deadline, setDeadline ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isMounting, setIsMounting ] = useState(true);

    /**
     * Refs
     * 
     */
    const webSocketMessageRef = useRef();

    /**
     * Hooks
     * 
     */
    const { authToken } = useAuth();    
    const history = useHistory();
    
    const {
        
        itemsAll,
        itemsCandidate,
        setItemsAll,
        setItemsCandidate,
        setItemsVote
    } = useItems();

    const { path } = useRouteMatch();
    const { fetchLogout, usersSelf } = useUsers();
    
    const {
        
        fetchActive,
        fetchAll: fetchAllVotes,
        setVotesCast,
        votesActive
    } = useVotes();
    
    const { webSocketMessage } = useWebSocket(true);

    /**
     * Mounting
     * 
     */
    if (isMounting && authToken) {

        if (!votesActive) {

            fetchActive();
        }
        
        setIsMounting(false);
    }

    /**
     * WebSocket event handling
     * Updates the application state when WebSocket stringified data messages of type "deadline" or "item" or event messages "voteOpened" or "voteClosed" are broadcast.
     * The data broadcast with messages of type "deadline" consists of an object with the properties "days", "hours", "minutes" and "seconds".
     * The data broadcast with messages of type "item" contains either an array of Item documents, if one or more items were added, or a single edited Item document.
     * 
     * This component includes the initialized useWebSocket hook.
     * 
     */
    if (webSocketMessage &&
        webSocketMessage !== webSocketMessageRef.current) {

        const deadlineData = JSON.parse(webSocketMessage)[C.Event.Type.DEADLINE];
        const itemData = JSON.parse(webSocketMessage)[C.Event.Type.ITEM];

        const isMessageVoteOpened = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_OPENED }));
        const isMessageVoteClosed = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CLOSED }));

        if (deadlineData || itemData || isMessageVoteOpened || isMessageVoteClosed) {

            if (deadlineData) {

                setDeadline(webSocketMessage);
            }

            if (itemData) {

                if (itemsAll) {
                    
                    let updatedItems;
                    
                    if (Array.isArray(itemData)) {
                        
                        updatedItems = itemsAll.concat(itemData);
                        updatedItems.sort((a, b) => a[C.Model.NAME].localeCompare(b[C.Model.NAME]));
                    }
                    else {
                        
                        const replaceIndex = itemsAll.findIndex((item) => item[C.Model.ID] === itemData[C.Model.ID]);

                        updatedItems = [...itemsAll];
                        updatedItems.splice(replaceIndex, 1, itemData);
                    }

                    setItemsAll(updatedItems);

                    if (itemsCandidate) {

                        setItemsCandidate(updatedItems);
                    }
                }
            }

            if (isMessageVoteOpened || isMessageVoteClosed) {

                fetchActive();
                fetchAllVotes();

                setDeadline(null);
                setVotesCast(null);
                setItemsVote(null);

                if (itemsAll) {

                    setItemsCandidate(itemsAll);
                }
            }

            webSocketMessageRef.current = webSocketMessage;
        }
    }

    /**
     * @description Retrieves a CSS style based on the hypertext reference link argument.
     * 
     * @param {string} href - A hypertext reference link.
     * @private
     * @function
     *  
     */
    const getButtonStyle = (href) => {

        const style = (href === path)
            ? C.Style.PROTECTED_CONTAINER_NAV_BUTTON_SELECTED
            : C.Style.PROTECTED_CONTAINER_NAV_BUTTON;

        return style;
    };

    /**
     * @description Creates a button with textual content, a click callback and a hypertext reference link.
     * 
     * @param {string} label - The button's textual content.
     * @param {function} callback - The function to execute when the button is clicked.
     * @param {string|null} href - A hypertext reference link.
     * @private
     * @function
     * 
     */
    const createButton = (label, callback, href) => {

        if (href === C.Route.ADMIN && !usersSelf.user.admin) {

            return null;
        }
 
        return (

            <button
                className={getButtonStyle(href)}
                onClick={callback.bind(null, href)}
            >
                {label}
            </button>
        );
    };

    /**
     * @description Adds a new route to the router history.
     * 
     * @param {string} route - the added route.
     * @private
     * @function
     * 
     */
    const addRouterHistory = (route) => {

        history.push(route);
    };

    /**
     * @description Logs out the user and redirects the the login page.
     * 
     * @async
     * @private
     * @function
     * 
     */
    const logout = async () => {

        setIsLoading(true);

        await fetchLogout();

        addRouterHistory(C.Route.LOGIN);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.PROTECTED_CONTAINER}>
            {(!authToken || isMounting || isLoading)
                ?   <div className={C.Style.PROTECTED_CONTAINER_PRELOADER} />
                :   <>
                        <VoteInfo deadlineMessage={deadline} />

                        <UserInfo />

                        <div>
                            {createButton(C.Label.VOTE, addRouterHistory, C.Route.VOTE)}
                            {createButton(C.Label.RESULTS, addRouterHistory, C.Route.RESULTS)}
                            {createButton(C.Label.ADMIN, addRouterHistory, C.Route.ADMIN)}
                            {createButton(C.Label.EDIT, addRouterHistory, C.Route.EDIT)}
                            {createButton(C.Label.LOGOUT, logout, null)}
                        </div>

                        <div className={C.Style.PROTECTED_CONTAINER_CONTENT}>
                            <LogoutAPI.Provider value={logout}>
                                <Switch>
                                    <Route path={C.Route.VOTE}>
                                        <Vote />
                                    </Route>

                                    <Route path={C.Route.RESULTS}>
                                        <ResultsContainer />
                                    </Route>
                                    
                                    <Route path={C.Route.ADMIN}>
                                        <AdminContainer />
                                    </Route>

                                    <Route path={C.Route.EDIT}>
                                        <Edit />
                                    </Route>
                                </Switch>
                            </LogoutAPI.Provider>
                        </div>
                    </>
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export {
    
    ProtectedContainer as default,
    LogoutAPI
};