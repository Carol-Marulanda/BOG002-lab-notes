import React from 'react';
import Landing from './components/Landing'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import {
  BrowserRouter as Router,
  Switch,
  Route, } from "react-router-dom";
//import Landing from './components/landing';

import './App.css';

function App() {
  return (
    <Router>
      <div className='container'>
      <div>
        <Landing />
      </div>
      <hr/>
      <Switch>
        <Route path="/register">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/timeline">
          <LogIn />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;