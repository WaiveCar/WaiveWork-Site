import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function PaymentsPreview() {
  return <div>Payments</div>;
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
