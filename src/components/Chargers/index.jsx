import React from 'react';
import MapHolder from '../MapHolder';
import {
  startCharger,
  expandChargerLocation,
  shiftSelected,
} from '../../store/actions/chargerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './chargers.scss';

function Chargers({
  user,
  car,
  allChargers,
  current5,
  expandChargerLocation,
  currentStart,
  startCharger,
  shiftSelected,
}) {
  return user && user.currentLocation ? (
    <div className="container">
      <div className="charger-map">
        <MapHolder
          initialCenter={{
            lat: user.currentLocation.coords.latitude,
            lng: user.currentLocation.coords.longitude,
          }}
          markers={current5}
          zoom={12}
        />
      </div>
      <div>
        {current5.map((charger, i) => (
          <div key={i}>
            <div className="row justify-content-center">
              <div onClick={() => expandChargerLocation(i)}>
                {charger.name}: {charger.distance.toFixed(2)} miles
              </div>
            </div>
            <div className="row justify-content-center">
              {charger.expanded && (
                <div>
                  <div className="row justify-content-center">
                    {charger.portList.map((port, i) => (
                      <div
                        key={i}
                        onClick={() => startCharger(car.id, port.id)}
                      >
                        {port.name}: {port.type}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="row justify-content-center">
        <div className="shift-buttons space-between">
          <button
            className="btn btn-outline-primary"
            disabled={currentStart === 0}
            onClick={() => shiftSelected(allChargers, currentStart, -5)}
          >
            Prev 5
          </button>
          <button
            className="btn btn-outline-primary"
            disabled={currentStart + 5 >= allChargers.length}
            onClick={() => shiftSelected(allChargers, currentStart, 5)}
          >
            Next 5
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Unable to get current location</div>
  );
}

function mapStateToProps({ userReducer, carReducer, chargerReducer }) {
  return {
    ...userReducer,
    ...carReducer,
    ...chargerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { startCharger, expandChargerLocation, shiftSelected },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chargers);
