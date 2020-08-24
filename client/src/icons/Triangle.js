/**
 * @description Triangle component.
 * 
 * @requires react
 * @public
 * @module
 * 
 */
import React from "react";

/**
 * @description Embeds an SVG (Scalable Vector Graphic) within a functional React component.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const Triangle = () => {

    /**
     * JSX markup
     * 
     */
    return (

        <svg viewBox="0 0 10 10">
            <polygon points="0 0 10 5 0 10 0 0" />
        </svg>
    );
};

/**
 * Export module
 * 
 */
export default Triangle;