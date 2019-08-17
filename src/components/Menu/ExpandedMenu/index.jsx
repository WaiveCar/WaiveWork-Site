import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMenu, toggleItem } from '../../../store/actions/menuActions';
import { Link } from 'react-router-dom';
import './expandedMenu.scss';

function ExpandedMenu({ hideMenu, menuLinks }) {
  return (
    <div className="outer-menu" onClick={() => hideMenu()}>
      <div className="inner-menu" onClick={(e) => e.stopPropagation()}>
        {menuLinks.map((item, i) => {
          console.log(item, item.href);
          return (
            <div key={i}>
              {item.href ? (
                <Link to={item.href} onClick={() => hideMenu()}>
                  {item.name}
                </Link>
              ) : (
                <div>{item.name}</div>
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
  return bindActionCreators({ hideMenu }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpandedMenu);
