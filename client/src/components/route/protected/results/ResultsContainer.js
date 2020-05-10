/**
 * @description ResultsContainer component.
 * 
 * @requires constants
 * @requires ProtectedContainer
 * @requires react
 * @requires Result
 * @requires ResultDetail
 * @requires useAuth
 * @requires useMount
 * @requires useVotes

 * @public
 * @module
 * 
 */
import { LogoutAPI } from "../ProtectedContainer";
import * as C from "../../../../support/constants";
import React, { useContext, memo, useRef, useState } from "react";
import Result from "./Result";
import ResultDetail from "../../../modal/result/ResultDetail";
import useAuth from "../../../../hooks/useAuth";
import useMount from "../../../../hooks/useMount";
import useVotes from "../../../../hooks/useVotes";

/**
 * @description The memoized ResultsContainer component contains a list of Result components.
 * This component facilitates fetching all Vote documents from the database in order to populate the list of Result components.
 * 
 * @returns {object} JSX markup.
 * @public
 * @function
 * 
 */
const ResultsContainer = () => {

    /**
     * Context
     * 
     */
    const logout = useContext(LogoutAPI);

    /**
     * State
     * 
     */
    const [ isLoading, setIsLoading ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);

    /**
     * Refs
     * 
     */
    const resultDetailDocumentID = useRef(null);

    /**
     * Hooks
     * 
     */
    const { authError } = useAuth();
    const { onMount } = useMount();
    
    const {

        fetchAll,
        votesAll,
    } = useVotes();

    /**
     * @description Fetches all Vote documents to populate the "votesAll" state if the state is null. 
     * 
     * @private
     * @function
     * 
     */
    const mount = () => {

        (async () => {

            if (!votesAll) {

                await fetchAll();
            }

            setIsLoading(false);
        })();
    };

    onMount(mount);

    /**
     * Auth failure
     * Logout user if authentication fails while fetching data.
     * 
     */
    if (authError) {

        setTimeout(() => logout());
    }

    /**
     * @description Displays a ResultDetail modal dialog component.
     * 
     * @param {string} voteID - The ID of the target Vote document.
     * @private
     * @function
     * 
     */
    const showResultDetails = (voteID) => {

        resultDetailDocumentID.current = voteID;

        setShowDialog(true);
    };

    /**
     * JSX markup
     * 
     */
    return (

        <div className={C.Style.RESULTS_CONTAINER}>
            {showDialog &&
                <ResultDetail 
                    voteID={resultDetailDocumentID.current}
                    okCallback={() => setShowDialog(false)}
                    logout={logout}
                />
            }

            {(isLoading)
                ?   <div className={C.Style.RESULTS_CONTAINER_PRELOADER} />
                :   <>
                        {votesAll && votesAll.map((vote) => {

                            return (
                            
                                <Result
                                    key={vote._id}
                                    voteDocument={vote}
                                    clickCallback={showResultDetails}
                                />
                            );
                        })}
                    </>
            }
        </div>
    );
};

/**
 * Export module
 * 
 */
export default memo(ResultsContainer);