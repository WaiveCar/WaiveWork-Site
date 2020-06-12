import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carSearch } from '../../../store/actions/carActions';

function BookCars({ user, carSearch }) {
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
  return bindActionCreators({ carSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCars);
