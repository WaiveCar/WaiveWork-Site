import React from 'react';
import MapHolder from '../MapHolder';
import {
  startCharger,
  expandChargerLocation,
  shiftSelected,
} from '../../store/actions/chargerActions';
import Station from '../../svg/charging-station.svg';
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
    <div className="container mt-4">
      <h1>Chargers</h1>
      <div className="charger-map mt-4">
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
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Distance</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          {current5.map((charger, i) =>
            !charger.isExpansion ? (
              <tr key={i} onClick={() => expandChargerLocation(i)}>
                <td>{charger.name}</td>
                <td>{charger.distance.toFixed(2)} mi</td>
                <td>
                  <a
                    href={`http://maps.google.com/maps?daddr=${charger.latitude},${charger.longitude}`}
                    target="_blank"
                  >
                    {charger.address}
                  </a>
                </td>
              </tr>
            ) : (
              <tr key={i}>
                <td colSpan={4}>
                  <h5 className="mt-2">Click plug to start</h5>
                  <div className="row justify-content-around">
                    {charger.portList.map((port, i) => (
                      <div
                        key={i}
                        className="card mb-2"
                        onClick={() => startCharger(car.id, port.id)}
                      >
                        <div className="charger-body">
                          <div className="text-center card-title">
                            {port.type} charger
                          </div>
                          <div className="text-center mt-1 mb-1">
                            <Station className="charger-icon" />
                          </div>
                          <div className="text-center">{port.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ),
          )}
        </table>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 d-flex justify-content-between">
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

export default connect(mapStateToProps, mapDispatchToProps)(Chargers);
