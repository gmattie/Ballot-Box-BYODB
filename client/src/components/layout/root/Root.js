/**
 * @description Root component.
 * 
 * @requires Login
 * @requires react
 * @requires Register
 * @requires Reset
 * @public
 * @module
 * 
 */
import Login from "./Login";
import React from "react";
import Register from "./Register";
import Reset from "./Reset";

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
        <>
            <Login />
            <Register />
            <Reset />
        </>
    );
};

/**
 * Export module
 * 
 */
export default Root;