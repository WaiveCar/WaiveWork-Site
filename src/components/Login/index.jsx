import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../Form';

let fields = [
  {
    name: 'email',
    type: 'text',
    width: 6,
  },
  {
    name: 'password',
    type: 'password',
    width: 6,
  },
];

function Login(props) {
  return (
    <div>
      <Form
        fields={fields}
        formName={'authForm'}
        onSubmit={(form) => console.log('submit', form)}
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
