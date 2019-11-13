/**
 * @description Root component.
 * 
 * @requires Login
 * @requires react
 * @public
 * @module
 * 
 */
import Login from "./Login";
import React from "react";

/**
 * @description The Root component contains UI that facilitates authenticated accessibility to the application.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Root = () => {

    /**
     * JSX markup
     * 
     */
    return (

        <Login />
    );
};

/**
 * Export module
 * 
 */
export default Root;