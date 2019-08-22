import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../../config';
console.log('config', config);

function MapHolder() {
  return <div>Map Holder</div>;
}

export default GoogleApiWrapper({ apiKey: config.mapsKey })(MapHolder);
