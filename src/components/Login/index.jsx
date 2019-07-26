import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../Form';
import './login.scss';

let fields = [
  {
    name: 'email',
    type: 'text',
    width: 12,
  },
  {
    name: 'password',
    type: 'password',
    width: 12,
  },
];

function Login(props) {
  return (
    <div className="container">
      <Form
        fields={fields}
        formName={'authForm'}
        onSubmit={(form) => console.log('submit', form)}
        submitName={'login'}
        formWidth={'60%'}
      />
    </div>
  );
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
