import React from "react";
import "../core.scss";

import ButtonTypes from "./ButtonTypes.js";

/**
 * Used to render buttons. Depending on the type of button requested,
 * the button displayed will vary.
 * @param {String} props.type The type of button to render.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Button = props => {
  let buttonClassName;
  switch (props.type) {
    case ButtonTypes.Primary:
      buttonClassName = "button-primary";
      break;
    case ButtonTypes.Creation:
      buttonClassName = "button-creation";
      break;
    case ButtonTypes.Destructive:
      buttonClassName = "button-destructive";
      break;
    default:
      buttonClassName = "button-primary";
      break;
  }

  return (
    <button className={buttonClassName + " button"} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
