import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MapHolder from '../../MapHolder';
import './chargerInfo.scss';

function ChargerInfo({ user, nearest5, history, userResourcesLoaded }) {
  return user && user.currentLocation ? (
    <div className="card charger-card">
      <div className="card-body">
        <h5 className="card-title">Chargers</h5>
        <div className="row justify-content-center mt-4">
          <div className="charger-map-preview">
            <MapHolder
              initialCenter={{
                lat: user.currentLocation.coords.latitude,
                lng: user.currentLocation.coords.longitude,
              }}
              markers={nearest5}
              zoom={12}
            />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <Link to={'/chargers'}>Start Charging Now</Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="card charger-card">
      <div className="card-body">
        <h5 className="card-title">Chargers</h5>
        <div>Unable to get current location</div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChargerInfo);
