/**
 * @description ProtectedContainer component.
 * 
 * @requires Admin
 * @requires constants
 * @requires Edit
 * @requires react
 * @requires react-router-dom
 * @requires Results
 * @requires useUsers
 * @requires useWebSocket
 * @requires Vote

 * @public
 * @module
 * 
 */
import { Link, Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import Admin from "./Admin";
import Edit from "./Edit";
import React, { useState } from "react";
import Results from "./Results";
import useUsers from "../../../hooks/useUsers";
import useWebSocket from "../../../hooks/useWebSocket";
import Vote from "./Vote";

/**
 * @description The ProtectedContainer component groups the UI components of the application that are only accessible via user authentication.
 * ProtectedContainer contains polling and user information, router links and all the other protected route components: Admin, Edit, Results and Vote.
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
    const [ isLoading, setIsLoading ] = useState(false);

    /**
     * Hooks
     * 
     */
    const { path } = useRouteMatch();
    const { fetchLogout, usersSelf } = useUsers();
    const { webSocketMessage } = useWebSocket();
    const history = useHistory();

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
            ? C.Style.PROTECTED_CONTAINER_BUTTON_SELECTED
            : C.Style.PROTECTED_CONTAINER_BUTTON;

        return style;
    };

    /**
     * @description Creates a button with a hypertext reference link and textual content.
     * 
     * @param {string} href - The button's hypertext reference link.
     * @param {string} label - The button's textual content.
     * @private
     * @function
     * 
     */
    const createButton = (href, label) => {

        return (

            <div className={getButtonStyle(href)}>
                <Link to={href}>
                    {label}
                </Link>
            </div>
        );
    };

    /**
     * @description Logs out the user and redirects the the login page.
     * 
     * @async
     * @private
     * @function
     * 
     */
    const logoutClickHandler = async () => {

        setIsLoading(true);

        const token = localStorage.getItem(C.Local.TOKEN);
        await fetchLogout(token);

        history.push(C.Route.LOGIN);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.PROTECTED_CONTAINER}>

            {(usersSelf && !isLoading) &&
                <>
                    <div>
                        {webSocketMessage}
                        {JSON.stringify(usersSelf)}
                    </div>

                    <div>
                        {createButton(C.Route.VOTE, C.Label.VOTE)}
                        {createButton(C.Route.RESULTS, C.Label.RESULTS)}
                        {createButton(C.Route.ADMIN, C.Label.ADMIN)}
                        {createButton(C.Route.EDIT, C.Label.EDIT)}

                        <div
                            className={C.Style.PROTECTED_CONTAINER_BUTTON}
                            onClick={logoutClickHandler}
                        >
                            <Link to={"#"}>
                                {C.Label.LOGOUT}
                            </Link>
                        </div>
                    </div>

                    <Switch>
                        <Route path={C.Route.VOTE}>
                            <Vote />
                        </Route>

                        <Route path={C.Route.RESULTS}>
                            <Results />
                        </Route>
                        
                        <Route path={C.Route.ADMIN}>
                            <Admin />
                        </Route>

                        <Route path={C.Route.EDIT}>
                            <Edit />
                        </Route>
                    </Switch>
                </>
            }

            {(!usersSelf || isLoading) &&
                <>
                    {/* TODO: Replace with style animation */}
                    <div>LOADING...</div>
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