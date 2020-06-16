import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carSearch } from '../../../store/actions/carActions';
import {
  createBooking,
  endBooking,
} from '../../../store/actions/bookingActions';

function BookCars({
  user,
  carSearch,
  searchResults,
  createBooking,
  endBooking,
}) {
  let [searchText, setText] = useState('');
  return (
    <div>
      {!currentBooking ? (
        <div className="card-body">
          <h5 className="card-title">Book A Car:</h5>
          <div>
            <input type="text" onChange={(e) => setText(e.target.value)} />
            <button
              onClick={() => carSearch(searchText, user)}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
          {searchResults.map((each, i) => (
            <div key={i} className="d-flex justify-content-between">
              <div>{each.license}</div>
              <button
                className="btn btn-primary"
                onClick={() => createBooking(each.id, user)}
              >
                Book
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-body">
          <h5 className="card-title">Your Booking</h5>
          <button
            className="btn btn-primary"
            onClick={() => endBooking(currentBooking.carId)}
          >
            End
          </button>
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ carReducer, bookingReducer, userReducer }) {
  return {
    ...carReducer,
    ...bookingReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carSearch, createBooking, endBooking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCars);
