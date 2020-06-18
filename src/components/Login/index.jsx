import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Form from '../Form';
import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

function Login(props) {
  const { login, loggedIn, loginFormFields, location, history } = props;
  const params = new URL(document.location).searchParams;
  return (
    <div>
      {!loggedIn ? (
        <div className="container">
          <Form
            fields={loginFormFields}
            title={'Login'}
            formName={'authForm'}
            onSubmit={(form) => login(form.email, form.password)}
            submitName={'login'}
            formWidth={'60%'}
            clearOnSubmit
          />
          <div className="text-center mt-4"></div>
        </div>
      ) : (
        <Redirect to={params.get('new') ? '/wizard' : '/dashboard'} />
      )}
    </div>
  );
}

function mapStateToProps({ userReducer, formReducer }) {
  return {
    ...userReducer,
    ...formReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
