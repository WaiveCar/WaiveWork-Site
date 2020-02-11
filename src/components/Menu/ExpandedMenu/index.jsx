import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMenu, toggleItem } from '../../../store/actions/menuActions';
import { logout } from '../../../store/actions/userActions';
import { Link } from 'react-router-dom';
import ChevronRight from '../../../svg/chevron-right.svg';
import ChevronLeft from '../../../svg/chevron-left.svg';
import SignOut from '../../../svg/sign-out-alt.svg';
import Logo from '../../../svg/logo-waivecar.svg';
import './expandedMenu.scss';

function ExpandedMenu({ hideMenu, menuLinks, toggleItem, logout, loading }) {
  return (
    <div className="outer-menu" onClick={() => hideMenu()}>
      <div className="inner-menu" onClick={(e) => e.stopPropagation()}>
        <div className="menu-logo-holder d-flex justify-content-center">
          <Link to={'/dashboard'}>
            <Logo className="menu-logo" />
          </Link>
        </div>
        {Object.keys(menuLinks).map((name, i) => {
          let item = menuLinks[name];
          return (
            <div key={i}>
              {item.href ? (
                <div className="menu-title">
                  <ChevronRight
                    className={`menu-chevron ${item.expanded ? 'rotated' : ''}`}
                  />
                  <Link
                    className="menu-link"
                    to={item.href}
                    onClick={() => hideMenu()}
                  >
                    {name}
                  </Link>
                </div>
              ) : (
                <div onClick={() => toggleItem(name)} key={i}>
                  <div className="menu-title">
                    <ChevronRight
                      className={`menu-chevron ${
                        item.expanded ? 'rotated' : ''
                      }`}
                    />
                    <span className="menu-title-text">{name}</span>
                  </div>
                  <ul className="expanded-list">
                    {item.expanded &&
                      item.children.map((child, j) => (
                        <li
                          key={j}
                          className="expanded-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link
                            to={child.href}
                            onClick={() => {
                              toggleItem(name), hideMenu();
                            }}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
        {!loading ? (
          <div
            className="d-flex justify-content-center"
            onClick={() => {
              logout(), hideMenu();
            }}
          >
            <div className="logout">
              <SignOut className="signout-icon" />
              Logout
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function mapStateToProps({ menuReducer }) {
  return {
    ...menuReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideMenu, toggleItem, logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedMenu);
