import axios from 'axios';
import { Redirect } from 'react-router';
import { fetchChargers } from './chargerActions';
import { showSnackbar } from './snackbarActions';
import { updateBooking } from './bookingActions';
import { updateCar } from './carActions';

export const updateForm = (formName, field, value) => (dispatch) =>
  dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });

export const verifyAuth = (history, pathName) => async (dispatch) => {
  let token = localStorage.getItem('token');
  if (token) {
    try {
      let repsponse = await axios.get('/auth/validate', {
        headers: { Authorization: token },
      });
      dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
      history.push(pathName);
      axios.defaults.headers.common['Authorization'] = token;
      return dispatch({
        type: 'TOGGLE_AUTH_CHECKED',
        payload: { authChecked: true },
      });
    } catch (e) {
      return dispatch({
        type: 'TOGGLE_AUTH_CHECKED',
        payload: { authChecked: true },
      });
    }
  } else {
    return dispatch({
      type: 'TOGGLE_AUTH_CHECKED',
      payload: { authChecked: true },
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    let response = await axios.post('/auth/login', {
      identifier: email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = response.data.token;
    dispatch({ type: 'CLEAR_FORM', payload: { formName: 'authForm' } });
    return dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
  } catch (e) {
    dispatch(showSnackbar(e.response ? e.response.data.message : e, 'error'));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: false } });
};

export const changeSignupPage = (newPage) => (dispatch) => {
  return dispatch({
    type: 'CHANGE_SIGNUP_PAGE',
    payload: { selectedSignupPage: newPage },
  });
};

export const signup = (form, history) => async (dispatch) => {
  try {
    let response = await axios.post('/waitlist/add', form);
    history.push('/thanks');
  } catch (e) {
    dispatch(showSnackbar(e.response ? e.response.data.message : e, 'error'));
  }
};

export const fetchUserInfo = () => async (dispatch) => {
  try {
    let userResponse = await axios.get('/users/me');
    let user = userResponse.data;
    try {
      let location = await new Promise((resolve, reject) => {
        navigator.geolocation
          ? navigator.geolocation.getCurrentPosition(
              (pos) => resolve(pos),
              (err) => reject(err),
            )
          : reject('This browser does not suppor geolocation');
      });
      user.currentLocation = location;
      dispatch(fetchChargers(location.coords));
    } catch (e) {
      dispatch(showSnackbar(e.message, 'error'));
    }
    dispatch({ type: 'UPDATE_USER', payload: { user } });
    if (user.booking) {
      // This is done instead of retching by id because this api call already allows inclusion of WaiveworkPayment and details
      let bookingResponse = await axios.get(
        `/bookings?userId=${user.id}&order=id,desc&limit=1&status=reserved,started,ended&details=true&includeWaiveworkPayment=true`,
      );
      let currentBooking = bookingResponse.data[0];
      dispatch(updateBooking(currentBooking));
      let { car } = currentBooking;
      if (car && car.registrationFileId) {
        let registrationResponse = await axios.get(
          `/files/${car.registrationFileId}`,
        );
        dispatch(updateCar(car));
        dispatch({
          type: 'UPDATE_REGISTRATION',
          payload: { registrationFile: registrationResponse.data },
        });
      }
      if (car && car.inspectionFileId) {
        let inspectionResponse = await axios.get(
          `/files/${car.inspectionFileId}`,
        );
        dispatch({
          type: 'UPDATE_INSPECTION',
          payload: { inspectionFile: inspectionResponse.data },
        });
      }
    }
    // This step must be below the others because if the file is not there, a 404 is thrown
    let insuranceResponse = await axios.get(
      `/files?userId=${user.id}&collectionId=insurance&limit=1`,
    );
    dispatch({
      type: 'UPDATE_INSURANCE',
      payload: { insuranceFiles: insuranceResponse.data },
    });
    dispatch({ type: 'TOGGLE_USER_RESOURCES_LOADED' });
  } catch (e) {
    console.log('error fetching me', e.response);
  }
};
