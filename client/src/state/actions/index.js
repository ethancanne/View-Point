import { userConstants, notificationConstants } from "../constants/Constants";

//USER REDUCERS
export const signIn = user => {
  return {
    type: userConstants.SIGN_IN,
    payload: user,
  };
};
export const signOut = () => {
  return {
    type: userConstants.SIGN_OUT,
  };
};

//NOTIFICATION REDUCERS
export const showErrorNotification = message => {
  return {
    type: notificationConstants.SHOW_ERROR_NOTIFICATION,
    payload: { message },
  };
};

export const hideNotification = () => {
  return {
    type: notificationConstants.HIDE_NOTIFICATION,
  };
};
