import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { showModal } from './modalActions';
import { toggleLoading } from './menuActions';

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
  return dispatch({
    type: 'UPDATE_CHARGERS',
    payload: { chargers },
  });
};

export const startCharger = (car, chargerId) => async (dispatch) => {
  if (!car) {
    return dispatch(
      showSnackbar(
        'You cannot use charging when you are not in a booking',
        'error',
      ),
    );
  }
  dispatch(
    showModal(
      'Are you sure you want to start this charger? The cost will be added to your weekly payment.',
      async () => {
        await dispatch(toggleLoading());
        try {
          if (process.env.NODE_ENV !== 'production') {
            await dispatch(
              showSnackbar(
                'EvGoChargers are not available in development environment.',
                'error',
              ),
            );
            return dispatch(toggleLoading());
          }
          let response = await axios.put(
            `/chargers/start/${car.id}/${chargerId}`,
            {},
          );
          await dispatch(
            showSnackbar(
              'Charger Started! Please wait a few seconds for the charger to respond',
              'success',
            ),
          );
        } catch (e) {
          await dispatch(
            showSnackbar(e.response ? e.response.data.message : e, 'error'),
          );
        }
        return dispatch(toggleLoading());
      },
    ),
  );
};

export const expandChargerLocation = (index) => (dispatch) => {
  return dispatch({ type: 'EXPAND_CHARGER_LOCATION', payload: { index } });
};

export const shiftSelected = (chargers, currentStart, shiftAmount) => (
  dispatch,
) => {
  let newStart = currentStart + shiftAmount;
  if (newStart < 0) {
    newStart = 0;
  }
  if (newStart >= chargers.length) {
    newStart = currentStart;
  }
  return dispatch({
    type: 'SHIFT_SELECTED',
    payload: { currentStart: newStart },
  });
};
