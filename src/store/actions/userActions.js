import axios from 'axios';
import { Redirect } from 'react-router';
import { fetchChargers } from './chargerActions';
import { showSnackbar } from './snackbarActions';
import { fetchBookingInfo } from './bookingActions';
import { fetchCards } from './paymentActions';
import { updateForm } from './formActions';
import { showModal } from './modalActions';
import { toggleLoading } from './menuActions';

export const verifyAuth = (history, pathName) => async (dispatch) => {
  let token = localStorage.getItem('token');
  if (token) {
    try {
      let repsponse = await axios.get('/auth/validate', {
        headers: { Authorization: token },
      });
      await dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
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
  await dispatch(toggleLoading());
  try {
    let response = await axios.post('/auth/login', {
      identifier: email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = response.data.token;
    await dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
  } catch (e) {
    await dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
  return dispatch(toggleLoading());
};

export const logout = () => async (dispatch) => {
  await dispatch(toggleLoading());
  localStorage.removeItem('token');
  // The state for cars and other items also needs to be modified at this time, not just user state
  await dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: false } });
  await dispatch({ type: 'RESET_STORE' });
  await dispatch({
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
  await dispatch(toggleLoading());
  try {
    let response = await axios.post('/waitlist/add', form);
    history.push('/thanks');
  } catch (e) {
    await dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
  return dispatch(toggleLoading());
};

export const updateUser = (user, form) => async (dispatch) => {
  await dispatch(toggleLoading());
  if (form) {
    try {
      let { data } = await axios.put(`/users/${user.id}`, form);
      user = data;
      await dispatch(
        showSnackbar(
          'Your information has been successfully updated.',
          'success',
        ),
      );
    } catch (e) {
      await dispatch(
        showSnackbar(e.response ? e.response.data.message : e, 'error'),
      );
    }
  }
  await dispatch({ type: 'UPDATE_USER', payload: { user } });
  return dispatch(toggleLoading());
};

// Pretty much everything that needs fetching on page loading is fetched in this function
export const fetchUserInfo = () => async (dispatch) => {
  await dispatch(toggleLoading());
  try {
    let userResponse = await axios.get('/users/me');
    let user = userResponse.data;
    ['firstName', 'lastName', 'phone', 'email'].forEach(async (field) => {
      await dispatch(updateForm('personalForm', field, user[field]));
    });
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
      await dispatch(fetchChargers(location.coords));
    } catch (e) {
      await dispatch(showSnackbar(e.message, 'error'));
    }
    await dispatch(updateUser(user));
    await dispatch(fetchCards(user));
    if (user.booking) {
      await dispatch(fetchBookingInfo(user));
    }
    // This step must be below the others because if the file is not there, a 404 is thrown
    let insuranceResponse = await axios.get(
      `/files?userId=${user.id}&collectionId=insurance&limit=1`,
    );
    await dispatch({
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
      ].forEach(async (field) => {
        if (
          ['birthDate', 'expirationDate'].includes(field) &&
          licenseResponse.data[0][field]
        ) {
          licenseResponse.data[0][field] = licenseResponse.data[0][field].split(
            'T',
          )[0];
        }
        await dispatch(
          updateForm(
            'licenseForm',
            field,
            licenseResponse.data[0][field]
              ? licenseResponse.data[0][field]
              : '',
          ),
        );
      });
      await dispatch({
        type: 'UPDATE_LICENSE',
        payload: { license: licenseResponse.data[0] },
      });
    }
    await dispatch({ type: 'TOGGLE_USER_RESOURCES_LOADED' });
  } catch (e) {
    console.log('error fetching me', e.response ? e.response : e);
  }
  return dispatch(toggleLoading());
};

export const updateLicense = (license, form) => async (dispatch) => {
  dispatch(
    showModal(
      'Are you sure you want to update your license information?',
      async () => {
        await dispatch(toggleLoading());
        try {
          form.skipCheckr = true;
          let { data } = await axios.put(`/licenses/${license.id}`, form);
          await dispatch({
            type: 'UPDATE_LICENSE',
            payload: { license: data },
          });
          await dispatch(showSnackbar('License Updated'));
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
