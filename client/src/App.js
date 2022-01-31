import "./App.scss";
import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

//Import Views
import Notification from "./views/notification/Notification";

//Import Redux
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "./state/actions";

//Import Pages
import Dashboard from "./pages/dashboard/Dashboard";
import AuthPage from "./pages/auth/Auth";

//Server Imports
import Routes from "../../server/routes/Routes.js";
import Validator from "../../server/Validator.js";

/**
 * This is the root presentational component that processes user authentication
 * and manages the display of the application"s pages.
 * @author Ethan Cannelongo
 * @date   1/30/2022
 */
const App = props => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const notificationIsShowing = useSelector(
    state => state.notificationReducer.isShowing
  );

  const dispatch = useDispatch();

  /**
   * Checks if the page has finished loaded and refreshes the authentication token
   * if the user is already logged in. Using an empty dependency array ensures
   * that this only runs on unmount.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  useEffect(() => {
    updateAuthenticationToken();
  }, []);

  /**
   * Updates the user's authentication token (with a new expiration date) whenever they * visit the application
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateAuthenticationToken = async () => {
    if (isLoggedIn) {
      //Set the token in the header
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");

      let response = undefined;
      try {
        response = await axios.get(Routes.User.UpdateAuthenticationToken);
      } catch (error) {
        console.log(error);
        //DISPATCH NOTIFICATION
      } finally {
        const responseIsDefined = Validator.isDefined(response);
        if (responseIsDefined) {
          const updateWasSuccessful = Validator.isUndefined(
            response.data.error
          );
          if (updateWasSuccessful) {
            //If there is no error
            const {
              authenticationToken,
              authenticationTokenExpirationDate,
              user,
            } = response.data;

            dispatch(
              signIn({
                authenticationToken,
                authenticationTokenExpirationDate,
                user,
              })
            );
          } else {
            dispatch(signOut());
            //Dispatch Notification
          }
        }
      }
    }
  };

  return (
    <Router>
      <Notification isShowing={notificationIsShowing} />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            {isLoggedIn ? <Redirect to='/dashboard' /> : <AuthPage />}
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
