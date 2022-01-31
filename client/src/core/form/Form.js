import React from "react";

/**
 * Renders a form.
 * @author Ethan Cannelongo
 * @date   10/21/2021
 */
const Form = props => {
  return (
    <form className='form' {...props}>
      {props.children}
    </form>
  );
};

export default Form;
