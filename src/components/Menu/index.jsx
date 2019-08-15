import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/userActions';
import { showMenu, hideMenu } from '../../store/actions/menuActions';
import Bars from '../../svg/bars.svg';
import ExpandedMenu from './ExpandedMenu';
import './menu.scss';

function Menu({ logout, loggedIn, showMenu, menuVisible }) {
  return (
    <div>
      {menuVisible && <ExpandedMenu />}
      <div className="top-bar">
        {loggedIn && (
          <div className="menu-button" onClick={() => showMenu()}>
            <Bars className="menu-svg" />
          </div>
        )}
      </div>
      <Link to={'/login'}>login</Link>
      <Link to={'/signup'}>signup</Link>
      <Link to={'/dashboard'}>dashboard</Link>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

function mapStateToProps({ userReducer, menuReducer }) {
  return {
    ...userReducer,
    ...menuReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, showMenu, hideMenu }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
