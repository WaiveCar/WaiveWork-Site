import axios from 'axios';
import { Redirect } from 'react-router';

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
    dispatch({
      type: 'SHOW_SNACKBAR',
      payload: {
        message: e.response ? e.response.data.message : e,
        type: 'error',
      },
    });
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

export const signup = (form, history) => (dispatch) => {
  try {
    let response = axios.post('/waitlist/add', form);
    history.push('/thanks');
  } catch (e) {
    dispatch({
      type: 'SHOW_SNACKBAR',
      payload: {
        message: e.response ? e.response.data.message : e,
        type: 'error',
      },
    });
  }
};

export const fetchUserInfo = (userId) => (dispatch) => {
  try {
    let response = axios.get('/users/me').then((response) => {
      dispatch({ type: 'UPDATE_USER', payload: { user: response.data } });
      if (response.data.booking) {
        return axios
          .get(`/bookings/${response.data.booking}`)
          .then((response) => console.log('response for booking', response));
      }
    });
  } catch (e) {
    console.log('error fetching me', e.response);
  }
};
