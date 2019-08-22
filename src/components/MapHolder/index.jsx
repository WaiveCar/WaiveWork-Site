import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import config from '../../config';
console.log('config', config);

function MapHolder({ initialCenter, markers, google, elWidth }) {
  console.log('markers', markers);
  return (
    <div className="row">
      <Map className={elWidth} google={google} initialCenter={initialCenter}>
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
