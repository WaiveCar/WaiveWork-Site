import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const formPages = [{}, {}, {}, {}, {}];

function Signup({ loggedIn }) {
  return (
    <div>{!loggedIn ? <div>Signup</div> : <Redirect to={'/dashboard'} />}</div>
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
