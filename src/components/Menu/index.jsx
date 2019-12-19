import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showMenu, hideMenu } from '../../store/actions/menuActions';
import Bars from '../../svg/bars.svg';
import Logo from '../../svg/waive-work-logo-white.svg';
import ExpandedMenu from './ExpandedMenu';
import './menu.scss';

function Menu({ loggedIn, showMenu, menuVisible, authChecked }) {
  return (
    <div>
      {menuVisible ? <ExpandedMenu /> : <div />}
      <div className="top-bar">
        <Link to={'/dashboard'} className="logo-link">
          <Logo className="top-logo" />
        </Link>
        {loggedIn ? (
          <div className="menu-button" onClick={() => showMenu()}>
            <Bars className="menu-svg" />
          </div>
        ) : (
          <div />
        )}
      </div>
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
  return bindActionCreators({ showMenu, hideMenu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
