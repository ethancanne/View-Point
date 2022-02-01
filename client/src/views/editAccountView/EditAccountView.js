import "./EditAccountView.scss";
import React, { useState } from "react";
import axios from "axios";

//Core
import Button from "../../core/button/Button";
import ButtonTypes from "../../core/button/ButtonTypes";

//Components
import EditAccountForm from "../../components/editAccountForm/EditAccountForm";

//Server
import Routes from "../../../../server/routes/Routes.js";
import Validator from "../../../../server/Validator";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  editAccount,
  showErrorNotification,
  closePopup,
  signOut,
  showSuccessNotification,
} from "../../state/actions";

/**
 * This view presents the edit account form on the home page and sends the edit account
 * request to the server
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const EditAccountView = props => {
  const BLANK = "";
  const user = useSelector(state => state.userReducer.user);

  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [zipCode, setZipCode] = useState(user.zipCode);

  const dispatch = useDispatch();

  /**
   * Submits the delete account request to the server.
   * @author Ethan Cannelongo
   * @date   01/31/2022
   */
  const submitDeleteAccount = async () => {
    // SUBMIT THE EDIT ACCOUNT REQUEST.
    let response;
    try {
      //Set the Authorization Token in the header of the request
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");

      //Make the request
      response = await axios.delete(Routes.User.LoggedInUser);
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
        const deleteAccountWasSuccessful = Validator.isUndefined(
          response.data.error
        );
        if (deleteAccountWasSuccessful) {
          dispatch(closePopup());
          dispatch(signOut());
          dispatch(showSuccessNotification(response.data.message));
        } else {
          dispatch(showErrorNotification(response.data.error));
          console.log(response.data.error);
        }
      } else {
        dispatch(
          showErrorNotification(
            "There was an error connecting to the server.  Please try again later"
          )
        );
      }
    }
  };

  /**
   * Submits the edit account request to the server for verification.
   * @param {Event} event The form submission event that triggers the login.
   * @author Ethan Cannelongo
   * @date   01/31/2022
   */
  const submitEditAccount = async event => {
    dispatch(closePopup());

    // PREVENT THE DEFAULT FORM SUBMISSION BEHAVIOR.
    event.preventDefault();
    event.stopPropagation();

    // SUBMIT THE EDIT ACCOUNT REQUEST.
    let response;
    try {
      //Set the Authorization Token in the header of the request
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");

      //Make the request
      response = await axios.patch(Routes.User.LoggedInUser, {
        email,
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
        const editAccountWasSuccessful = Validator.isUndefined(
          response.data.error
        );
        if (editAccountWasSuccessful) {
          const { user } = response.data;
          dispatch(
            editAccount({
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
            "There was an error connecting to the server.  Please try again later"
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

  return (
    <div className='edit-account-view'>
      <EditAccountForm
        email={email}
        firstName={firstName}
        lastName={lastName}
        address={address}
        city={city}
        state={state}
        zipCode={zipCode}
        updateEmailField={updateEmailField}
        updateFirstNameField={updateFirstNameField}
        updateLastNameField={updateLastNameField}
        updateAddressField={updateAddressField}
        updateCityField={updateCityField}
        updateStateField={updateStateField}
        updateZipCodeField={updateZipCodeField}
        submitEditAccount={submitEditAccount}
      />
      <Button
        type={ButtonTypes.Destructive}
        onClick={() => submitDeleteAccount()}
        style={{ width: "96%" }}>
        Delete Account
      </Button>
    </div>
  );
};

export default EditAccountView;
