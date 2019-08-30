import React from 'react';
import Form from '../Form';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSignupPage, signup } from '../../store/actions/userActions';
import './signup.scss';

function Signup({
  loggedIn,
  signupFormPages,
  selectedSignupPage,
  changeSignupPage,
  signup,
  authForm,
  history,
}) {
  const onSubmit =
    selectedSignupPage !== signupFormPages.length - 1
      ? changeSignupPage.bind(null, selectedSignupPage + 1)
      : signup;
  const altAction =
    selectedSignupPage !== 0 &&
    changeSignupPage.bind(null, selectedSignupPage - 1);
  return (
    <div>
      {!loggedIn ? (
        <div className="container">
          <Form
            fields={signupFormPages[selectedSignupPage].fields}
            title={signupFormPages[selectedSignupPage].title}
            body={signupFormPages[selectedSignupPage].body}
            formName={'authForm'}
            onSubmit={(form) => onSubmit(authForm, history)}
            altAction={altAction ? () => altAction() : null}
            submitName={signupFormPages[selectedSignupPage].submitName}
            altActionName={signupFormPages[selectedSignupPage].altActionName}
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
  return bindActionCreators({ changeSignupPage, signup }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Signup),
);
