/**
 * @description App component.
 * 
 * @requires constants
 * @requires Entry
 * @requires react
 * @requires react-router-dom
 * @public
 * @module
 * 
 */
import { Redirect, Route, Switch } from "react-router-dom";
import * as C from "../support/constants";
import Entry from "./route/public/Entry";
import React from "react";

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
            <Switch>
                <Route path={C.Route.ENTRY} component={Entry} />
                <Redirect to={C.Route.ENTRY} />
            </Switch>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default App;