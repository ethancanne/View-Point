import React from "react";
import "../core.scss";
/**
 * Renders an input field.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const InputField = props => {
  return (
    <fieldset className='input-field' {...props}>
      {props.children}
    </fieldset>
  );
};

export default InputField;
