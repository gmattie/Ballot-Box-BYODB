/**
 * @description Collapsible component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import PropTypes from "prop-types";
import React, { useState } from "react";

/**
 * @description A wrapper component that facilitates toggling the visibility of the content children when the header is clicked.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} The portal rendered to the DOM.
 * @public
 * @function
 * 
 */
const Collapsible = ({
    
        title,
        headerStyle,
        eventHandler,
        children,
    }) => {

    /**
     * State
     * 
     */
    const [ isCollapsed, setIsCollapsed ] = useState(true);

    /**
     * @description Toggles the local state
     * 
     * @private
     * @function
     * 
     */
    const toggleHandler = () => {
    
        const collapsedState = !isCollapsed;

        if (eventHandler) {

            eventHandler(collapsedState);
        }

        setIsCollapsed(collapsedState);
    };

    /**
     * @description Retrieves combined CSS class names based on the local state.
     * 
     * @returns {string} The combined CSS class names.
     * @private
     * @function
     * 
     */
    const getHeaderStyle = () => {

        const titleStyle = (isCollapsed)
            ? C.Style.COLLAPSIBLE_HEADER_TITLE
            : C.Style.COLLAPSIBLE_HEADER_TITLE_EXPANDED;

        return `${headerStyle} ${titleStyle}`;
    };

    /**
     * @description Retrieves combined CSS class names based on the local state.
     * 
     * @returns {string} The combined CSS class names.
     * @private
     * @function
     * 
     */
    const getContentStyle = () => {

        const visibility = (isCollapsed)
            ? C.Style.COLLAPSIBLE_CONTENT_HIDE
            : C.Style.COLLAPSIBLE_CONTENT_SHOW;

        return `${C.Style.COLLAPSIBLE_CONTENT} ${visibility}`;
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.COLLAPSIBLE}>
            <div
                className={getHeaderStyle()}
                onClick={toggleHandler}
            >
                {title}
            </div>

            <div className={getContentStyle()}> 
                {children}
            </div>
        </div>
    );
};

/**
 * Prop Types
 * 
 */
Collapsible.propTypes = {

    title: PropTypes.string.isRequired,
    headerStyle: PropTypes.string.isRequired,
    eventHandler: PropTypes.func,
    children: PropTypes.node.isRequired,
};

/**
 * Export module
 * 
 */
export default Collapsible;