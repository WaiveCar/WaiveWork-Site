import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

function Booking({ currentBooking, car, carHistory }) {
  return (
    <div>
      {currentBooking && currentBooking.waiveworkPayment && (
        <div>
          <div>
            Start Date: {moment(currentBooking.createdAt).format('MM/DD/YYYY')}
            {' - '}
            Day {moment().diff(moment(currentBooking.createdAt), 'days') + 1} of
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
            Days From Now
          </div>
        </div>
      )}
      {carHistory && carHistory.length > 1 && (
        <div>
          Total Miles Driven:{' '}
          {(
            (Number(carHistory[carHistory.length - 1].data) -
              Number(carHistory[0].data)) *
            0.621371
          ).toFixed(2)}
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ bookingReducer, carReducer }) {
  return {
    ...bookingReducer,
    ...carReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Booking);
