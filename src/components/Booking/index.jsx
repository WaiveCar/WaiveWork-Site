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
                Start Date: {currentBooking.stats.startDate}
                {' - '}
                Day {currentBooking.stats.dayOfBooking} of Booking
              </div>
              <div>
                Next Payment Date: {currentBooking.stats.nextPaymentDate}
                {' - '}
                {currentBooking.stats.nextPaymentFromNow}
                Days From Now - <Link to={'/payments'}>Click here</Link> for
                more details
              </div>
            </div>
          )}
          {carHistory && carHistory.length > 1 && (
            <div>
              <div>Total Miles Driven: {currentBooking.stats.totalMiles}</div>
              <div>Average per day for: </div>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <th>All Time</th>
                    <th>Last 30 Days</th>
                    <th>Last Week</th>
                    <th>Yesterday</th>
                  </tr>
                  <tr>
                    <td>{currentBooking.stats.totalMiles}</td>
                    <td>{currentBooking.stats.last30Days}</td>
                    <td>{currentBooking.stats.last7Days}</td>
                    <td>{currentBooking.stats.Day}</td>
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
