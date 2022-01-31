import React from "react";
import Validator from "../../../../server/Validator.js";

/**
 * Renders a text input.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const TextInput = props => {
  const typeIsDefined = Validator.isDefined(props.type);
  const type = typeIsDefined ? props.type : "text";

  return (
    <>
      <input
        className='input'
        value={props.value}
        onChange={props.onChange}
        type={type}
        {...props}
      />
    </>
  );
};

export default TextInput;
