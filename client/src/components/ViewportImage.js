/**
 * @description ViewportImage component.
 * 
 * @requires constants
 * @requires prop-types
 * @requires react
 * @public
 * @module
 * 
 */
import * as C from "../support/constants";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * @description The ViewportImage component extends an HTMLImageElement with visual loading indication and/or lazy-loading functionality for performance optimization.
 * The HTMLImageElement source is assigned the "placeholder" property until the "src" property is fully loaded. 
 * The IntersectionObserver API is employed to facilitate loading the image only when its bounding box area is observed within the viewport.
 * 
 * @param {object} props - Immutable properties populated by the parent component.
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ViewportImage = ({
        
        src,
        alt,
        placeholder,
        style,
        intersectionStyle,
        errorStyle
    }) => {

    /**
     * State and references
     * 
     */
    const [ imageSrc, setImageSrc ] = useState(placeholder);
    const image = useRef(null);

    /**
     * @description Handler for a dispatched "animationend" event.
     * Removes the "intersectionStyle" class from the HTMLImageElement.
     * 
     * @private
     * @function
     * 
     */
    const animationEndHandler = useCallback(() => {

        const imageElement = image.current;

        imageElement.removeEventListener(C.Event.ANIMATION_END, animationEndHandler);
        imageElement.classList.remove(intersectionStyle);
    }, [intersectionStyle]);

    /**
     * @description Handler for a dispatched "load" event.
     * Adds the "intersectionStyle" class to the HTMLImageElement.
     * 
     * @private
     * @function
     * 
     */
    const loadHandler = useCallback(() => {

        const imageElement = image.current;
        
        if (imageElement.src !== placeholder) {

            imageElement.removeEventListener(C.Event.LOAD, loadHandler);

            if (intersectionStyle) {

                imageElement.addEventListener(C.Event.ANIMATION_END, animationEndHandler);
                imageElement.classList.add(intersectionStyle);
            }
        }
    }, [placeholder, animationEndHandler, intersectionStyle]);

    /**
     * @description Handler for dispatched "error" events.
     * Adds the "errorStyle" class to the HTMLImageElement.
     * 
     * @private
     * @function
     * 
     */
    const errorHandler = useCallback(() => {

        image.current.classList.add(errorStyle);
    }, [errorStyle]);

    /**
     * @description Initializes an IntersectionObserver object with relevant subscriptions.
     * Observation of the HTMLImageElement ends once it intersects with the viewport. 
     * 
     * @private
     * @function
     * 
     */
    useEffect(() => {

        const imageElement = image.current;
        imageElement.addEventListener(C.Event.LOAD, loadHandler);
        imageElement.addEventListener(C.Event.ERROR, errorHandler);
        
        window.addEventListener(C.Event.ERROR, errorHandler);
        
        let observer;

        if (imageSrc !== src) {

            const observerHandler = (entries) => {

                entries.forEach(entry => {
        
                    if (entry.isIntersecting) {
          
                        setImageSrc(src);
                        
                        observer.unobserve(imageElement);
                    }
                });
            };

            const observerOptions = {

                root: null,
                threshold: 0.0
            };

            observer = new IntersectionObserver(observerHandler, observerOptions);
            observer.observe(imageElement);
        }

        return () => {

            imageElement.removeEventListener(C.Event.LOAD, loadHandler);
            imageElement.removeEventListener(C.Event.ERROR, errorHandler);
            window.removeEventListener(C.Event.ERROR, errorHandler);
            
            if (observer) {

                observer.unobserve(imageElement);
            }
        };
    }, [imageSrc, src, loadHandler, errorHandler]);

    /**
     * JSX markup
     * 
     */
    return (
        
        <img
            ref={image}
            src={imageSrc}
            alt={alt}
            className={style}
        />
    );
};

/**
 * Prop Types
 * 
 */
ViewportImage.propTypes = {

    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    intersectionStyle: PropTypes.string,
    errorStyle: PropTypes.string.isRequired
};

/**
 * Export module
 * 
 */
export default memo(ViewportImage);