import React, { useState } from "react";
import "./AuthView.scss";

/**
 * This view provides the styling and format of an authentication form
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const AuthView = props => {
  return (
    <div className='auth-view'>
      <h1>View Point</h1>
      {props.children}
    </div>
  );
};

export default AuthView;
