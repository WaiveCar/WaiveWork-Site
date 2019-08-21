import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../../store/actions/carActions';

function CarInfo({ car }) {
  return car && <div>Currently in {car.license}</div>;
}

function mapStateToProps({ carReducer }) {
  return {
    ...carReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carCommand }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarInfo);
