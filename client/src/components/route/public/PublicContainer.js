/**
 * @description PublicContainer component.
 * 
 * @requires BallotBoxIcon.png
 * @requires constants
 * @requires Login
 * @requires react
 * @requires react-router-dom
 * @requires Register
 * @requires Reset
 * @requires useUsers
 * @public
 * @module
 * 
 */
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import Icon from "../../../assets/BallotBoxIcon.png";
import Login from "./Login";
import React from "react";
import Register from "./Register";
import Reset from "./Reset";
import useUsers from "../../../hooks/useUsers";

/**
 * @description The PublicContainer component groups the UI components that facilitate authenticated accessibility to the application.
 * PublicContainer contains application title information, router links and all the other public route components: Login, Register and Reset.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const PublicContainer = () => {

    /**
     * Hooks
     * 
     */
    const { path } = useRouteMatch();
    const { usersError } = useUsers();
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
            ? C.Style.PUBLIC_CONTAINER_CONTENT_NAV_BUTTON_SELECTED
            : C.Style.PUBLIC_CONTAINER_CONTENT_NAV_BUTTON;

        return style;
    };

    /**
     * @description Creates a button with a hypertext reference link and textual content.
     * 
     * @param {string} label - The button's textual content.
     * @param {string} href - A hypertext reference link.
     * @private
     * @function
     * 
     */
    const createButton = (label, href) => {

        return (

            <button
                className={getButtonStyle(href)}
                onClick={() => history.push(href)}
            >
                {label}
            </button>
        );
    };

    /**
     * JSX markup
     * 
     */
    if (usersError) {

        return (
        
            <div className={C.Style.PUBLIC_CONTAINER}>
                <img
                    className={C.Style.PUBLIC_CONTAINER_ICON}
                    src={Icon}
                    alt={C.Label.ICON}
                />

                <div className={C.Style.PUBLIC_CONTAINER_CONTENT}>
                    <nav className={C.Style.PUBLIC_CONTAINER_CONTENT_NAV}>
                        {createButton(C.Label.LOGIN, C.Route.LOGIN)}
                        {createButton(C.Label.REGISTER, C.Route.REGISTER)}
                        {createButton(`${C.Label.RESET} ${C.Label.PASSWORD}`, C.Route.RESET)}
                    </nav>
                    
                    <Switch>
                        <Route path={C.Route.LOGIN}>
                            <Login />
                        </Route>

                        <Route path={C.Route.REGISTER}>
                            <Register />
                        </Route>
                        
                        <Route path={C.Route.RESET}>
                            <Reset />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }

    return (
        
        <div className={C.Style.PUBLIC_CONTAINER}>
            <>
                {/* TODO: Replace with style animation */}
                <div>LOADING...</div>
            </>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default PublicContainer;