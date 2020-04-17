/**
 * @description App component.
 * 
 * @requires constants
 * @requires protectedContainer
 * @requires PublicContainer
 * @requires react
 * @requires react-router-dom
 * @public
 * @module
 * 
 */
import { Redirect, Switch } from "react-router-dom";
import * as C from "../support/constants";
import ProtectedContainer from "./route/protected/ProtectedContainer";
import PublicContainer from "./route/public/PublicContainer";
import React, { useEffect } from "react";
import RouteDiverter from "./route/RouteDiverter";

/**
 * @description Contains the application with routing. 
 * 
 * @public
 * @function
 * 
 */
const App = () => {

    /**
     * @description Removes the visible outline on focusable elements when they are focused via mouse or touch events.
     * To ensure accessibility, the outline of focusable elements will remain visible when users interface via keyboard events.
     * 
     * This solution maybe replaced by employing a ":focus-visible" CSS pseudo-class when it becomes standardized across browsers.
     * https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible 
     * Make haste, idyllic future.
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
     * @private
     * @function
     * 
     */
    useEffect(() => {

        const mouseDownHandler = () => document.body.classList.add(C.Style.NO_FOCUS_OUTLINE);
        const keyDownHandler = () => document.body.classList.remove(C.Style.NO_FOCUS_OUTLINE);

        document.body.addEventListener(C.Event.MOUSE_DOWN, mouseDownHandler);
        document.body.addEventListener(C.Event.KEY_DOWN, keyDownHandler);

        return () => {

            document.body.removeEventListener(C.Event.MOUSE_DOWN, mouseDownHandler);
            document.body.removeEventListener(C.Event.KEY_DOWN, keyDownHandler);
        };
    }, []);
    
    /**
     * JSX markup
     * 
     */
    return (

        <Switch>
            <RouteDiverter access={C.Access.PUBLIC} path={C.Route.LOGIN} component={PublicContainer} />
            <RouteDiverter access={C.Access.PUBLIC} path={C.Route.REGISTER} component={PublicContainer} />
            <RouteDiverter access={C.Access.PUBLIC} path={C.Route.RESET} component={PublicContainer} />

            <RouteDiverter access={C.Access.PROTECTED} path={C.Route.VOTE} component={ProtectedContainer} />
            <RouteDiverter access={C.Access.PROTECTED} path={C.Route.RESULTS} component={ProtectedContainer} />
            <RouteDiverter access={C.Access.PROTECTED} path={C.Route.ADMIN} component={ProtectedContainer} />
            <RouteDiverter access={C.Access.PROTECTED} path={C.Route.EDIT} component={ProtectedContainer} />

            <Redirect to={C.Route.VOTE} />
        </Switch>
    );
};

/**
 * Export module
 * 
 */
export default App;