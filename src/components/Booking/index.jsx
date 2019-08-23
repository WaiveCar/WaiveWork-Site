import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { carCommand } from '../../store/actions/carActions';
import moment from 'moment';

function Booking({
  currentBooking,
  userResourcesLoaded,
  car,
  carHistory,
  carCommand,
}) {
  return (
    <div className="container">
      {currentBooking && car ? (
        <div>
          <h3>Info about your booking in {car.license}</h3>
          <div className="row justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => carCommand(car.id, 'lock')}
            >
              Lock
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => carCommand(car.id, 'unlock')}
            >
              Unlock
            </button>
          </div>
          {currentBooking && currentBooking.waiveworkPayment && (
            <div>
              <div>
                Start Date:{' '}
                {moment(currentBooking.createdAt).format('MM/DD/YYYY')}
                {' - '}
                Day{' '}
                {moment().diff(moment(currentBooking.createdAt), 'days') + 1} of
                Booking
              </div>
              <div>
                Next Payment Date:{' '}
                {moment
                  .utc(currentBooking.waiveworkPayment.date)
                  .format('MM/DD/YYYY')}
                {' - '}
                {moment(currentBooking.waiveworkPayment.date).diff(
                  moment(moment().format('YYYY-MM-DD')),
                  'days',
                ) + 1}{' '}
                Days From Now - <Link to={'/payments'}>Click here</Link> for
                more details
              </div>
            </div>
          )}
          {carHistory && carHistory.length > 1 && (
            <div>
              <div>
                Total Miles Driven:{' '}
                {(
                  (Number(carHistory[carHistory.length - 1].data) -
                    Number(carHistory[0].data)) *
                  0.621371
                ).toFixed(2)}
              </div>
              <div>Average per day: </div>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <th>All Time</th>
                    <th>Last 30 Days</th>
                    <th>Last Week</th>
                    <th>Yesterday</th>
                  </tr>
                  <tr>
                    <td>
                      {carHistory.length
                        ? (
                            ((Number(carHistory[carHistory.length - 1].data) -
                              Number(carHistory[0].data)) /
                              carHistory.length) *
                            0.621371
                          ).toFixed(2)
                        : 'Ride not yet over 1 day'}
                    </td>
                    <td>
                      {carHistory[carHistory.length - 31]
                        ? (
                            ((Number(carHistory[carHistory.length - 1].data) -
                              Number(carHistory[carHistory.length - 31].data)) /
                              30) *
                            0.621371
                          ).toFixed(2)
                        : 'Ride not yet over 30 days'}
                    </td>
                    <td>
                      {carHistory[carHistory.length - 8]
                        ? (
                            ((Number(carHistory[carHistory.length - 1].data) -
                              Number(carHistory[carHistory.length - 8].data)) /
                              7) *
                            0.621371
                          ).toFixed(2)
                        : 'Ride not yet over 1 week'}
                    </td>
                    <td>
                      {carHistory.length > 1
                        ? (
                            (Number(carHistory[carHistory.length - 1].data) -
                              Number(carHistory[carHistory.length - 2].data)) *
                            0.621371
                          ).toFixed(2)
                        : 'Ride not yet over 1 day'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div>
          {!userResourcesLoaded ? (
            <div>loading</div>
          ) : (
            <div>not currently in booking</div>
          )}
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ userReducer, bookingReducer, carReducer }) {
  return {
    ...bookingReducer,
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carCommand }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Booking);
