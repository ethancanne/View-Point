import { popupConstants } from "../constants/Constants";
import popupTypes from "../../views/popup/PopupTypes.js";
/**
 * This is the reducer for all actions relating to popus
 * @param  {object} state The inital state of the reducer
 * @param  {String} action The action
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const popupReducer = (state = { view: "", isShowing: false }, action) => {
  switch (action.type) {
    case popupConstants.SHOW_EDIT_ACCOUNT_POPUP:
      return { ...state, view: popupTypes.EDIT_ACCOUNT, isShowing: true };
    case popupConstants.CLOSE_POPUP:
      return { ...state, isShowing: false };

    default:
      return state;
  }
};

export default popupReducer;
