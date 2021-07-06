import React from 'react';
import Nav from './components/Nav'
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
        <Nav />
      </div>
      <hr/>
      <Switch>
      <Route path="/" exact>
          inicio...
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