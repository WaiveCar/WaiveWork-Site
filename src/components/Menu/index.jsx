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
  let path = window.location.pathname;
  return (
    <div>
      {menuVisible ? <ExpandedMenu /> : null}
      <div className="top-bar">
        <div className="inner-top">
          <div className="top-bar-left">
            {!loggedIn ? (
              <Link to={'/dashboard'} className="logo-link">
                <Logo className="top-logo" />
              </Link>
            ) : (
              <div onClick={() => showMenu()}>
                <Logo className="top-logo" />
              </div>
            )}
          </div>
          {loggedIn ? (
            <div className=""></div>
          ) : (
            <div className="top-bar-right">
              {path.includes('signup') ? (
                <div>
                  Already have an account? <Link to={'/login'}>login</Link>
                </div>
              ) : (
                <div>
                  Don't have an account yet? <Link to={'/signup'}>signup</Link>
                </div>
              )}
            </div>
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
