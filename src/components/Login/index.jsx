import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateForm } from "../../store/actions/userActions";

function Login(props) {
  return <div>Login</div>;
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
