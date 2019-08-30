import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import Form from '../Form';
import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

function Login(props) {
  const { login, loggedIn, loginFormFields } = props;
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
          />
        </div>
      ) : (
        <Redirect to={'/dashboard'} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
