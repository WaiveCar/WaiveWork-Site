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
      <div className="card booking-card mt-4">
        <div className="card-body">
          <h5 className="card-title">Booking Info</h5>
          {retryablePayments.length ? (
            <div>
              <table className="table table-sm payment-table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Fees</th>
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
          <ul className="list-group list-group-flush booking-info">
            <li className="list-group-item">
              Start Date: {currentBooking.stats.startDate} (
              {currentBooking.stats.dayOfBooking} Days Ago)
            </li>
            <li className="list-group-item">
              Next Payment Date: {nextPaymentDate} ({nextPaymentFromNow} Days
              From Now)
            </li>
            <li className="list-group-item">
              Total Miles Driven: {currentBooking.stats.totalMiles}
            </li>
          </ul>
          <div className="text-center pl-4 pr-4 mt-4 booking-info">
            Did you know that you can make your weekly payments in advance?
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => advancePayment(currentBooking)}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card booking-card mt-4">
        <div className="card-body">
          <h5 className="card-title">Payment info</h5>
          <div className="text-center">
            You are not currently in a WaiveWork booking and therefore do not
            have any upcoming payments
          </div>
        </div>
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
