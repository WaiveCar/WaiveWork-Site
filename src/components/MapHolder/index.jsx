import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import config from '../../config';

function MapHolder({ initialCenter, markers, google }) {
  return (
    <div>
      <Map google={google} initialCenter={initialCenter} zoom={10}>
        <Marker title={'Your location'} />
        {markers.map((item, i) => (
          <Marker
            key={i}
            title={item.address}
            position={{
              lat: Number(item.latitude),
              lng: Number(item.longitude),
            }}
          />
        ))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({ apiKey: config.mapsKey })(MapHolder);
