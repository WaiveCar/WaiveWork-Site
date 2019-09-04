import React from 'react';
import moment from 'moment';
import {
  advancePayment,
  retryPayment,
} from '../../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function PaymentsPreview({
  currentBooking,
  advancePayment,
  userResourcesLoaded,
  retryablePayments,
}) {
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
      <div className="container">
        <div className="row">
          Next payment date: {nextPaymentDate} - {nextPaymentFromNow} days
        </div>
        {retryablePayments.length && (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {retryablePayments.map((payment, i) => (
                <div className="row">
                  <div>{payment[0].date}</div>
                  <div>{payment[0].description}</div>
                  {payment[0].lateFees && (
                    <div>late fees: {payment[0].lateFees}</div>
                  )}
                  <button className="btn btn-outline-primary">retry</button>
                </div>
              ))}
            </tbody>
          </table>
        )}
        <div className="row">
          <button
            className="btn btn-outline-primary"
            onClick={() => advancePayment(currentBooking)}
          >
            Advance payment
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {!userResourcesLoaded ? (
          <div>Loading...</div>
        ) : (
          <div>No upcoming payment</div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ bookingReducer, paymentReducer, userReducer }) {
  return {
    ...userReducer,
    ...bookingReducer,
    ...paymentReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ advancePayment, retryPayment }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsPreview);
