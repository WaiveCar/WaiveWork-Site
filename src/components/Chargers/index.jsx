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
    <div className="container mt-4">
      <h1>Chargers</h1>
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
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Distance</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          {current5.map((charger, i) =>
            !charger.isExpansion ? (
              <tr key={i} onClick={() => expandChargerLocation(i)}>
                <td>{charger.id}</td>
                <td>{charger.name}</td>
                <td>{charger.distance.toFixed(2)} mi</td>
                <td>{charger.address}</td>
              </tr>
            ) : (
              <tr key={i}>
                <td colSpan={4}>
                  Expansion
                  <div className="row justify-content-around">
                    {charger.portList.map((port, i) => (
                      <div
                        key={i}
                        onClick={() => startCharger(car.id, port.id)}
                      >
                        {port.name}: {port.type}
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

export default connect(mapStateToProps, mapDispatchToProps)(Chargers);
