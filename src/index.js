import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Redirect, Router, Route, browserHistory} from 'react-router';
import Base from './base';
import LayoutActions from './actions/layout-actions';
import UserActions from './actions/user-actions';

import Home from './app/home';
import Login from './app/login';
import Signup from './app/signup';
import Forgot from './app/forgot';
import Reset from './app/reset';
import Project from './app/project';

import Create from './app/create';
import Edit from './app/edit';
import Profile from './app/profile';

import './index.styl';

const currUser = getCurrentUser();
currUser.then(user => {
  return UserActions.updateUser(user);
}, reason => {
  console.warn('Cannot get user:', reason);
});

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const offAuth = Base.onAuth(user => {
      offAuth();
      if (user) {
        resolve(user);
      } else {
        reject("User not available to authenticate.");
      }
    });
  });
}

function isLoggedIn(nextState, replace, callback) {
  const currUser = getCurrentUser();
  currUser.then(user => {
    callback();
  }, reason => {
    replace('/signup');
    callback();
  });
}

function logout(nextState, replace, callback) {
  if (Base.unauth()) {
    LayoutActions.updateLayout({
      showMenu: false
    });
    UserActions.updateUser(null);
    replace('/');
    callback();
  }
}

function isProject(nextState, replace, callback) {
  const pid = nextState.params.pid;
  const databaseRef = Base.database().ref(`projects/${pid}`);
  databaseRef.once('value').then((snapshot) => {
    const val = snapshot.val();
    if (!val) {
      replace('/');
    }
    callback();
  });
}

ReactDOM.render(
  <Router history={browserHistory}>

    <Route path="/">
      <IndexRoute component={Home}/>
      <Route path="/">
        <Route path="login" component={Login}/>
        <Route path="signup" component={Signup}/>
        <Route path="forgot" component={Forgot}/>
        <Route path="reset" component={Reset}/>
        <Route path="logout" onEnter={logout}/>
        <Route path="profile" component={Profile} onEnter={isLoggedIn}/>
        <Route path="create" component={Create} onEnter={isLoggedIn}/>
        <Route path=":pid" component={Project} onEnter={isProject}/>
      </Route>
    </Route>

    <Route path="edit" onEnter={isLoggedIn}>
      <Route path=":pid" component={Edit} onEnter={isProject}/>
    </Route>

    <Redirect from="*" to="/"/>
  </Router>,
  document.getElementById('root')
);
