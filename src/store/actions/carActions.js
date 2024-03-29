import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { getBookingStats } from './bookingActions';
import { toggleLoading } from './menuActions';

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
  await dispatch(getBookingStats(booking, response.data));
  return dispatch({
    type: 'UPDATE_CAR_HISTORY',
    payload: { carHistory: response.data },
  });
};

export const carCommand = (carId, command) => async (dispatch) => {
  await dispatch(toggleLoading());
  try {
    let response = await axios.get(`/cars/${carId}/${command}`);
    await dispatch({ type: 'UPDATE_CAR', payload: { car: response.data } });
  } catch (e) {
    await dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
  return dispatch(toggleLoading());
};

export const carSearch = (searchText, user, more = false, offset = 0) => async (
  dispatch,
) => {
  await dispatch(toggleLoading());
  try {
    let response = await axios.get(
      `/cars/search/?search=${searchText}&limit=10&offset=${offset}${
        user.organizations.length
          ? `&organizationIds=[${user.organizations
              .map((orgUser) => orgUser.organizationId)
              .join(',')}]`
          : ''
      }`,
    );
    await dispatch({
      type: 'UPDATE_SEARCH',
      payload: { results: response.data, more, searchComplete: true },
    });
  } catch (e) {
    await dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
  return dispatch(toggleLoading());
};

export const clearSearch = () => async (dispatch) => {
  await dispatch({
    type: 'UPDATE_SEARCH',
    payload: { results: [], more: false, searchComplete: false },
  });
};
