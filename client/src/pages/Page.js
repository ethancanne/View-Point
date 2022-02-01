import React from "react";
import "./Page.scss";
import { useSelector } from "react-redux";
import TopBar from "../components/topBar/TopBar";

/**
 * A page wrapper that adds a top bar and styles the page.
 * @author Ethan Cannelongo
 * @date   01/30/2022
 */
const Page = props => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  return (
    <>
      <div className={isLoggedIn ? "page blur" : "page"}>
        {isLoggedIn && <TopBar />}
        {props.children}
      </div>
    </>
  );
};

export default Page;
