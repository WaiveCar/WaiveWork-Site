import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carSearch } from '../../../store/actions/carActions';
import { createBooking } from '../../../store/actions/bookingActions';
import './bookCars.scss';

function BookCars({
  user,
  carSearch,
  searchResults,
  createBooking,
  searchComplete,
  offset,
  more,
}) {
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
                placeholder="Car Name or Number"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  carSearch(searchText, user);
                }}
                className="btn btn-primary search-btn col-2"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {searchResults.length
          ? searchResults.map((each, i) => (
              <div key={i} className="row search-result">
                <div className="col-9">{each.license}</div>
                <button
                  className="btn btn-primary search-btn col-2"
                  onClick={(e) => createBooking(each.id, user)}
                >
                  Book
                </button>
              </div>
            ))
          : searchComplete && (
              <div className="row">
                <div className="col-12 text-center">No Matches Found</div>
              </div>
            )}
        {more ? (
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                carSearch(searchText, user, true, offset);
              }}
              className="btn btn-primary search-btn col-2"
            >
              More
            </button>
          </div>
        ) : (
          ''
        )}
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
