import React from 'react';
import moment from 'moment';
import {
  advancePayment,
  retryPayment,
} from '../../../store/actions/paymentActions';
import Redo from '../../../svg/redo.svg';
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
        {retryablePayments.length ? (
          <div>
            <h4>Missed Payments:</h4>
            <table className="table table-sm payment-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Late Fees</th>
                  <th scope="col">Retry</th>
                </tr>
              </thead>
              <tbody>
                {retryablePayments.map((payment, i) => (
                  <tr key={i} scope="row">
                    <td>{moment(payment[0].createdAt).format('MM/DD')}</td>
                    <td>{payment[0].description}</td>
                    <td>{(payment[0].amount / 100).toFixed(2)}</td>
                    <td>
                      {payment[0].lateFees
                        ? `${(payment[0].lateFees / 100).toFixed(2)}`
                        : 0}
                    </td>
                    <td>
                      <Redo
                        className="retry-btn"
                        onClick={() =>
                          retryPayment(
                            payment[0].id,
                            payment[0].lateFees,
                            currentBooking.payments,
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>Good Job! You do not have any outstanding payments.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsPreview);
