import React, { useState } from "react";
import Page from "../Page";
import Button from "../../core/button/Button";
import ButtonTypes from "../../core/button/ButtonTypes";

//Import Redux
import { useSelector, useDispatch } from "react-redux";
import { showEditAccountPopup } from "../../state/actions";

const Account = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  return (
    <Page>
      {isLoggedIn ? (
        <div className='account-container'>
          <Button
            type={ButtonTypes.Primary}
            onClick={() => dispatch(showEditAccountPopup())}>
            Edit Account
          </Button>

          {Object.keys(user).map((info, i) => (
            <div className='info'>
              <h3 className='info-label'> {info}:</h3>
              <h2> {user[info]}</h2>
            </div>
          ))}
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </Page>
  );
};

export default Account;
