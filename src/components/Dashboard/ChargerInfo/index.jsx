import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MapHolder from '../../MapHolder';
import './chargerInfo.scss';

function ChargerInfo({ user, nearest5, history }) {
  return user && user.currentLocation ? (
    <div className="container">
      <div className="row justify-content-center">
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
      <div className="row justify-content-center">
        <Link to={'/chargers'}>Click Here</Link> to start charging
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
