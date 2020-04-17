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
 * @description The ViewportImage component extends an HTMLImageElement with visual preloader and/or lazy-loading functionality for performance optimization.
 * The HTMLImageElement source is assigned the "placeholder" property until the "src" property is fully loaded.
 * The optional "preIntersectionStyle" property is added to the class list immediately before both the "placeholder" is replaced by the "src" and the "intersectionStyle" is added to the class list.
 * A "preIntersectionStyle" argument must be accompanied by an "intersectionStyle" argument or it will be ignored.  However, an "intersectionStyle" argument may function on its own.
 * Both "preIntersectionStyle" and "intersectionStyle" are removed from the class list after the "intersectionStyle" animation is complete. 
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
        imageStyle,
        preIntersectionStyle,
        intersectionStyle,
        errorStyle,
        preloaderStyle,
    }) => {

    /**
     * State and references
     * 
     */
    const [ imageSrc, setImageSrc ] = useState(placeholder);
    const [ isLoading, setIsLoading ] = useState(true);

    const image = useRef(null);

    /**
     * @description Handler for ending the preloader.
     * Sets the component's "isLoading" state to false so that the preloader is no longer rendered.
     * 
     * @private
     * @function
     * 
     */
    const preloaderEndHandler = useCallback(() => {

        if (preloaderStyle && isLoading) {

            setIsLoading(false);
        }
    }, [preloaderStyle, isLoading]);

    /**
     * @description Handler for a dispatched "animationend" event.
     * Removes the "intersectionStyle" class from the HTMLImageElement and ends the preloader.
     * 
     * @private
     * @function
     * 
     */
    const animationEndHandler = useCallback(() => {

        const imageElement = image.current;
        imageElement.removeEventListener(C.Event.ANIMATION_END, animationEndHandler);
        image.current.classList.remove(preIntersectionStyle);
        imageElement.classList.remove(intersectionStyle);

        preloaderEndHandler();

    }, [preIntersectionStyle, intersectionStyle, preloaderEndHandler]);

    /**
     * @description Handler for a dispatched "load" event.
     * Conditionally adds the "intersectionStyle" class to the HTMLImageElement or ends the preloader.
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
            else {

                preloaderEndHandler();
            }
        }
    }, [placeholder, animationEndHandler, intersectionStyle, preloaderEndHandler]);

    /**
     * @description Handler for dispatched "error" events.
     * Adds the "errorStyle" class to the HTMLImageElement.
     * 
     * @private
     * @function
     * 
     */
    const errorHandler = useCallback(() => {

        if (preIntersectionStyle && intersectionStyle) {

            image.current.classList.add(preIntersectionStyle);
        }
        
        image.current.classList.add(errorStyle);
    }, [preIntersectionStyle, intersectionStyle, errorStyle]);

    /**
     * @description Initializes an IntersectionObserver object with relevant subscriptions.
     * Observation of the HTMLImageElement ends once it intersects with the viewport. 
     * 
     * @returns {function} Cleanup code to execute when the component dismounts.
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
          
                        if (preIntersectionStyle && intersectionStyle) {

                            image.current.classList.add(preIntersectionStyle);
                        }

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
            imageElement.removeEventListener(C.Event.ANIMATION_END, animationEndHandler);

            window.removeEventListener(C.Event.ERROR, errorHandler);
            
            if (observer) {

                observer.unobserve(imageElement);
            }
        };
    }, [imageSrc, src, loadHandler, errorHandler, animationEndHandler, preIntersectionStyle, intersectionStyle]);

    /**
     * JSX markup
     * 
     */
    return (
        
        <>
            {preloaderStyle && isLoading &&
                <div className={preloaderStyle} />
            }

            <img
                ref={image}
                src={imageSrc}
                alt={alt}
                className={imageStyle}
            />
        </>
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
    imageStyle: PropTypes.string.isRequired,
    preIntersectionStyle: PropTypes.string,
    intersectionStyle: PropTypes.string,
    errorStyle: PropTypes.string.isRequired,
    preloaderStyle: PropTypes.string
};

/**
 * Export module
 * 
 */
export default memo(ViewportImage);