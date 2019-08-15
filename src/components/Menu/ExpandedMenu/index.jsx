import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMenu, toggleItem } from '../../../store/actions/menuActions';
import './expandedMenu.scss';

function ExpandedMenu({ hideMenu, menuLinks }) {
  return (
    <div className="outer-menu" onClick={() => hideMenu()}>
      <div className="inner-menu" onClick={(e) => e.stopPropagation()}></div>
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
