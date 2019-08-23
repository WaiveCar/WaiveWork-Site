import axios from 'axios';
import { showSnackbar } from './snackbarActions';

export const updateCar = (car) => (dispatch) => {
  return dispatch({
    type: 'UPDATE_CAR',
    payload: { car },
  });
};

export const getCarHistory = (carId, booking) => async (dispatch) => {
  let response = await axios.get(
    `/cars/${carId}/history?start=${booking.createdAt}`,
  );
  return dispatch({
    type: 'UPDATE_CAR_HISTORY',
    payload: { carHistory: response.data },
  });
};

export const carCommand = (carId, command) => async (dispatch) => {
  try {
    let response = await axios.get(`/cars/${carId}/${command}`);
    dispatch({ type: 'UPDATE_CAR', payload: { car: response.data } });
  } catch (e) {
    dispatch(showSnackbar(e.response ? e.response.data.message : e, 'error'));
  }
};
