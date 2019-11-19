/**
 * @description Entry component.
 * 
 * @requires constants
 * @requires Login
 * @requires react
 * @requires react-router-dom
 * @requires Register
 * @requires Reset
 * @requires BallotBoxIcon.png
 * @public
 * @module
 * 
 */
import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import * as C from "../../../support/constants";
import Login from "./Login";
import React, { useEffect, useRef } from "react";
import Register from "./Register";
import Reset from "./Reset";
import Icon from "../../../assets/BallotBoxIcon.png";
import ViewportImage from "../../ViewportImage";

/**
 * @description The Entry component facilitates authenticated accessibility to the application.
 * Entry is a container component that contains application title information, router links and the other public components: Login, Register and Reset.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Entry = () => {

    /**
     * Refs
     * 
     */
    const path = useRef("");

    /**
     * Hooks
     * 
     */
    const history = useHistory();
    const routerMatch = useRouteMatch();

    /**
     * Mount
     * 
     */
    useEffect(() => {

        if (routerMatch.path !== C.Route.FORWARD_SLASH) {

            path.current = routerMatch.path;
        }

        history.push(`${path.current}${C.Route.LOGIN}`);
    }, [history, routerMatch.path]);

    /**
     * JSX markup
     * 
     */
    return (
        <>
            <ViewportImage
                src={Icon}
                alt={C.Label.ICON}
                style={C.Style.VIEWPORT_IMAGE}
                intersectionStyle={C.Style.VIEWPORT_IMAGE_INTERSECTION}
                errorStyle={C.Style.VIEWPORT_IMAGE_ERROR}
            />

            <div>
                <Link to={`${path.current}${C.Route.LOGIN}`}>{C.Label.LOGIN}</Link>
                <Link to={`${path.current}${C.Route.REGISTER}`}>{C.Label.REGISTER}</Link>
                <Link to={`${path.current}${C.Route.RESET}`}>{C.Label.RESET}</Link>
            </div>
            
            <div>
                <Switch>
                    <Route exact path={`${path.current}${C.Route.LOGIN}`} component={Login} />
                    <Route exact path={`${path.current}${C.Route.REGISTER}`} component={Register} />
                    <Route exact path={`${path.current}${C.Route.RESET}`} component={Reset} />
                </Switch>
            </div>
        </>
    );
};

/**
 * Export module
 * 
 */
export default Entry;