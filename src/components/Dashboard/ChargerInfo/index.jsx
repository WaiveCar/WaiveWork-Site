import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapHolder from '../../MapHolder';
import './chargerInfo.scss';

function ChargerInfo({ user, nearest5 }) {
  return user && user.currentLocation ? (
    <div className="container">
      <div className="charger-map-preview">
        <MapHolder
          initialCenter={{
            lat: user.currentLocation.coords.latitude,
            lng: user.currentLocation.coords.longitude,
          }}
          markers={nearest5}
          elWidth={'col-6'}
        />
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
)(ChargerInfo);
