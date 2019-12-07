/**
 * @description useVotes hook module
 * 
 * @requires constants
 * @requires react-redux
 * @requires voteActions
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import * as C from "../support/constants";
import * as voteActions from "../state/actions/voteActions";

/**
 * @description Provides access to setting and getting votes data. 
 * 
 * @returns {
 * 
 *      fetchActive: function,
 *      fetchAll: function,
 *      fetchClose: function,
 *      fetchOpen: function,
 *      setVotesActive: function,
 *      setVotesAll: function,
 *      setVotesError: function,
 *      votesActive: object,
 *      votesAll: object,
 *      votesError: object,
 * }
 * @public
 * @function 
 * 
 */
const useVotes = () => {

    const dispatch = useDispatch();

    const fetchActive = () => dispatch(voteActions.fetchActive());
    const fetchAll = () => dispatch(voteActions.fetchAll());
    const fetchClose = () => dispatch(voteActions.fetchClose());
    const fetchOpen = (deadline, quantity) => dispatch(voteActions.fetchOpen(deadline, quantity));

    const setVotesActive = (data) => dispatch(voteActions.setVotesActive(data));
    const votesActive = useSelector((state) => state.votes[C.Action.Type.VOTES_ACTIVE]);

    const setVotesAll = (data) => dispatch(voteActions.setVotesAll(data));
    const votesAll = useSelector((state) => state.votes[C.Action.Type.VOTES_ALL]);

    const setVotesError = (data) => dispatch(voteActions.setVotesError(data));
    const votesError = useSelector((state) => state.votes[C.Action.Type.VOTES_ERROR]);

    return {

        fetchActive,
        fetchAll,
        fetchClose,
        fetchOpen,
        setVotesActive,
        setVotesAll,
        setVotesError,
        votesActive,
        votesAll,
        votesError,
    };
};

/**
 * Export module
 * 
 */
export default useVotes;