import React from 'react';
import moment from 'moment';
import { advancePayment } from '../../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
      <div className="container">
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
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Initial Date</th>
              <th>Most Recent Attempt</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBookingPayments.map((payment, i) => (
              <tr key={i}>
                <td>{moment(payment[0].createdAt).format('MM/DD/YYYY')}</td>
                <td>
                  {moment(payment[payment.length - 1].createdAt).format(
                    'MM/DD/YYYY',
                  )}
                </td>
                <td>{payment[payment.length - 1].description}</td>
                <td>{(payment[payment.length - 1].amount / 100).toFixed(2)}</td>
                <td>{payment[payment.length - 1].status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
