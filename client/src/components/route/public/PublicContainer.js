/**
 * @description PublicContainer component.
 * 
 * @requires BallotBoxIcon.png
 * @requires Button
 * @requires constants
 * @requires Login
 * @requires react
 * @requires react-router-dom
 * @requires Register
 * @requires Reset
 * @requires useUsers
 * @requires utilities
 * @public
 * @module
 * 
 */
import { debounce } from "../../../support/utilities";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import * as C from "../../../support/constants";
import Button from "../../controls/Button";
import Icon from "../../../assets/BallotBoxIcon.png";
import Login from "./Login";
import React, { useEffect, useRef } from "react";
import Register from "./Register";
import Reset from "./Reset";
import useUsers from "../../../hooks/useUsers";

/**
 * @description The PublicContainer component groups the UI components that facilitate authenticated accessibility to the application.
 * PublicContainer contains application title information, router links and all the other public route components: Login, Register and Reset.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const PublicContainer = () => {

    /**
     * Refs 
     * 
     */
    const contentRef = useRef();


    /**
     * Hooks
     * 
     */
    const { path } = useRouteMatch();
    const { usersError } = useUsers();
    const history = useHistory();

    /**
     * @description Implements event listeners and observers to facilitate responsive functionality and layout, in tandem with CSS, for
     * both mobile and desktop deployments.  The event subscriptions include a "resize" event listener for the Window object in addition
     * to a ResizeObserver and an IntersectionObserver for the referenced C.Style.PUBLIC_CONTAINER_CONTENT HTMLDivElement.   
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
     * @private
     * @function 
     * 
     */
    useEffect(() => {

        const contentElement = contentRef.current;

        if (contentElement) {

            const centerContentHandler = (event) => {

                if (event instanceof Event && event.type === C.Event.RESIZE) {

                    const mobileBrowserMinHeight = window.screen.height * 0.75;
                    const mobileKeyboardVisible = document.documentElement.clientHeight < mobileBrowserMinHeight;
                    
                    contentElement.parentElement.style.position = (mobileKeyboardVisible)
                        ? C.CSS.STATIC
                        : C.CSS.FIXED;
                }

                contentElement.style.top = `${contentElement.parentElement.clientHeight / 2 - contentElement.clientHeight / 2}${C.CSS.PX}`;
            };

            const debounceCenterContentHandler = debounce(100, centerContentHandler);

            const resizeObserver = new ResizeObserver(debounce(100, (entries) => {
                
                for (let entry of entries) {
                    
                    if (entry.target === contentElement) {
                        
                        centerContentHandler();
                    }
                }
            }));
            
            const intersectionOptions = {

                threshold: 1.0
            };

            const intersectionObserver = new IntersectionObserver(debounce(100, (entries) => {

                for (let entry of entries) {

                    if (entry.target === contentElement) {

                        contentElement.parentElement.style.position = (entry.intersectionRatio < intersectionOptions.threshold)
                            ? C.CSS.STATIC
                            : C.CSS.FIXED;

                        centerContentHandler();
                    }
                }
            }), intersectionOptions);

            window.addEventListener(C.Event.RESIZE, debounceCenterContentHandler);
            resizeObserver.observe(contentElement);
            intersectionObserver.observe(contentElement);
            
            centerContentHandler();

            return () => {
                
                window.removeEventListener(C.Event.RESIZE, debounceCenterContentHandler);
                resizeObserver.disconnect();
                intersectionObserver.disconnect();
            };
        }
    }, [usersError, contentRef]);


    /**
     * @description Retrieves a style based on the hypertext reference link argument.
     * 
     * @param {string} href - A hypertext reference link.
     * @private
     * @function
     *  
     */
    const getButtonStyle = (href) => {

        const style = (href === path)
            ? C.Style.BUTTON_NAVIGATION_SELECTED
            : C.Style.BUTTON_NAVIGATION;

        return style;
    };

    /**
     * @description Creates a button with a hypertext reference link and textual content.
     * 
     * @param {string} label - The textual content of the Button component.
     * @param {string} href - A hypertext reference link.
     * @private
     * @function
     * 
     */
    const createButton = (label, href) => {

        return (

            <Button
                style={getButtonStyle(href)}
                onClick={() => history.push(href)}
            >
                {label}
            </Button>
        );
    };

    /**
     * JSX markup
     * 
     */
    if (usersError) {

        return (
        
            <div className={C.Style.PUBLIC_CONTAINER}>
                <div
                    className={C.Style.PUBLIC_CONTAINER_CONTENT}
                    ref={contentRef}
                >
                    <img
                        className={C.Style.PUBLIC_CONTAINER_CONTENT_ICON}
                        src={Icon}
                        alt={C.Label.ICON}
                    />

                    <div className={C.Style.PUBLIC_CONTAINER_CONTENT_FORM}>
                        <nav className={C.Style.PUBLIC_CONTAINER_CONTENT_FORM_NAV}>
                            {createButton(C.Label.LOGIN, C.Route.LOGIN)}
                            {createButton(C.Label.REGISTER, C.Route.REGISTER)}
                            {createButton(C.Label.RESET, C.Route.RESET)}
                        </nav>

                        <Switch>
                            <Route path={C.Route.LOGIN}>
                                <Login />
                            </Route>

                            <Route path={C.Route.REGISTER}>
                                <Register />
                            </Route>
                            
                            <Route path={C.Route.RESET}>
                                <Reset />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className={C.Style.PUBLIC_CONTAINER}>
            <div className={C.Style.PUBLIC_CONTAINER_PRELOADER} />
        </div>
    );
};

/**
 * Export module
 * 
 */
export default PublicContainer;