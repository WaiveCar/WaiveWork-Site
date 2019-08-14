import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyAuth } from '../../store/actions/userActions';
import AuthorizedRoute from '../AuthorizedRoute';
import routes from './routeList';

function Routes({ authChecked, loggedIn }) {
  return (
    <Switch>
      {authChecked &&
        routes.map((route) => {
          if (route.requireAuth) {
            return (
              <AuthorizedRoute
                key={route.name}
                path={route.path}
                component={route.component}
                loggedIn={loggedIn}
              />
            );
          }
          return (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
            />
          );
        })}
    </Switch>
  );
}
function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
