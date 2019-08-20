import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '../Menu';
import Routes from '../Routes';
import Snackbar from '../Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyAuth, fetchUserInfo } from '../../store/actions/userActions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { verifyAuth, history, location } = this.props;
    verifyAuth(history, location.pathname);
  }

  componentDidUpdate(prevProps) {
    const { loggedIn, authChecked, fetchUserInfo } = this.props;
    if (loggedIn && authChecked && !prevProps.authChecked) {
      // This call should only be made if a user is verified as logged in
      fetchUserInfo();
    }
  }

  render() {
    const { authChecked } = this.props;
    return (
      <div>
        <Menu />
        {authChecked ? <Routes /> : <div>Loading...</div>}
        <Snackbar />
      </div>
    );
  }
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyAuth, fetchUserInfo }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
