import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function ChargerInfo() {
  return <div>Charger info</div>;
}

function mapStateToProps({ userReducer, chargerReducer }) {
  return {
    ...chargerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChargerInfo);
