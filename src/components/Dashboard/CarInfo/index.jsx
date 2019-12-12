import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../../store/actions/carActions';

function CarInfo({ car, carCommand }) {
  return car ? (
    <div className="card booking-card mt-4">
      <div className="card-body">
        <h5 className="card-title">Car Info</h5>
        <div className="row d-flex justify-content-center">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => carCommand(car.id, 'lock')}
            >
              Lock
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => carCommand(car.id, 'unlock')}
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="card booking-card mt-4">
      <div className="card-body">
        <h5 className="card-title">Car Controls</h5>
        <div className="text-center">
          You are not currently booked into WaiveWork
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo);
