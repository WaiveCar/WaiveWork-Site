import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showMenu, hideMenu } from '../../store/actions/menuActions';
import Bars from '../../svg/bars.svg';
import Logo from '../../svg/logo.svg';
import ExpandedMenu from './ExpandedMenu';
import Loading from '../Loading';
import './menu.scss';

function Menu({ loggedIn, showMenu, menuVisible, authChecked, loading }) {
  return (
    <div>
      {menuVisible ? <ExpandedMenu /> : null}
      <div className="top-bar">
        <div className="inner-top">
          <div className="top-bar-left">
            <Link to={'/dashboard'} className="logo-link">
              <Logo className="top-logo" />
            </Link>
          </div>
          {loggedIn ? (
            <div className="menu-button" onClick={() => showMenu()}>
              <Bars className="menu-svg" />
            </div>
          ) : (
            <div className="top-bar-right">Top Right</div>
          )}
        </div>
      </div>
      {loading ? <Loading /> : null}
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
