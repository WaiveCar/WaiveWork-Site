import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Booking() {
  return <div>Booking Page</div>;
}

function mapStateToProps({ bookingReducer, carReducer }) {
  return {
    ...bookingReducer,
    ...carReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Booking);
