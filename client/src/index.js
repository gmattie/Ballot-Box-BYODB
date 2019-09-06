/**
 * @description The entry point of the application.
 * 
 * @requires App
 * @requires constants
 * @requires react
 * @requires react-dom
 * @requires styles
 * @public
 * @module
 * 
 */
import "./styles/index.scss";
import * as C from "./support/constants";
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";

/**
 * @description Render the App component into the container element of the DOM.
 * 
 * @public
 * @function
 * 
 */
ReactDOM.render(<App />, document.getElementById(C.HTMLElement.ROOT));