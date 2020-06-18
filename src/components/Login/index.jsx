import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login, getSigninOrg } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Form from '../Form';
import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

function Login(props) {
  const {
    login,
    loggedIn,
    loginFormFields,
    location,
    history,
    match,
    getSigninOrg,
    signinOrganization,
  } = props;
  const query = new URL(document.location).searchParams;
  const { organizationName } = match.params;
  useEffect(() => {
    if (organizationName) {
      getSigninOrg(organizationName);
    }
  }, []);
  return (
    <div>
      {!loggedIn ? (
        <div className="container">
          {signinOrganization && signinOrganization.logo && (
            <div className="form-holder mt-4">
              <div className="d-flex justify-content-center row">
                <img
                  className="col-3"
                  src={`http://waivecar-prod.s3.amazonaws.com/${signinOrganization.logo.path}`}
                />
              </div>
            </div>
          )}
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
        <Redirect to={query.get('new') ? '/wizard' : '/dashboard'} />
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
  return bindActionCreators({ login, getSigninOrg }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
