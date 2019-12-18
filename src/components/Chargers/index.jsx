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
  let expandedCurrent = [];
  current5.forEach((charger) => {
    expandedCurrent.push(charger);
    if (charger.expanded) {
      expandedCurrent.push({ ...charger, isExpansion: true });
    }
  });
  return user && user.currentLocation ? (
    <div className="container">
      <h3>Chargers</h3>
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
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Distance</th>
              <th>Address</th>
            </tr>
          </thead>
          {expandedCurrent.map((charger, i) => (
            <tr key={i}>
              {!charger.isExpansion ? (
                <div
                  className="row justify-content-around"
                  onClick={() => expandChargerLocation(i)}
                >
                  <div>
                    {charger.name}: {charger.distance.toFixed(2)} miles
                  </div>
                  <div>{charger.address}</div>
                </div>
              ) : (
                <td>expansion</td>
              )}

              {/*charger.expanded ? (
                <tr>
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
                </tr>
              ) : (
                <div />
              )*/}
            </tr>
          ))}
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
