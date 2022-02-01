import {
  userConstants,
  notificationConstants,
  popupConstants,
} from "../constants/Constants";

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
export const editAccount = user => {
  return {
    type: userConstants.EDIT_ACCOUNT,
    payload: user,
  };
};

//NOTIFICATION REDUCERS
export const showErrorNotification = message => {
  return {
    type: notificationConstants.SHOW_ERROR_NOTIFICATION,
    payload: { message },
  };
};

export const showSuccessNotification = message => {
  return {
    type: notificationConstants.SHOW_SUCCESS_NOTIFICATION,
    payload: { message },
  };
};

export const hideNotification = () => {
  return {
    type: notificationConstants.HIDE_NOTIFICATION,
  };
};

//POPUP REDUCER
export const showEditAccountPopup = () => {
  return {
    type: popupConstants.SHOW_EDIT_ACCOUNT_POPUP,
  };
};

export const closePopup = () => {
  return {
    type: popupConstants.CLOSE_POPUP,
  };
};
