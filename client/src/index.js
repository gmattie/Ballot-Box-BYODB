/**
 * @description The entry point for the application's frontend.
 * 
 * @requires App
 * @requires constants
 * @requires react
 * @requires react-dom
 * @requires react-redux
 * @requires react-router-dom
 * @requires serviceWorker
 * @requires store
 * @requires styles
 * @public
 * @module
 * 
 */
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as C from "./support/constants";
import * as serviceWorker from './support/serviceWorker';
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import store from "./state/store";

/**
 * @description Wraps the App component in both BrowserRouter and Redux Provider components for 
 * application-level accessibility and renders it into the root element of the DOM.
 * 
 */
ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById(C.HTMLElement.ROOT)
);

/**
 * @description Registers a service worker to facilitate A2HS (Add to Home Screen)
 * or PWA (Progressive Web App) functionality from supporting browsers.
 * 
 */
serviceWorker.register();