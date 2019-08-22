import React from 'react';
import MapHolder from '../MapHolder';
import {
  startCharger,
  expandChargerLocation,
} from '../../store/actions/chargerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './chargers.scss';

function Chargers({
  user,
  car,
  current5,
  expandChargerLocation,
  startCharger,
}) {
  return user && user.currentLocation ? (
    <div className="container">
      <div className="charger-map row justify-content-center">
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
              <div onClick={() => expandChargerLocation(i)}>{charger.name}</div>
            </div>
            <div className="row justify-content-center">
              {charger.expanded && <div>expanded</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Unable to get current location</div>
  );
}

function mapStateToProps({ userReducer, chargerReducer }) {
  return {
    ...userReducer,
    ...chargerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startCharger, expandChargerLocation }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chargers);
