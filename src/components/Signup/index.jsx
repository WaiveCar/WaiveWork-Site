import React, { useState, useEffect } from 'react';
import Form from '../Form';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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
  const ref = React.createRef();
  function handlePageChange() {
    let form = ref.current.firstChild;
    form.classList.remove('was-validated');
    form.querySelectorAll('input').forEach((one) => {
      if (!one.value) {
        one.classList.remove('is-valid');
        one.parentNode.classList.remove('was-validated');
        one.classList.remove('input-focus');
        one.nextSibling.classList.remove('display-block');
        one.nextSibling.nextSibling.classList.remove('display-block');
      } else {
        one.classList.add('input-focus');
        // All values on a previously completed page should be filled in correctly, so no need to do this to both siblings
        if (one.nextSibling.nextSibling) {
          one.nextSibling.nextSibling.classList.add('display-block');
        }
      }
    });
  }
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (selectedSignupPage !== page) {
      handlePageChange();
      setPage(selectedSignupPage);
    }
  });
  return !loggedIn ? (
    <div className="container">
      <div className="signup" ref={ref}>
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
          clearOnSubmit={selectedSignupPage === signupFormPages.length - 1}
        />
        <div className="text-center mt-4">
          <Link to={'/login'} className="text-center">
            Already have an account? Click here to login.
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={'/dashboard'} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
