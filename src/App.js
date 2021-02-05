import React, { Component } from 'react';
import './App.css';
import { Container} from 'semantic-ui-react';
import { Route, Redirect, Router} from 'react-router-dom';
import LoginComponent  from './components/login';
import { SignupComponent } from './components/signup';
import DashboardComponent from './components/dashboard';
import history from './services/history';
import UpdateResumeComponent from './components/update-resume';

export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Router history={history}>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login">
              <LoginComponent />
            </Route>
            <Route exact path="/register">
              <SignupComponent />
            </Route>
            <Route exact path="/dashboard">
              <DashboardComponent />
            </Route>
            <Route exact path="/update-resume">
              <UpdateResumeComponent />
            </Route>
          </Router>
        </Container>
      </div>
    );
  }
}
