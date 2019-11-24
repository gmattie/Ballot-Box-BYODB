/**
 * @description App component.
 * 
 * @requires constants
 * @requires PublicContainer
 * @requires react
 * @requires react-router-dom
 * @public
 * @module
 * 
 */
import { Redirect, Route, Switch } from "react-router-dom";
import * as C from "../support/constants";
import PublicContainer from "./route/public/PublicContainer";
import React from "react";
import Vote from "./route/protected/Vote";
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
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.APP}>
            <Switch>
                <Route exact path={C.Route.FORWARD_SLASH}>
                    <Vote />
                </Route>

                <RouteDiverter access={C.Access.PUBLIC} path={C.Route.LOGIN} component={PublicContainer} />
                <RouteDiverter access={C.Access.PUBLIC} path={C.Route.REGISTER} component={PublicContainer} />
                <RouteDiverter access={C.Access.PUBLIC} path={C.Route.RESET} component={PublicContainer} />

                <Redirect to={C.Route.FORWARD_SLASH} />
            </Switch>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default App;