/**
 * @description RouteDiverter component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @requires react-router-dom
 * @requires useMount
 * @requires useUsers
 * @public
 * @module
 * 
 */
import { Redirect, Route } from "react-router-dom";
import * as C from "../../support/constants";
import PropTypes from "prop-types";
import React from "react";
import useMount from "../../hooks/useMount";
import useUsers from "../../hooks/useUsers";

/**
 * @description The RouteDiverter component is a wrapped Route component with a conditional redirect.
 * Users will be redirected to either public or protected routes depending on the "access" property value and the user's current log status.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const RouteDiverter = ({
    
        access,
        component: Component,
        path,
    }) => {

    /**
     * Hooks
     * 
     */
    const {
        
        fetchSelf,
        usersError,
        usersSelf
    } = useUsers();

    const { onMount } = useMount();

    /**
     * @description Checks the log status of a user.
     * The existence of an unexpired authentication token indicates that a user is currently logged in.
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        const token = localStorage.getItem(C.Local.TOKEN);
        fetchSelf(token);
    };

    onMount(mount);

    /**
     * User is already logged in while attempting to access a public route.
     * Redirect to protected route.
     * 
     */
    if (usersSelf && access === C.Access.PUBLIC) {

        return <Redirect to={C.Route.FORWARD_SLASH} />;
    }

    /**
     * User is not logged in while attempting to access a protected route.
     * Redirect to public route.
     * 
     */
    if (usersError && access === C.Access.PROTECTED) {

        return <Redirect to={C.Route.LOGIN} />;
    }

    /**
     * JSX markup
     * 
     */
    return (

        <Route path={path}>
            <Component />
        </Route>
    );
};

/**
 * Prop Types
 * 
 */
RouteDiverter.propTypes = {

    access: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired,
    path: PropTypes.string.isRequired,
};

/**
 * Export module
 * 
 */
export default RouteDiverter;