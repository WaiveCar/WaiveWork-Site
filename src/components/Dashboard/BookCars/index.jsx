import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carSearch } from '../../../store/actions/carActions';
import { createBooking } from '../../../store/actions/bookingActions';
import './bookCars.scss';

function BookCars({ user, carSearch, searchResults, createBooking }) {
  let [searchText, setText] = useState('');
  return (
    <div className="card booking-card book-cars">
      <div className="card-body">
        <h5 className="card-title">Search For Cars:</h5>
        <form>
          <div className="form-group">
            <div className="row">
              <input
                type="text"
                className="col-9 form-control"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="col-3"
                onClick={(e) => {
                  e.preventDefault();
                  carSearch(searchText, user);
                }}
                className="btn btn-primary"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {searchResults.map((each, i) => (
          <div key={i} className="d-flex justify-content-between">
            <div>{each.license}</div>
            <button
              className="btn btn-primary"
              onClick={(e) => createBooking(each.id, user)}
            >
              Book
            </button>
          </div>
        ))}
      </div>
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
  return bindActionCreators({ carSearch, createBooking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCars);
