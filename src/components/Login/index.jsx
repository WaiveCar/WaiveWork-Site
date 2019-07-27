import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import Form from '../Form';
import './login.scss';
import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

let fields = [
  {
    name: 'email',
    type: 'text',
    width: 12,
    svg: Envelope,
  },
  {
    name: 'password',
    type: 'password',
    width: 12,
    svg: Key,
  },
];

function Login(props) {
  const { login } = props;
  return (
    <div className="container">
      <Form
        fields={fields}
        formName={'authForm'}
        onSubmit={(form) => login(form.email, form.password)}
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

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
