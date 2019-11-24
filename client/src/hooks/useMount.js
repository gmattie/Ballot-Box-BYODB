/**
 * @description useMount hook module
 * 
 * @requires react
 * @public
 * @module
 * 
 */
import { useEffect } from "react";

/**
 * @description Provides access to executing a function once after a component mounts.
 * 
 * @returns {
 * 
 *      onMount: function
 * }
 * @public
 * @function
 *  
 */
const useMount = () => {

    /**
     * @description Executes a function once after the component mounts via a useEffect hook with zero dependencies.
     * This approach of passing a function rather than simply running a useEffect hook with zero dependencies circumvents an ESLint error for "react-hooks/exhaustive-deps".
     * 
     * @param {function} mountFunction - The function to execute after the component mounts.
     * @private
     * @function
     * 
     */
    const useOnMount = (mountFunction) => useEffect(mountFunction, []);
    const onMount = useOnMount;

    return {

        onMount
    };
};

/**
 * Export module
 * 
 */
export default useMount;