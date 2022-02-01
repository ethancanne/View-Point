import { userConstants } from "../constants/Constants";

// Load the user into the inital state if already logged in (present in local storage)
let user = JSON.parse(localStorage.getItem("user"));

const jwtExpirationDate = new Date(
  localStorage.getItem("authenticationTokenExpirationDate")
);

//Check if the authentication token is still valid
const userIsLoggedIn = Date.now() < jwtExpirationDate;

var initialState = {};
if (userIsLoggedIn && user) initialState = { isLoggedIn: true, user };
else initialState = { isLoggedIn: false, user: {} };
/**
 * This is the reducer for all actions relating to authentication
 * @param  {object} state The inital state of the reducer
 * @param  {String} action The action
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const userReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    //Sign the user in and save the user to local storage
    case userConstants.SIGN_IN:
      localStorage.setItem("token", action.payload.authenticationToken);
      localStorage.setItem(
        "authenticationTokenExpirationDate",
        action.payload.authenticationTokenExpirationDate
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      //Return the state contianing the user
      return { ...state, user: action.payload.user, isLoggedIn: true };

    case userConstants.SIGN_OUT:
      localStorage.clear();
      return { ...state, user: {}, isLoggedIn: false };

    case userConstants.EDIT_ACCOUNT:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user };

    default:
      return state;
  }
};

export default userReducer;
