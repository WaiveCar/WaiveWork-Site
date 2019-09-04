import React from 'react';
import moment from 'moment';
import {
  advancePayment,
  retryPayment,
} from '../../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './paymentsTable.scss';

function Payments({
  currentBooking,
  advancePayment,
  userResourcesLoaded,
  currentBookingPayments,
  retryPayment,
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookingPayments.map((payment, i) =>
                payment[0].isWarning ? (
                  <tr key={i} className="warning-row">
                    <td colSpan={'4'}>
                      Please note that there may be discrepancies in payments
                      from before around 8/15/2019. If you need a more accurate
                      accounting of your payments or have any questions, please
                      don't hesitate to contact us.
                    </td>
                  </tr>
                ) : payment[payment.length - 1].status === 'failed' ? (
                  <tr key={i}>
                    <td>
                      <div>
                        {moment(payment[0].createdAt).format('MM/DD/YYYY')}
                      </div>
                    </td>
                    <td>{payment[0].description}</td>
                    <td>${(payment[0].amount / 100).toFixed(2)}</td>
                    {payment[0].canRetry ? (
                      <td
                        onClick={() =>
                          retryPayment(
                            payment[0].id,
                            payment[0].lateFees,
                            currentBooking.payments,
                          )
                        }
                      >
                        late fee: $
                        {payment[0].lateFees
                          ? (payment[0].lateFees / 100).toFixed(2)
                          : 0}
                      </td>
                    ) : (
                      <td>failed</td>
                    )}
                  </tr>
                ) : (
                  <tr key={i}>
                    <td>
                      <div>
                        {moment(payment[payment.length - 1].createdAt).format(
                          'MM/DD/YYYY',
                        )}
                      </div>
                    </td>
                    <td>{payment[payment.length - 1].description}</td>
                    <td>
                      ${(payment[payment.length - 1].amount / 100).toFixed(2)}
                    </td>
                    <td>Paid</td>
                  </tr>
                ),
              )}
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
  return bindActionCreators({ advancePayment, retryPayment }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payments);
