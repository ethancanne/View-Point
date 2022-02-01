import "./Account.scss";
import React, { useState } from "react";
import Page from "../Page";
import Button from "../../core/button/Button";
import ButtonTypes from "../../core/button/ButtonTypes";

//Import Redux
import { useSelector, useDispatch } from "react-redux";
import { showEditAccountPopup } from "../../state/actions";

/**
 * A page that displays a logged in user's account details and gives them the ability to edit
 * and delete their account
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Account = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  return (
    <Page>
      {isLoggedIn ? (
        <div className='account-page'>
          <Button
            type={ButtonTypes.Primary}
            onClick={() => dispatch(showEditAccountPopup())}
            style={{ width: "25%" }}>
            Edit Account
          </Button>
          <div className='info-container'>
            {Object.keys(user).map((info, i) => (
              <div className='info'>
                <h3 className='info-label'> {info}:</h3>
                <h2> {user[info]}</h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </Page>
  );
};

export default Account;
