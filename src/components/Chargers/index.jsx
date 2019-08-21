import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Chargers() {
  return <div>Chargers Expanded</div>;
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
)(Chargers);
