import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function RequireAuth(props) {
  const { loggedIn, path, component } = props;
  return loggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={'/welcome'} />
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
)(RequireAuth);
