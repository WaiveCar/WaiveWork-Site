import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function Login() {
  return <div>Login</div>;
}

function mapDispatchToProps(props) {
  return {};
}

function mapStateToProps(props) {
  return {};
}

export default connect(
  mapDispatchToProps,
  mapStateToProps,
)(Login);
