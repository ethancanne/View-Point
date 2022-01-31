import React from "react";

/**
 * Renders a label.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Label = props => {
  return (
    <label className='label' {...props}>
      {props.children}
    </label>
  );
};

export default Label;
