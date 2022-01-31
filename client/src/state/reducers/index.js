import { combineReducers } from "redux";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";

/**
 * This function combines all the reducers so they all can be referenced from this file
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const allReducers = combineReducers({
  userReducer,
  notificationReducer,
});

export default allReducers;
