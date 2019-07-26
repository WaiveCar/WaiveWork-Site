import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateForm } from "../../store/actions/userActions";

function Login(props) {
  const { fields, formName, updateForm } = props;
  const currentForm = props[formName];
  return (
    <div>
      {fields.map((field, i) => (
        <input
          key={i}
          value={currentForm[field.name]}
          type={field.type}
          onChange={e => updateForm(formName, field.name, e.target.value)}
        />
      ))}
    </div>
  );
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: bindActionCreators(updateForm, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
