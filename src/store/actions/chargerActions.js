import axios from 'axios';
import { showSnackbar } from './snackbarActions';

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

export const fetchChargers = (currentLocation) => async (dispatch) => {
  let chargersResponse = await axios.get(`/chargers/list`);
  let chargers = chargersResponse.data.map((charger) => {
    charger.distance = distance(
      currentLocation.latitude,
      currentLocation.longitude,
      Number(charger.latitude),
      Number(charger.longitude),
      'M',
    );
    charger.expanded = false;
    return charger;
  });
  chargers.sort((a, b) => a.distance - b.distance);
  dispatch({
    type: 'UPDATE_CHARGERS',
    payload: { chargers },
  });
};

export const startCharger = (carId, chargerId) => async (dispatch) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      dispatch(
        showSnackbar(
          'EvGoChargers are not available in development environment.',
          'error',
        ),
      );
    }
    await axios.get(`${config().API_URL}/chargers/start/${carId}/${chargerId}`);
  } catch (e) {
    dispatch(
      showSnackbar(e.response ? e.response.data.message : e.message, 'error'),
    );
  }
};

export const expandChargerLocation = (index) => (dispatch) => {
  dispatch({ type: 'EXPAND_CHARGER_LOCATION', payload: { index } });
};
