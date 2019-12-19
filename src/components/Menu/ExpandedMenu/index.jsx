import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMenu, toggleItem } from '../../../store/actions/menuActions';
import { logout } from '../../../store/actions/userActions';
import { Link } from 'react-router-dom';
import ChevronRight from '../../../svg/chevron-right.svg';
import ChevronLeft from '../../../svg/chevron-left.svg';
import SignOut from '../../../svg/sign-out-alt.svg';
import './expandedMenu.scss';

function ExpandedMenu({ hideMenu, menuLinks, toggleItem, logout }) {
  return (
    <div className="outer-menu" onClick={() => hideMenu()}>
      <div className="inner-menu" onClick={(e) => e.stopPropagation()}>
        {Object.keys(menuLinks).map((name, i) => {
          let item = menuLinks[name];
          return (
            <div key={i}>
              {item.href ? (
                <Link
                  to={item.href}
                  onClick={() => {
                    toggleItem(name), hideMenu();
                  }}
                >
                  {name}
                </Link>
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
        <div
          className="d-flex justify-content-center"
          onClick={() => {
            logout(), hideMenu();
          }}
        >
          <div className="logout">
            <SignOut className="signout-icon" />
            Log Out
          </div>
        </div>
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
