import "./Dashboard.scss";
import React, { useState } from "react";
import Page from "../Page";
import TopBar from "../../components/topBar/TopBar";

//Import Redux
import { useSelector, useDispatch } from "react-redux";

/**
 * The main welcome page of the application. This is shown immediately when the user has logged in.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Dashboard = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const { firstName, lastName } = useSelector(state => state.userReducer.user);

  return (
    <Page>
      {isLoggedIn ? (
        <div className='dashboard'>
          <h1>Hello</h1>
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
    </Page>
  );
};

export default Dashboard;
