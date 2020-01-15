import React from 'react';
import { Link } from 'react-router-dom';
import MiniDoc from '../MiniDoc';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../../store/actions/carActions';
import './carInfo.scss';

function CarInfo({ car, carCommand, registrationFile, insuranceFile }) {
  return car ? (
    <div className="card booking-card mt-4">
      <div className="card-body">
        <h5 className="card-title">Your Car: {car.license}</h5>
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
        <Link to={'/registration'}>
          <h5 className="mt-4">Registration</h5>
          <div className="d-flex justify-content-center">
            <MiniDoc file={registrationFile} />
          </div>
        </Link>
        <Link to={'/insurance'}>
          <h5 className="mt-4">Proof of Insurance</h5>
          <MiniDoc file={insuranceFile} />
        </Link>
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

function mapStateToProps({ carReducer, userReducer }) {
  return {
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carCommand }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo);
