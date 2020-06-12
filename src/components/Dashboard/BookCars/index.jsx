import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carSearch } from '../../../store/actions/carActions';
import { createBooking } from '../../../store/actions/bookingActions';

function BookCars({ user, carSearch, searchResults }) {
  let [searchText, setText] = useState('');
  return (
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
        <div key={i}>{each.license}</div>
      ))}
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
