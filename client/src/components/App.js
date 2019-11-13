/**
 * @description App component.
 * 
 * @requires constants
 * @requires react
 * @requires react-router-dom
 * @requires Root
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Root from "./layout/root/Root";

/**
 * @description Contains the application with routing. 
 * 
 * @public
 * @function
 * 
 */
const App = () => {

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.APP}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={C.Route.ROOT} component={Root} />
                    <Redirect to={C.Route.ROOT} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default App;