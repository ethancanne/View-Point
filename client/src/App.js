import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

/**
 * This is the root presentational component that processes user authentication
 * and manages the display of the application"s pages.
 * @author Ethan Cannelongo
 * @date   1/30/2022
 */
const App = props => {
  return (
    <Router>
      <div className='container'>
        <h1>This is Ethan</h1>
        <Switch>
          <Route exact path='/'></Route>
          <Route path='/feed'></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
