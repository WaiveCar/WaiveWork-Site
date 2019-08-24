import React from 'react';
import moment from 'moment';
import { advancePayment } from '../../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function PaymentsPreview({ currentBooking, advancePayment }) {
  if (currentBooking && currentBooking.waiveworkPayment) {
    let nextPaymentDate = moment
      .utc(currentBooking.waiveworkPayment.date)
      .format('MM/DD/YYYY');
    let nextPaymentFromNow =
      moment(currentBooking.waiveworkPayment.date).diff(
        moment(moment().format('YYYY-MM-DD')),
        'days',
      ) + 1;
    return (
      <div>
        <div>
          Next payment date: {nextPaymentDate} - {nextPaymentFromNow} days
        </div>
        <div>
          <button onClick={() => advancePayment(currentBooking)}>
            Advance payment
          </button>
        </div>
      </div>
    );
  } else {
    return <div>No upcoming payment</div>;
  }
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
