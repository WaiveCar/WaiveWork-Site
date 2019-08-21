import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function ChargerInfo() {
  return <div>Charger info</div>;
}

function mapStateToProps({ chargerReducer }) {
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
