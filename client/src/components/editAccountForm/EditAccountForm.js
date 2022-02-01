import React from "react";

import Button from "../../core/button/Button.js";
import ButtonTypes from "../../core/button/ButtonTypes";

import Form from "../../core/form/Form";
import InputField from "../../core/inputField/InputField";
import Label from "../../core/label/Label";
import TextInput from "../../core/inputs/TextInput";

/**
 * Renders an edit account form.
 * * @param {String} props.email The email address in the form.
 * @param {String} props.firstName The value of the first name field in the form.
 * @param {String} props.lastName The value of the last namefield in the form.
 * @param {String} props.address The value of the address field in the form.
 * @param {String} props.city The value of the city field in the form.
 * @param {String} props.state The value of the state field in the form.
 * @param {String} props.zipCode The value of the zipCode field in the form.
 * @param {function} props.updateEmailField The function used to update the email address.
 * @param {function} props.updatePasswordField The function used to update the password.
 * @param {function} props.updateConfirmPasswordField The function used to update the confirm password.
 * @param {function} props.updateFirstName The function used to update the First Name.
 * @param {function} props.updateLastName The function used to update the Last Name.
 * @param {function} props.updateAddress The function used to update the Address.
 * @param {function} props.updateCity The function used to update the City.
 * @param {function} props.updateState The function used to update the State.
 * @param {function} props.updateZipCode The function used to update the Zip Code.
 * @param {function} props.submitEditAccount Used to submit the Edit Account form.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const EditAccountForm = props => {
  return (
    <div className='edit-account-form'>
      <Form onSubmit={props.submitEditAccount}>
        <InputField>
          <Label>Email</Label>
          <TextInput
            value={props.email}
            onChange={props.updateEmailField}
            type='email'
          />
        </InputField>
        <div className='side-by-side'>
          <InputField>
            <Label>First Name</Label>
            <TextInput
              value={props.firstName}
              onChange={props.updateFirstNameField}
            />
          </InputField>
          <InputField>
            <Label>Last Name</Label>
            <TextInput
              value={props.lastName}
              onChange={props.updateLastNameField}
            />
          </InputField>
        </div>
        <InputField>
          <Label>Address</Label>
          <TextInput
            value={props.address}
            onChange={props.updateAddressField}
          />
        </InputField>
        <div className='side-by-side'>
          <InputField>
            <Label>City</Label>
            <TextInput value={props.city} onChange={props.updateCityField} />
          </InputField>
          <InputField>
            <Label>State</Label>
            <TextInput value={props.state} onChange={props.updateStateField} />
          </InputField>
          <InputField>
            <Label>Zip Code</Label>
            <TextInput
              value={props.zipCode}
              onChange={props.updateZipCodeField}
            />
          </InputField>
        </div>
        <Button type={ButtonTypes.Creation} style={{ width: "96%" }}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditAccountForm;
