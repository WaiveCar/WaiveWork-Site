import React from 'react';
import Form from '../Form';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Signup({ loggedIn, signupFormPages, selectedSignupPage }) {
  return (
    <div>
      {!loggedIn ? (
        <div className="container">
          <Form
            fields={signupFormPages[selectedSignupPage].fields}
            formName={'authForm'}
            onSubmit={(form) => console.log('click')}
            submitName={signupFormPages[selectedSignupPage].submitName}
            formWidth={'60%'}
          />
        </div>
      ) : (
        <Redirect to={'/dashboard'} />
      )}
    </div>
  );
}

function mapDispatchToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapStateToProps(props) {
  return {};
}

export default connect(
  mapDispatchToProps,
  mapStateToProps,
)(Signup);
