import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapHolder from '../../MapHolder';

function ChargerInfo() {
  return (
    <div>
      <MapHolder />
    </div>
  );
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
