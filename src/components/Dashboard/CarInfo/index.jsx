import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../../store/actions/carActions';

function CarInfo({ car, carCommand }) {
  return (
    car && (
      <div className="container">
        <div className="row justify-content-center">
          Currently in {car.license}
        </div>
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
      </div>
    )
  );
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
