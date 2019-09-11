/**
 * @description The entry point for the application's frontend.
 * 
 * @requires App
 * @requires constants
 * @requires react
 * @requires react-dom
 * @requires styles
 * @requires react-redux
 * @requires store
 * @public
 * @module
 * 
 */
import "./styles/index.scss";
import { Provider } from "react-redux";
import * as C from "./support/constants";
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import store from "./state/store";

/**
 * @description Wraps the App component in a Redux Provider and renders it into the root element of the DOM.
 * 
 * @public
 * @function
 * 
 */
ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById(C.HTMLElement.ROOT)
);