import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMenu, toggleItem } from '../../../store/actions/menuActions';
import { Link } from 'react-router-dom';
import './expandedMenu.scss';

function ExpandedMenu({ hideMenu, menuLinks, toggleItem }) {
  return (
    <div className="outer-menu" onClick={() => hideMenu()}>
      <div className="inner-menu" onClick={(e) => e.stopPropagation()}>
        {Object.keys(menuLinks).map((name, i) => {
          let item = menuLinks[name];
          return (
            <div key={i}>
              {item.href ? (
                <Link to={item.href} onClick={() => hideMenu()}>
                  {name}
                </Link>
              ) : (
                <div onClick={() => toggleItem(name)} key={i}>
                  {name}
                  {item.expanded &&
                    item.children.map((child, j) => (
                      <div key={j} onClick={(e) => e.stopPropagation()}>
                        <Link to={child.href} onClick={() => hideMenu()}>
                          {child.name}
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
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
  return bindActionCreators({ hideMenu, toggleItem }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpandedMenu);
