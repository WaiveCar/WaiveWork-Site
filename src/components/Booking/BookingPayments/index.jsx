import React from 'react';
import moment from 'moment';
import { advancePayment } from '../../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './paymentsTable.scss';

function Payments({
  currentBooking,
  advancePayment,
  userResourcesLoaded,
  currentBookingPayments,
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
      <div>
        <div className="row">
          <div>
            Next payment date: {nextPaymentDate} - {nextPaymentFromNow} days
          </div>
          <div>
            <button
              className="btn btn-outline-primary"
              onClick={() => advancePayment(currentBooking)}
            >
              Advance payment
            </button>
          </div>
        </div>
        <div>
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Late Fee</th>
              </tr>
            </thead>
            <tbody>
              {currentBookingPayments.map((payment, i) => (
                <tr key={i}>
                  <td>
                    <div>
                      Original:{' '}
                      {moment(payment[0].createdAt).format('MM/DD/YYYY')}
                    </div>
                    <div>
                      Last Tried:
                      {moment(payment[payment.length - 1].createdAt).format(
                        'MM/DD/YYYY',
                      )}
                    </div>
                  </td>
                  <td>{payment[payment.length - 1].description}</td>
                  <td>
                    ${(payment[payment.length - 1].amount / 100).toFixed(2)}
                  </td>
                  {payment[payment.length - 1].lateFees ? (
                    <td>
                      ${(payment[payment.length - 1].lateFees / 100).toFixed(2)}
                    </td>
                  ) : (
                    <td>Paid</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
  return bindActionCreators({ advancePayment }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payments);
