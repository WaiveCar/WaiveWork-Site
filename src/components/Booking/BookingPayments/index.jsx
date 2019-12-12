import React from 'react';
import moment from 'moment';
import {
  advancePayment,
  retryPayment,
} from '../../../store/actions/paymentActions';
import Redo from '../../../svg/redo.svg';
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
  return (
    <div>
      <h4>Payment History</h4>
      <div className="mt-4 table-holder">
        <table className="table payment-table table-sm">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Late Fee</th>
              <th scope="col">Retry</th>
            </tr>
          </thead>
          <tbody>
            {currentBookingPayments.map((payment, i) =>
              payment[0].isWarning ? (
                <tr key={i} className="warning-row" scope="row">
                  <td colSpan={'5'}>
                    Please note that there may be discrepancies in payments from
                    before around 8/23/2019. If you need a more accurate
                    accounting of your payments or have any questions, please
                    don't hesitate to contact us.
                  </td>
                </tr>
              ) : payment[payment.length - 1].status === 'failed' ? (
                <tr key={i} scope="row">
                  <td>
                    <div>{moment(payment[0].createdAt).format('MM/DD')}</div>
                  </td>
                  <td>{payment[0].description}</td>
                  <td>${(payment[0].amount / 100).toFixed(2)}</td>
                  {payment[payment.length - 1].canRetry ? (
                    <td
                      onClick={() =>
                        retryPayment(
                          payment[0].id,
                          payment[0].lateFees,
                          currentBooking.payments,
                        )
                      }
                    >
                      $
                      {payment[0].lateFees
                        ? (payment[0].lateFees / 100).toFixed(2)
                        : 0}
                    </td>
                  ) : (
                    <td>failed</td>
                  )}
                  {payment[payment.length - 1].canRetry && (
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
                  )}
                </tr>
              ) : (
                <tr key={i} scope="row">
                  <td>
                    <div>
                      {moment(payment[payment.length - 1].createdAt).format(
                        'MM/DD',
                      )}
                    </div>
                  </td>
                  <td>{payment[payment.length - 1].description}</td>
                  <td>
                    ${(payment[payment.length - 1].amount / 100).toFixed(2)}
                  </td>
                  <td>Paid</td>
                  <td />
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
