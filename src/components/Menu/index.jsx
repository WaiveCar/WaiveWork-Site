import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/userActions';

function Menu({ logout }) {
  return (
    <div>
      <Link to={'/login'}>login</Link>
      <Link to={'/signup'}>signup</Link>
      <Link to={'/dashboard'}>dashboard</Link>
      <button onClick={() => logout()}>logout</button>
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
    logout: bindActionCreators(logout, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
