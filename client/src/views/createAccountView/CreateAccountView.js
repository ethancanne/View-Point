import React, { useState } from "react";
import axios from "axios";

//Core
import ButtonTypes from "../../core/button/ButtonTypes.js";
import Button from "../../core/button/Button.js";

//Views
import views from "../Views.js";
import AuthView from "../authView/AuthView";

//Components
import CreateAccountForm from "../../components/createAccountForm/CreateAccountForm";

//Server
import Routes from "../../../../server/routes/Routes.js";
import Validator from "../../../../server/Validator";

//Redux
import { useDispatch } from "react-redux";
import {
  signIn,
  showErrorNotification,
  showSuccessNotification,
} from "../../state/actions";

/**
 * This view presents the create account form on the home page
 * @param {function} setAuthView Used to set the view of this page, if the user presses the log in button
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const CreateAccountView = props => {
  const BLANK = "";
  const [email, setEmail] = useState(BLANK);
  const [password, setPassword] = useState(BLANK);
  const [confirmPassword, setConfirmPassword] = useState(BLANK);
  const [firstName, setFirstName] = useState(BLANK);
  const [lastName, setLastName] = useState(BLANK);
  const [address, setAddress] = useState(BLANK);
  const [city, setCity] = useState(BLANK);
  const [state, setState] = useState(BLANK);
  const [zipCode, setZipCode] = useState(BLANK);

  const dispatch = useDispatch();

  /**
   * Submits the create account request to the server for verification.
   * @param {Event} event The form submission event that triggers the login.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const submitAccountCreation = async event => {
    // PREVENT THE DEFAULT FORM SUBMISSION BEHAVIOR.
    event.preventDefault();
    event.stopPropagation();

    // FIRST, COMPARE THE PASSWORD AND CONFIRM PASSWORD FIELDS
    if (password !== confirmPassword) {
      dispatch(showErrorNotification("Passwords don't match!"));
      return;
    }

    // SUBMIT THE CREATE ACCOUNT REQUEST. (Test in Postman)
    let response;
    try {
      response = await axios.post(Routes.User.CreateAccount, {
        email,
        password,
        password_confirmation: confirmPassword,
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
      });
    } catch (error) {
      console.log(error);
      dispatch(
        showErrorNotification(
          "There was a problem connecting to the server:" + error
        )
      );
    } finally {
      const responseIsDefined = Validator.isDefined(response.data);
      if (responseIsDefined) {
        // If account creation was successful, configure the client.
        const accountCreationWasSuccessful = Validator.isUndefined(
          response.data.error
        );
        if (accountCreationWasSuccessful) {
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
          dispatch(showSuccessNotification(response.data.message));
        } else {
          dispatch(showErrorNotification(response.data.error));
          console.log(response.data.error);
        }
      } else {
        dispatch(
          showErrorNotification(
            "There was an error with the server, please try again later."
          )
        );
      }
    }
  };

  /**
   * Used to update the email field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/22
   */
  const updateEmailField = event => {
    setEmail(event.target.value);
  };

  /**
   * Used to update the password field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/22
   */
  const updatePasswordField = event => {
    setPassword(event.target.value);
  };

  /**
   * Used to update the confirm password field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateConfirmPasswordField = event => {
    setConfirmPassword(event.target.value);
  };

  /**
   * Used to update the first name field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateFirstNameField = event => {
    setFirstName(event.target.value);
  };

  /**
   * Used to update the last name field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateLastNameField = event => {
    setLastName(event.target.value);
  };

  /**
   * Used to update the address field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateAddressField = event => {
    setAddress(event.target.value);
  };

  /**
   * Used to update the city field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateCityField = event => {
    setCity(event.target.value);
  };

  /**
   * Used to update the state field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateStateField = event => {
    setState(event.target.value);
  };

  /**
   * Used to update the zip code field in the create account form.
   * @param {Event} event The change event to update the field with.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const updateZipCodeField = event => {
    setZipCode(event.target.value);
  };

  /**
   * Sets the home view to the sign in form.
   * @author Ethan Cannelongo
   * @date   01/30/2022
   */
  const signInClicked = () => {
    props.setAuthView(views.auth.LOGIN);
  };

  return (
    <AuthView>
      <p>Create Your Account</p>
      <CreateAccountForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        firstName={firstName}
        lastName={lastName}
        address={address}
        city={city}
        state={state}
        zipCode={zipCode}
        updateEmailField={updateEmailField}
        updatePasswordField={updatePasswordField}
        updateConfirmPasswordField={updateConfirmPasswordField}
        updateFirstNameField={updateFirstNameField}
        updateLastNameField={updateLastNameField}
        updateAddressField={updateAddressField}
        updateCityField={updateCityField}
        updateStateField={updateStateField}
        updateZipCodeField={updateZipCodeField}
        submitAccountCreation={submitAccountCreation}
      />

      <div className='other-options'>
        <p>Already have an account?</p>
        <Button
          type={ButtonTypes.Primary}
          onClick={signInClicked}
          style={{ width: "97%" }}>
          Sign In
        </Button>
      </div>
    </AuthView>
  );
};

export default CreateAccountView;
