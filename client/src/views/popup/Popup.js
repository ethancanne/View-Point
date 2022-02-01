import "./Popup.scss";
import React, { useState } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../../state/actions";

//Views
import EditAccountView from "../editAccountView/EditAccountView";
import popupTypes from "./PopupTypes";

/**
 * This is the presentational component that presents different popup views according to the
 * view property in the popupReducer.
 * @param {boolean} isShowing true if the popup is currently showing on the screen and false otherwise
 * @param {JSX} children content of the popup
 * @author Ethan Cannelongo
 * @date   01/31/2022
 */
const Popup = props => {
  const view = useSelector(state => state.popupReducer.view);
  const dispatch = useDispatch();
  let popupView = <></>;

  switch (view) {
    case popupTypes.EDIT_ACCOUNT:
      popupView = <EditAccountView />;
      break;
  }

  return (
    <div className='popup-wrapper'>
      <div
        className={"background " + (props.isShowing ? "active" : "")}
        onClick={() => dispatch(closePopup())}></div>
      <div className={"popup " + (props.isShowing ? "active" : "")}>
        <div className='popup-top'>
          <h1>{view}</h1>
          <button onClick={() => dispatch(closePopup())}>X</button>
        </div>
        <div className='popup-body'>
          {!props.children ? popupView : props.children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
