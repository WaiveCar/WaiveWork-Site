import React from 'react';
import { advancePayment } from '../../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function PaymentsPreview({ currentBooking, advancePayment }) {
  return currentBooking && currentBooking.stats ? (
    <div>
      <div>Next payment date: {currentBooking.stats.nextPaymentDate}</div>
      <div>
        <button onClick={() => advancePayment(currentBooking)}>
          Advance payment
        </button>
      </div>
    </div>
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
  return bindActionCreators({ advancePayment }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsPreview);
