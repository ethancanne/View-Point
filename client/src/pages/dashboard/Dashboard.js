import React, { useState } from "react";
import Page from "../Page";
import Button from "../../core/button/Button";

//Import Redux
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../state/actions";

const Dashboard = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <Page>
      {isLoggedIn ? (
        <div>
          <Button onClick={() => dispatch(signOut())}>Log Out</Button>
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
    </Page>
  );
};

export default Dashboard;
