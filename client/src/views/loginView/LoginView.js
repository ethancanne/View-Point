import axios from "axios";
import React, { useState } from "react";

//Core
import ButtonTypes from "../../core/button/ButtonTypes.js";
import Button from "../../core/button/Button.js";

//Components
import LoginForm from "../../components/loginForm/LoginForm.js";

//Views
import Views from "../Views.js";
import AuthView from "../authView/AuthView";

//Server
import Routes from "../../../../server/routes/Routes.js";
import Validator from "../../../../server/Validator.js";

//Redux
import { useDispatch } from "react-redux";
import { signIn, signOut, showErrorNotification } from "../../state/actions";
/**
 * Used to display the login form and log the user in.
 * @param {function} clientSideLogin Used to log the user in from the client-side perspective.
 * @param {function} clientSideLogout Used to log the user out from the client-side perspective.
 * @param {function} setHomeView Used to set the view of the home page, if the user presses the create account button
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const LoginView = props => {
  const BLANK = "";
  const [email, setEmail] = useState(BLANK);
  const [password, setPassword] = useState(BLANK);
  const dispatch = useDispatch();

  /**
   * Submits the login request to the server for verification.
   * @param {Event} event The form submission event that triggers the login.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const submitLogin = async event => {
    // PREVENT THE DEFAULT FORM SUBMISSION BEHAVIOR.
    event.preventDefault();
    event.stopPropagation();

    console.log(email, password);
    // SUBMIT THE LOGIN REQUEST.
    let response = undefined;
    try {
      response = await axios.post(Routes.User.Login, {
        email,
        password,
      });
    } catch (error) {
      dispatch(
        showErrorNotification(
          "There was a problem connecting to the server:" + error
        )
      );
    } finally {
      const responseIsDefined = Validator.isDefined(response);
      if (responseIsDefined) {
        // IF THE USER HAS LOGGED IN, CONFIGURE THE CLIENT TO REFLECT THIS.
        const loginWasSuccessful = Validator.isUndefined(response.data.error);
        if (loginWasSuccessful) {
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
          dispatch(showErrorNotification(response.data.error));
          dispatch(signOut);
        }
      } else {
        dispatch(showErrorNotification("There was an error with the server"));
      }
    }
  };

  /**
   * Used to update the email field in the login form.
   * @param {Event} e The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateEmailField = e => {
    setEmail(e.target.value);
  };

  /**
   * Used to update the password field in the login form.
   * @param {Event} e The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updatePasswordField = e => {
    setPassword(e.target.value);
  };

  /**
   * Sets the home view to the sign up form.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const signUpClicked = e => {
    props.setAuthView(Views.Auth.CreateAccount);
  };

  return (
    <AuthView>
      <LoginForm
        email={email}
        password={password}
        updateEmailField={updateEmailField}
        updatePasswordField={updatePasswordField}
        submitLogin={submitLogin}
      />

      <div className='other-options'>
        <p>Don't have an account?</p>
        <Button type={ButtonTypes.Creation} onClick={signUpClicked}>
          Sign Up
        </Button>
      </div>
    </AuthView>
  );
};

export default LoginView;
