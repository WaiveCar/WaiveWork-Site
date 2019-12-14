import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import config from '../../config';

function MapHolder({ initialCenter, markers, google, zoom }) {
  return (
    <div>
      <Map
        google={google}
        initialCenter={initialCenter}
        zoom={zoom}
        disableDefaultUI
      >
        <Marker title={'Your location'} />
        {markers.map((item, i) => (
          <Marker
            onClick={
              () => null
              /*
              window.open(
                `http://maps.google.com/maps?daddr=${item.latitude},${item.longitude}`,
                '_blank',
              )*/
            }
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
