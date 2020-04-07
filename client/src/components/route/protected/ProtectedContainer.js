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
 * @requires useUsers
 * @requires useVotes
 * @requires useWebSocket
 * @requires Vote

 * @public
 * @module
 * 
 */
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import AdminContainer from "./admin/AdminContainer";
import Edit from "./edit/Edit";
import React, { useState } from "react";
import ResultsContainer from "./results/ResultsContainer";
import useAuth from "../../../hooks/useAuth";
import useUsers from "../../../hooks/useUsers";
import useVotes from "../../../hooks/useVotes";
import useWebSocket from "../../../hooks/useWebSocket";
import Vote from "./Vote";

/**
 * @description The ProtectedContainer component groups the UI components of the application that are only accessible via user authentication.
 * ProtectedContainer contains polling and user information, router links and all the other protected route components: AdminContainer, Edit, Results and Vote.
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
    const [ deadlineDays, setDeadlineDays ] = useState(null);
    const [ deadlineHours, setDeadlineHours ] = useState(null);
    const [ deadlineMinutes, setDeadlineMinutes ] = useState(null);
    const [ deadlineSeconds, setDeadlineSeconds ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isMounting, setIsMounting ] = useState(true);
    const [ voteStatus, setVoteStatus ] = useState(null);

    /**
     * Hooks
     * 
     */
    const { authToken } = useAuth();
    const { fetchActive, votesActive } = useVotes();
    const { fetchLogout, usersSelf } = useUsers();
    const { path } = useRouteMatch();
    const { webSocketMessage } = useWebSocket(true);
    const history = useHistory();

    /**
     * Mounting
     * 
     */
    if (isMounting && authToken) {
        
        fetchActive();
    }

    if (isMounting && votesActive) {

        setVoteStatus((votesActive.vote) ? C.Label.OPEN : C.Label.CLOSED);

        setIsMounting(false);
    }

    /**
     * @description Extract time data from a JSON stringified websocket "deadline" message.
     * The websocket "deadline" message string resembles the following:
     * 
     *     "{"deadline":{"days":"00","hours":"00","minutes":"00","seconds":"00"}}"
     * 
     * @param {string} message - The websocket message to parse.
     * @private
     * @function
     *  
     */
    const parseVoteDeadline = (message) => {

        const deadline = JSON.parse(message)[C.Event.Type.DEADLINE];

        setDeadlineDays(deadline[C.ID.DEADLINE_DAYS]);
        setDeadlineHours(deadline[C.ID.DEADLINE_HOURS]);
        setDeadlineMinutes(deadline[C.ID.DEADLINE_MINUTES]);
        setDeadlineSeconds(deadline[C.ID.DEADLINE_SECONDS]);
    };

    /**
     * WebSocket event handling
     * Updates the polling status and deadline information when WebSocket messages "voteOpened", "voteClosed" or messages of type "deadline" are broadcast.
     * This component includes the initialized useWebSocket hook.
     * 
     */
    if (webSocketMessage &&
        webSocketMessage !== window[C.Global.WEB_SOCKET_MESSAGE_PROTECTED_CONTAINER]) {

        const isMessageTypeDeadline = JSON.parse(webSocketMessage)[C.Event.Type.DEADLINE];
        const isMessageVoteOpened = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_OPENED }));
        const isMessageVoteClosed = (webSocketMessage === JSON.stringify({ [C.Event.Type.VOTE]: C.Event.VOTE_CLOSED }));

        if (isMessageTypeDeadline || isMessageVoteOpened || isMessageVoteClosed) {

            if (isMessageTypeDeadline) {

                parseVoteDeadline(webSocketMessage);
            }
            else if (isMessageVoteOpened) {

                setVoteStatus(C.Label.OPEN);
                
                fetchActive();
            }
            else if (isMessageVoteClosed) {
                
                setVoteStatus(C.Label.CLOSED);
                
                setDeadlineDays(null);
                setDeadlineHours(null);
                setDeadlineMinutes(null);
                setDeadlineSeconds(null);

                fetchActive();
            }

            window[C.Global.WEB_SOCKET_MESSAGE_PROTECTED_CONTAINER] = webSocketMessage;
        }
    }

    /**
     * @description Creates a section with relevant textual content extracted from the "usersSelf" state.
     * 
     * @private
     * @function
     * 
     */
    const createVoterCard = () => {

        const infoKeys = [

            C.Model.NAME,
            C.Model.EMAIL,
            C.Model.IP
        ];

        return (

            <>
                {infoKeys.map((item, index) => {

                    return (
                    
                        <div key={index}>
                            {item}: {usersSelf.user[item]}
                        </div>
                    );
                })}
            </>
        );
    };

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
            {(!authToken || isMounting || isLoading) &&
                <div className={C.Style.PROTECTED_CONTAINER_PRELOADER} />
            }

            {(authToken && !isMounting && !isLoading) &&
                <>
                    <div className={C.Style.PROTECTED_CONTAINER_WEBSOCKET_MESSAGE}>
                        <div>
                            {C.Label.POLLS_STATUS} {voteStatus}
                        </div>
                        
                        {(deadlineDays || deadlineHours || deadlineMinutes || deadlineSeconds) &&
                            <table>
                                <thead>
                                    <tr>
                                        <td>{C.Label.DEADLINE_DAYS}</td>
                                        <td>{C.Label.DEADLINE_HOURS}</td>
                                        <td>{C.Label.DEADLINE_MINUTES}</td>
                                        <td>{C.Label.DEADLINE_SECONDS}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{deadlineDays}</td>
                                        <td>{deadlineHours}</td>
                                        <td>{deadlineMinutes}</td>
                                        <td>{deadlineSeconds}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>

                    <div className={C.Style.PROTECTED_CONTAINER_USER_INFO}>
                        {createVoterCard()}
                    </div>

                    <div>
                        {createButton(C.Label.VOTE, addRouterHistory, C.Route.VOTE)}
                        {createButton(C.Label.RESULTS, addRouterHistory, C.Route.RESULTS)}
                        {createButton(C.Label.ADMIN, addRouterHistory, C.Route.ADMIN)}
                        {createButton(C.Label.EDIT, addRouterHistory, C.Route.EDIT)}
                        {createButton(C.Label.LOGOUT, logout, null)}
                    </div>

                    <div className={C.Style.PROTECTED_CONTAINER_CONTENT}>
                        <Switch>
                            <Route path={C.Route.VOTE}>
                                <Vote logout={logout} />
                            </Route>

                            <Route path={C.Route.RESULTS}>
                                <ResultsContainer logout={logout} />
                            </Route>
                            
                            <Route path={C.Route.ADMIN}>
                                <AdminContainer logout={logout} />
                            </Route>

                            <Route path={C.Route.EDIT}>
                                <Edit logout={logout} />
                            </Route>
                        </Switch>
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
export default ProtectedContainer;