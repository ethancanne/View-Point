import React from "react";

import Button from "../../core/button/Button.js";
import ButtonTypes from "../../core/button/ButtonTypes";

import Form from "../../core/form/Form";
import InputField from "../../core/inputField/InputField";
import Label from "../../core/label/Label";
import TextInput from "../../core/inputs/TextInput";

/**
 * Renders an edit account form.
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
        <Button type={ButtonTypes.Creation}>Update</Button>
      </Form>
      <Button
        type={ButtonTypes.Creation}
        onClick={() => props.submitDeleteAccount()}>
        Delete Account
      </Button>
    </div>
  );
};

export default EditAccountForm;
