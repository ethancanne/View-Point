import "./TopBar.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

//Core
import Button from "../../core/button/Button";
import ButtonTypes from "../../core/button/ButtonTypes";

//Redux
import { useDispatch } from "react-redux";
import { signOut } from "../../state/actions";

/**
 * Renders a top bar component to be displayed on each page when logged in.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const TopBar = () => {
  const dispatch = useDispatch();

  return (
    <div className='top-bar'>
      <div className='wrapper'>
        <div className='left'>
          <Link to='/'>
            <h1>View Point</h1>
          </Link>
        </div>

        <div className='right'>
          <Link to='/account'>
            <Button type={ButtonTypes.Primary}>Account</Button>
          </Link>
          <Button
            type={ButtonTypes.Destructive}
            onClick={() => dispatch(signOut())}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
