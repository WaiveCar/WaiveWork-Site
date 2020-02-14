import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showMenu, hideMenu } from '../../store/actions/menuActions';
import Bars from '../../svg/bars.svg';
import Logo from '../../svg/logo.svg';
import ExpandedMenu from './ExpandedMenu';
import Loading from '../Loading';
import './menu.scss';

function Menu({
  loggedIn,
  showMenu,
  menuVisible,
  authChecked,
  loading,
  history,
}) {
  return (
    <div>
      {menuVisible ? <ExpandedMenu /> : null}
      <div className="top-bar">
        <div className="inner-top">
          <div className="top-bar-left">
            {!loggedIn ? (
              <Link to={'/dashboard'} className="logo-link">
                <Logo className="top-logo" viewBox={'0 0 100% 100%'} />
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
              {history.location.pathname.includes('signup') ? (
                <div>
                  <div className="top-text">Already have an account? </div>
                  <Link className="btn btn-outline-info" to={'/login'}>
                    LOGIN
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="top-text">Don't have an account yet? </div>
                  <Link className="btn btn-outline-info" to={'/signup'}>
                    SIGNUP
                  </Link>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
