import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../../config';
console.log('config', config);

function MapHolder({ initialCenter, markers, google }) {
  return (
    <div>
      <Map google={google} initial />
    </div>
  );
}

export default GoogleApiWrapper({ apiKey: config.mapsKey })(MapHolder);
