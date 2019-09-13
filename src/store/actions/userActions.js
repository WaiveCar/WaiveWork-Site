import axios from 'axios';
import { Redirect } from 'react-router';
import { fetchChargers } from './chargerActions';
import { showSnackbar } from './snackbarActions';
import { fetchBookingInfo } from './bookingActions';
import { fetchCards } from './paymentActions';
import { updateForm } from './formActions';
import { showModal } from './modalActions';

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
    // TODO: Make sure all old user data is also removed at this point
    return dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  // The state for cars and other items also needs to be modified at this time, not just user state
  dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: false } });
  dispatch({ type: 'RESET_STORE' });
  return dispatch({
    type: 'TOGGLE_AUTH_CHECKED',
    payload: { authChecked: true },
  });
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

export const updateUser = (user, form) => async (dispatch) => {
  if (form) {
    dispatch(
      showModal(
        'Are you sure you want to update your license information?',
        'confirm',
        async () => {
          try {
            let { data } = await axios.put(`/users/${user.id}`, form);
            user = data;
            dispatch(showSnackbar('User Updated', 'success'));
          } catch (e) {
            return dispatch(
              showSnackbar(e.response ? e.response.data.message : e, 'error'),
            );
          }
        },
      ),
    );
  }
  return dispatch({ type: 'UPDATE_USER', payload: { user } });
};

// Pretty much everything that needs fetching on page loading is fetched in this function
export const fetchUserInfo = () => async (dispatch) => {
  try {
    let userResponse = await axios.get('/users/me');
    let user = userResponse.data;
    ['firstName', 'lastName', 'phone', 'email'].forEach((field) =>
      dispatch(updateForm('personalForm', field, user[field])),
    );
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
    dispatch(updateUser(user));
    dispatch(fetchCards(user));
    if (user.booking) {
      dispatch(fetchBookingInfo(user));
    }
    // This step must be below the others because if the file is not there, a 404 is thrown
    let insuranceResponse = await axios.get(
      `/files?userId=${user.id}&collectionId=insurance&limit=1`,
    );
    dispatch({
      type: 'UPDATE_INSURANCE',
      payload: { insuranceFiles: insuranceResponse.data },
    });
    let licenseResponse = await axios.get(`/licenses?userId=${user.id}`);
    if (licenseResponse.data.length) {
      [
        'firstName',
        'lastName',
        'state',
        'number',
        'birthDate',
        'expirationDate',
      ].forEach((field) => {
        if (
          ['birthDate', 'expirationDate'].includes(field) &&
          licenseResponse.data[0][field]
        ) {
          licenseResponse.data[0][field] = licenseResponse.data[0][field].split(
            'T',
          )[0];
        }
        dispatch(
          updateForm(
            'licenseForm',
            field,
            licenseResponse.data[0][field]
              ? licenseResponse.data[0][field]
              : '',
          ),
        );
      });
      dispatch({
        type: 'UPDATE_LICENSE',
        payload: { license: licenseResponse.data[0] },
      });
    }
    return dispatch({ type: 'TOGGLE_USER_RESOURCES_LOADED' });
  } catch (e) {
    console.log('error fetching me', e.response ? e.response : e);
  }
};

export const updateLicense = (license, form) => async (dispatch) => {
  dispatch(
    showModal(
      'Are you sure you want to update your license information?',
      'confirm',
      async () => {
        try {
          let { data } = await axios.put(`/licenses/${license.id}`, form);
          dispatch({
            type: 'UPDATE_LICENSE',
            payload: { license: data },
          });
        } catch (e) {
          return dispatch(
            showSnackbar(e.response ? e.response.data.message : e, 'error'),
          );
        }
      },
    ),
  );
};
