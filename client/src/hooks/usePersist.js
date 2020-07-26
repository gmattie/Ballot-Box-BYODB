/**
 * @description useAuth hook module
 * 
 * @requires constants
 * @requires persistActions
 * @requires react
 * @requires react-redux
 * @public
 * @module
 * 
 */
import { useDispatch, useSelector } from "react-redux";
import * as C from "../support/constants";
import * as persistActions from "../state/actions/persistActions";

/**
 * @description Provides access to setting and getting persist data. 
 * 
 * @returns {
 * 
 *      persistCollapsedAddItem: boolean,
 *      persistCollapsedAdminCredentials: boolean,
 *      persistCollapsedEditItems: boolean,
 *      persistCollapsedManageVote: boolean,
 *      persistRadioAggregate: boolean,
 *      persistScrollAdmin: number,
 *      persistScrollCandidates: number,
 *      persistScrollEdit: number,
 *      persistScrollEditItems: number,
 *      persistScrollResults: number,
 *      persistScrollVotes: number,
 *      persistTextDeadline: string,
 *      persistTextImage: string,
 *      persistTextName: string,
 *      persistTextQuantity: string,
 *      persistTextThumbnail: string,
 *      persistToggleAnonymous: boolean,
 *      setPersistCollapsedAddItem: function,
 *      setPersistCollapsedAdminCredentials: function,
 *      setPersistCollapsedEditItems: function,
 *      setPersistCollapsedManageVote: function,
 *      setPersistRadioAggregate: function,
 *      setPersistScrollAdmin: function,
 *      setPersistScrollCandidates: function,
 *      setPersistScrollEdit: function,
 *      setPersistScrollEditItems: function,
 *      setPersistScrollResults: function,
 *      setPersistScrollVotes: function,
 *      setPersistTextDeadline: function,
 *      setPersistTextImage: function,
 *      setPersistTextName: function,
 *      setPersistTextQuantity: function,
 *      setPersistTextThumbnail: function,
 *      setPersistToggleAnonymous: function,
 * }
 * @public
 * @function 
 * 
 */
const usePersist = () => {

    const dispatch = useDispatch();

    const setPersistCollapsedAddItem = (collapsed) => dispatch(persistActions.setPersistCollapsedAddItem(collapsed));
    const persistCollapsedAddItem = useSelector((state) => state.persist[C.Action.Type.PERSIST_COLLAPSED_ADD_ITEM]);

    const setPersistCollapsedAdminCredentials = (collapsed) => dispatch(persistActions.setPersistCollapsedAdminCredentials(collapsed));
    const persistCollapsedAdminCredentials = useSelector((state) => state.persist[C.Action.Type.PERSIST_COLLAPSED_ADMIN_CREDENTIALS]);

    const setPersistCollapsedEditItems = (collapsed) => dispatch(persistActions.setPersistCollapsedEditItems(collapsed));
    const persistCollapsedEditItems = useSelector((state) => state.persist[C.Action.Type.PERSIST_COLLAPSED_EDIT_ITEMS]);

    const setPersistCollapsedManageVote = (collapsed) => dispatch(persistActions.setPersistCollapsedManageVote(collapsed));
    const persistCollapsedManageVote = useSelector((state) => state.persist[C.Action.Type.PERSIST_COLLAPSED_MANAGE_VOTE]);

    const setPersistRadioAggregate = (aggregate) => dispatch(persistActions.setPersistRadioAggregate(aggregate));
    const persistRadioAggregate = useSelector((state) => state.persist[C.Action.Type.PERSIST_RADIO_AGGREGATE]);

    const setPersistScrollAdmin = (scrollOffset) => dispatch(persistActions.setPersistScrollAdmin(scrollOffset));
    const persistScrollAdmin = useSelector((state) => state.persist[C.Action.Type.PERSIST_SCROLL_ADMIN]);

    const setPersistScrollCandidates = (scrollOffset) => dispatch(persistActions.setPersistScrollCandidates(scrollOffset));
    const persistScrollCandidates = useSelector((state) => state.persist[C.Action.Type.PERSIST_SCROLL_CANDIDATES]);
    
    const setPersistScrollEdit = (scrollOffset) => dispatch(persistActions.setPersistScrollEdit(scrollOffset));
    const persistScrollEdit = useSelector((state) => state.persist[C.Action.Type.PERSIST_SCROLL_EDIT]);

    const setPersistScrollEditItems = (scrollOffset) => dispatch(persistActions.setPersistScrollEditItems(scrollOffset));
    const persistScrollEditItems = useSelector((state) => state.persist[C.Action.Type.PERSIST_SCROLL_EDIT_ITEMS]);

    const setPersistScrollResults = (scrollOffset) => dispatch(persistActions.setPersistScrollResults(scrollOffset));
    const persistScrollResults = useSelector((state) => state.persist[C.Action.Type.PERSIST_SCROLL_RESULTS]);

    const setPersistScrollVotes = (scrollOffset) => dispatch(persistActions.setPersistScrollVotes(scrollOffset));
    const persistScrollVotes = useSelector((state) => state.persist[C.Action.Type.PERSIST_SCROLL_VOTES]);
    
    const setPersistTextDeadline = (text) => dispatch(persistActions.setPersistTextDeadline(text));
    const persistTextDeadline = useSelector((state) => state.persist[C.Action.Type.PERSIST_TEXT_DEADLINE]);

    const setPersistTextImage = (text) => dispatch(persistActions.setPersistTextImage(text));
    const persistTextImage = useSelector((state) => state.persist[C.Action.Type.PERSIST_TEXT_IMAGE]);

    const setPersistTextName = (text) => dispatch(persistActions.setPersistTextName(text));
    const persistTextName = useSelector((state) => state.persist[C.Action.Type.PERSIST_TEXT_NAME]);
    
    const setPersistTextQuantity = (text) => dispatch(persistActions.setPersistTextQuantity(text));
    const persistTextQuantity = useSelector((state) => state.persist[C.Action.Type.PERSIST_TEXT_QUANTITY]);

    const setPersistTextThumbnail = (text) => dispatch(persistActions.setPersistTextThumbnail(text));
    const persistTextThumbnail = useSelector((state) => state.persist[C.Action.Type.PERSIST_TEXT_THUMBNAIL]);

    const setPersistToggleAnonymous = (anonymous) => dispatch(persistActions.setPersistToggleAnonymous(anonymous));
    const persistToggleAnonymous = useSelector((state) => state.persist[C.Action.Type.PERSIST_TOGGLE_ANONYMOUS]);

    return {

        persistCollapsedAddItem,
        persistCollapsedAdminCredentials,
        persistCollapsedEditItems,
        persistCollapsedManageVote,
        persistRadioAggregate,
        persistScrollAdmin,
        persistScrollCandidates,
        persistScrollEdit,
        persistScrollEditItems,
        persistScrollResults,
        persistScrollVotes,
        persistTextDeadline,
        persistTextImage,
        persistTextName,
        persistTextQuantity,
        persistTextThumbnail,
        persistToggleAnonymous,
        setPersistCollapsedAddItem,
        setPersistCollapsedAdminCredentials,
        setPersistCollapsedEditItems,
        setPersistCollapsedManageVote,
        setPersistRadioAggregate,
        setPersistScrollAdmin,
        setPersistScrollCandidates,
        setPersistScrollEdit,
        setPersistScrollEditItems,
        setPersistScrollResults,
        setPersistScrollVotes,
        setPersistTextDeadline,
        setPersistTextImage,
        setPersistTextName,
        setPersistTextQuantity,
        setPersistTextThumbnail,
        setPersistToggleAnonymous,
    };
};

/**
 * Export module
 * 
 */
export default usePersist;