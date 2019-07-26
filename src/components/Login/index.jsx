import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateForm } from "../../store/actions/userActions";
import Form from "../Form";

let fields = [
  {
    name: "email",
    type: "text",
    width: 3
  },
  {
    name: "password",
    type: "password",
    width: 3
  }
];

function Login(props) {
  return (
    <div>
      <Form fields={fields} formName={"authForm"} />
    </div>
  );
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
