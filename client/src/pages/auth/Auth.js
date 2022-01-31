import React, { useState } from "react";
import Page from "../Page.js";

//IMPORT VIEWS
import LoginView from "../../views/loginView/LoginView";
import CreateAccountView from "../../views/createAccountView/CreateAccountView";
import views from "../../views/Views.js";

/**
 * The authentication page of the application. This is shown when the user has not logged in.
 * @param {String} props.authView The view that is supposed to be displayed on the auth page, defined in Views.js
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Auth = props => {
  const [view, setAuthView] = useState(views.auth.LOGIN);
  let authView = <></>;

  switch (view) {
    case views.auth.LOGIN:
      authView = <LoginView setAuthView={setAuthView} />;
      break;

    case views.auth.CREATE_ACCOUNT:
      authView = <CreateAccountView setAuthView={setAuthView} />;
      break;
  }
  return (
    <Page>
      <div className='auth-page'>
        <Page>{authView}</Page>
      </div>
    </Page>
  );
};

export default Auth;
