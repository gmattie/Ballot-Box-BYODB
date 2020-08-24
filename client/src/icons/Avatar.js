/**
 * @description Avatar component.
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
const Avatar = () => {

    /**
     * JSX markup
     * 
     */
    return (

        <svg viewBox="0 0 238 239">
            <path d="M231,222l-71-31c-2-1-4-2-4-4s-3-21-4-32a12,12,0,0,1,1-5l9-26c0-1,0-3,1-3s5-14,6-21-1-3-1-5-2-3-2-5,1-19,0-28-4-19-12-26a51,51,0,0,0-35-15h-1A51,51,0,0,0,84,35c-7,7-11,16-12,26s0,19,0,28-1,3-2,5-1,4-1,5,0,15,6,21,0,2,1,3l9,26a12,12,0,0,1,1,5c-1,11-3,22-4,32s-3,3-4,4L7,222l-7,3v14H238V225Z"/>
        </svg>
    );
};

/**
 * Export module
 * 
 */
export default Avatar;

