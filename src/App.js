import React from 'react';
import './App.css';
import './cssFile/Style.css';
import Home from './component/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Employee } from './component/Employee';
import { Navigation } from './component/Navigation';
import ValidatedLoginForm from './component/ValidatedLoginForm';
import { SearchByName } from './component/SearchByName';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="mt-5 d-flex justify-content-center">
          React Js with Web Api Demo</h3>
        <h5 className="mt-5 d-flex justify-content-center">
          Employee Managment Portal</h5>
          <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/validation' component={ValidatedLoginForm}  />
          <Route path='/employee' component={Employee} />
          <Route path='/SearchByName' component={SearchByName} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
