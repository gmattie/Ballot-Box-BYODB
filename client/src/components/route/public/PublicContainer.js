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
 * @public
 * @module
 * 
 */
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import * as C from "../../../support/constants";
import Icon from "../../../assets/BallotBoxIcon.png";
import Login from "./Login";
import React from "react";
import Register from "./Register";
import Reset from "./Reset";

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
            ? C.Style.PUBLIC_CONTAINER_BUTTON_SELECTED
            : C.Style.PUBLIC_CONTAINER_BUTTON;

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
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.PUBLIC_CONTAINER}>
            <img src={Icon} alt={C.Label.ICON} />

            <div>
                {createButton(C.Route.LOGIN, C.Label.LOGIN)}
                {createButton(C.Route.REGISTER, C.Label.REGISTER)}
                {createButton(C.Route.RESET, C.Label.RESET)}
            </div>
            
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
    );
};

/**
 * Export module
 * 
 */
export default PublicContainer;