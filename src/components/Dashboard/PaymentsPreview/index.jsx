import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function PaymentsPreview({ currentBooking }) {
  return currentBooking && currentBooking.stats ? (
    <div>Next payment date: {currentBooking.stats.nextPaymentDate}</div>
  ) : (
    <div>No upcoming payment</div>
  );
}

function mapStateToProps({ bookingReducer, paymentReducer }) {
  return {
    ...bookingReducer,
    ...paymentReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsPreview);
