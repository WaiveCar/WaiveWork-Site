import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthorizedRoute from '../AuthorizedRoute';
import Dashboard from '../Dashboard';
import routes from './routeList';

function Routes({ authChecked }) {
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
      <AuthorizedRoute path={'/*'} component={Dashboard} />
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
