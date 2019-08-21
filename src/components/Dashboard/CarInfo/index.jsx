import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../../store/actions/carActions';

function CarInfo({ car, carCommand }) {
  return (
    car && (
      <div>
        Currently in {car.license}
        <div>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => carCommand(car.id, 'lock')}
          >
            Lock
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
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
