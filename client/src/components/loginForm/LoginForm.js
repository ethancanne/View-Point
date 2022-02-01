import React from "react";

import Button from "../../core/button/Button";
import ButtonTypes from "../../core/button/ButtonTypes";
import Form from "../../core/form/Form";
import InputField from "../../core/inputField/InputField";
import Label from "../../core/label/Label";
import TextInput from "../../core/inputs/TextInput";

/**
 * Renders a login form.
 * @param {String} props.email The email address in the form.
 * @param {String} props.password The password in the form.
 * @param {function} props.updateEmailField The function used to update the email address.
 * @param {function} props.updatePasswordField The function used to update the password.
 * @param {function} props.submitLogin Used to submit the login form.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const LoginForm = props => {
  return (
    <div className='login-form'>
      <Form onSubmit={props.submitLogin}>
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
        <Button type={ButtonTypes.Creation} style={{ width: "97%" }}>
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
