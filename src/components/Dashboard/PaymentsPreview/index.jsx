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
  retryPayment,
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
                <th>Late Fees</th>
              </tr>
            </thead>
            <tbody>
              {retryablePayments.map((payment, i) => (
                <tr key={i}>
                  <td>{moment(payment[0].createdAt).format('MM/DD/YYYY')}</td>
                  <td>{payment[0].description}</td>
                  <td>{(payment[0].amount / 100).toFixed(2)}</td>
                  <td>
                    {payment[0].lateFees
                      ? `late fees: ${(payment[0].lateFees / 100).toFixed(2)}`
                      : 0}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        retryPayment(
                          payment[0].id,
                          payment[0].lateFees,
                          currentBooking.payments,
                        )
                      }
                    >
                      retry
                    </button>
                  </td>
                </tr>
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
