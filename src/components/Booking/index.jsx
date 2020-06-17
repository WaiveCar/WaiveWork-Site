import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../store/actions/carActions';
import {
  advancePayment,
  retryPayment,
} from '../../store/actions/paymentActions';
import BookingPayments from './BookingPayments';
import BookCars from '../Dashboard/BookCars';
import { endBooking } from '../../store/actions/bookingActions';
import moment from 'moment';
import './booking.scss';

function Booking({
  currentBooking,
  userResourcesLoaded,
  car,
  carHistory,
  advancePayment,
  currentBookingPayments,
  retryablePayments,
  carCommand,
  user,
  endBooking,
}) {
  if (
    (currentBooking && currentBooking.waiveworkPayment) ||
    (user.organizations.length && car)
  ) {
    let nextPaymentDate =
      currentBooking &&
      currentBooking.waiveworkPayment &&
      moment.utc(currentBooking.waiveworkPayment.date).format('MM/DD/YYYY');
    let nextPaymentFromNow =
      currentBooking &&
      currentBooking.waiveworkPayment &&
      moment(currentBooking.waiveworkPayment.date).diff(
        moment(moment().format('YYYY-MM-DD')),
        'days',
      ) + 1;
    return (
      <div className="container fluid">
        <h1 className="d-flex justify-content-between">
          <div>Your booking in {car.license}</div>
          <div>
            {user.waiveworkCredit
              ? `Credit: $${(user.waiveworkCredit / 100).toFixed(2)}`
              : ''}
          </div>
        </h1>
        {currentBooking &&
          (currentBooking.waiveworkPayment || user.organizations.length) && (
            <div className="row d-flex justify-content-around">
              <div className="card booking-card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Booking Info</h5>
                  <ul className="list-group list-group-flush booking-info mt-4">
                    <li className="list-group-item">
                      Start Date: {currentBooking.stats.startDate}(
                      {currentBooking.stats.dayOfBooking} Days Ago)
                    </li>
                    {currentBooking.waiveworkPayment && (
                      <li className="list-group-item">
                        Next Payment Date: {nextPaymentDate} (
                        {nextPaymentFromNow} Days From Now)
                      </li>
                    )}
                    {currentBooking.waiveworkPayment && (
                      <li className="list-group-item">
                        Total Miles Driven: {currentBooking.stats.totalMiles}
                      </li>
                    )}
                  </ul>
                  {car.organizationId && (
                    <div className="d-flex justify-content-center mt-2">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-primary"
                          onClick={() => endBooking(car.id)}
                        >
                          End Booking
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card booking-card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Car Controls</h5>
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
                  {!retryablePayments.length && !user.organizations.length ? (
                    <div>
                      <h5 className="card-title mt-4">Advance Payments</h5>
                      <div className="text-center pl-4 pr-4 mt-4 booking-info">
                        Did you know that you can make your weekly payments in
                        advance?
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() =>
                            advancePayment(
                              currentBooking,
                              currentBookingPayments,
                              retryablePayments,
                              user,
                            )
                          }
                        >
                          Advance Payment
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        <div className="row"></div>
        {carHistory && carHistory.length > 1 && (
          <div className="mt-4">
            <h4>Daily Mileage Averages</h4>
            <table className="table table-sm mt-4 payment-table">
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
        {!user.organizations.length ? <BookingPayments /> : ''}
      </div>
    );
  } else {
    return (
      <div className="container">
        {!user.organizations.length ? (
          <div className="text-center">
            <h5>You are not currently in a WaiveWork booking</h5>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <BookCars />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({
  userReducer,
  paymentReducer,
  bookingReducer,
  carReducer,
}) {
  return {
    ...bookingReducer,
    ...paymentReducer,
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { carCommand, advancePayment, endBooking },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
