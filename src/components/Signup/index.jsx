import React, { useState, useEffect } from 'react';
import Form from '../Form';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSignupPage, signup } from '../../store/actions/userActions';
import { handlePageChange } from '../../store/actions/formActions';
import './signup.scss';

function Signup({
  loggedIn,
  signupFormPages,
  selectedSignupPage,
  changeSignupPage,
  signup,
  authForm,
  history,
  handlePageChange,
}) {
  const onSubmit =
    selectedSignupPage !== signupFormPages.length - 1
      ? changeSignupPage.bind(null, selectedSignupPage + 1)
      : signup;
  const altAction =
    selectedSignupPage !== 0 &&
    changeSignupPage.bind(null, selectedSignupPage - 1);
  const ref = React.createRef();
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (selectedSignupPage !== page) {
      handlePageChange(ref.current.firstChild);
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
          <Link
            to={'/login'}
            onClick={() => changeSignupPage(0)}
            className="text-center"
          >
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
  return bindActionCreators(
    { changeSignupPage, signup, handlePageChange },
    dispatch,
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
