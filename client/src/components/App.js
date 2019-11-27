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
import React from "react";
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
                <RouteDiverter access={C.Access.PUBLIC} path={C.Route.LOGIN} component={PublicContainer} />
                <RouteDiverter access={C.Access.PUBLIC} path={C.Route.REGISTER} component={PublicContainer} />
                <RouteDiverter access={C.Access.PUBLIC} path={C.Route.RESET} component={PublicContainer} />

                <RouteDiverter access={C.Access.PROTECTED} path={C.Route.VOTE} component={ProtectedContainer} />
                <RouteDiverter access={C.Access.PROTECTED} path={C.Route.RESULTS} component={ProtectedContainer} />
                <RouteDiverter access={C.Access.PROTECTED} path={C.Route.ADMIN} component={ProtectedContainer} />
                <RouteDiverter access={C.Access.PROTECTED} path={C.Route.EDIT} component={ProtectedContainer} />

                <Redirect to={C.Route.VOTE} />
            </Switch>
        </div>
    );
};

/**
 * Export module
 * 
 */
export default App;