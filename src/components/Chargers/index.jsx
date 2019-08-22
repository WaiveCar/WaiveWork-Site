import React from 'react';
import MapHolder from '../MapHolder';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './chargers.scss';

function Chargers({ user, current5 }) {
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
        {current5.map((charger) => (
          <div className="row justify-content-center">{charger.name}</div>
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
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chargers);
