import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import notificationReducer from "./NotificationReducer";
import popupReducer from "./PopupReducer";

/**
 * This function combines all the reducers so they all can be referenced from this file
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const allReducers = combineReducers({
  userReducer,
  notificationReducer,
  popupReducer,
});

export default allReducers;
