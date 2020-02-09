import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function RequireAuth(props) {
  const { loggedIn, path, component } = props;
  if (loggedIn) {
    return <Route path={path} component={component} />;
  } else {
    window.location.href = 'https://waivework.com/welcome';
  }
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
