import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../store/actions/carActions';
import {
  advancePayment,
  retryPayment,
} from '../../store/actions/paymentActions';
import BookingPayments from './BookingPayments';
import moment from 'moment';

function Booking({
  currentBooking,
  userResourcesLoaded,
  car,
  carHistory,
  advancePayment,
  carCommand,
}) {
  if (car && currentBooking && currentBooking.waiveworkPayment) {
    let nextPaymentDate = moment
      .utc(currentBooking.waiveworkPayment.date)
      .format('MM/DD/YYYY');
    let nextPaymentFromNow =
      moment(currentBooking.waiveworkPayment.date).diff(
        moment(moment().format('YYYY-MM-DD')),
        'days',
      ) + 1;
    return (
      <div className="container fluid mt-4">
        <h1>Info about your booking in {car.license}</h1>
        <div className="row d-flex justify-content-center">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => carCommand(car.id, 'lock')}
            >
              Lock
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => carCommand(car.id, 'unlock')}
            >
              Unlock
            </button>
          </div>
        </div>
        <div className="col">
          {currentBooking && currentBooking.waiveworkPayment && (
            <div>
              <div>
                Start Date: {currentBooking.stats.startDate}
                {' - '}
                Day {currentBooking.stats.dayOfBooking} of Booking
              </div>
              <div>
                Next Payment Date: {nextPaymentDate}
                {' - '}
                {nextPaymentFromNow} Days From Now
              </div>
              <div>Total Miles Driven: {currentBooking.stats.totalMiles}</div>
            </div>
          )}
        </div>
        <div>
          <button
            className="btn btn-outline-primary"
            onClick={() => advancePayment(currentBooking)}
          >
            Advance payment
          </button>
        </div>
        {carHistory && carHistory.length > 1 && (
          <div className="mt-4">
            <h4>Daily Mileage Averages</h4>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <th scope="col">All Time</th>
                  <th scope="col">Last 30 Days</th>
                  <th scope="col">Last Week</th>
                  <th scope="col">Yesterday</th>
                </tr>
                <tr>
                  <td>{currentBooking.stats.totalMiles}</td>
                  <td>{currentBooking.stats.last30Days}</td>
                  <td>{currentBooking.stats.last7Days}</td>
                  <td>{currentBooking.stats.lastDay}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <BookingPayments />
      </div>
    );
  } else {
    return (
      <div className="container">
        <div>
          {!userResourcesLoaded ? (
            <div>loading</div>
          ) : currentBooking && !currentBooking.waiveworkPayment ? (
            <div>You are in a booking, but it is not a WaiveWork booking</div>
          ) : (
            <div>You are not currently in booking</div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ userReducer, bookingReducer, carReducer }) {
  return {
    ...bookingReducer,
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carCommand, advancePayment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
