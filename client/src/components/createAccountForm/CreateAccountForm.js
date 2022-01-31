import React from "react";

import Button from "../../core/button/Button.js";
import ButtonTypes from "../../core/button/ButtonTypes";

import Form from "../../core/form/Form";
import InputField from "../../core/inputField/InputField";
import Label from "../../core/label/Label";
import TextInput from "../../core/inputs/TextInput";

/**
 * Renders a create account form.
 * @param {String} props.email The email address in the form.
 * @param {String} props.password The password in the form.
 * @param {String} props.confirmPassword The value of the confirm password field in the form.
 * @param {function} props.submitAccountCreation Used to submit the AccountCreation form.
 * @param {function} props.updateEmailField The function used to update the email address.
 * @param {function} props.updatePasswordField The function used to update the password.
 * @param {function} props.updateConfirmPasswordField The function used to update the confirm password.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const CreateAccountForm = props => {
  return (
    <div className='create-account-form'>
      <Form onSubmit={props.submitAccountCreation}>
        <InputField>
          <Label>Email</Label>
          <TextInput
            value={props.email}
            onChange={props.updateEmailField}
            type='email'
          />
        </InputField>
        <InputField>
          <Label>Password</Label>
          <TextInput
            value={props.password}
            onChange={props.updatePasswordField}
            type='password'
          />
        </InputField>
        <InputField>
          <Label>Confirm Password</Label>
          <TextInput
            value={props.confirmPassword}
            onChange={props.updateConfirmPasswordField}
            type='password'
          />
        </InputField>
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
        <InputField>
          <Label>Address</Label>
          <TextInput
            value={props.address}
            onChange={props.updateAddressField}
          />
        </InputField>
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
        <Button type={ButtonTypes.Creation}>Next</Button>
      </Form>
    </div>
  );
};

export default CreateAccountForm;
