import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapHolder from '../../MapHolder';

function ChargerInfo({ user, nearest5 }) {
  return user && user.currentLocation ? (
    <div>
      <MapHolder
        initialCenter={user.currentLocation.coords}
        markers={nearest5}
      />
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
