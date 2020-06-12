import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function BookCars({ user }) {
  return (
    <div className="card-body">
      <h5 className="card-title">Book A Car:</h5>
      <div className="row d-flex justify-content-center"></div>
    </div>
  );
}

function mapStateToProps({ carReducer, userReducer }) {
  return {
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCars);
