import axios from 'axios';
import { Redirect } from 'react-router';

export const updateForm = (formName, field, value) => (dispatch) =>
  dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });

export const login = (email, password) => (dispatch) => {
  axios
    .post(axios.defaults.baseUrl + '/auth/login', {
      identifier: email,
      password,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      return dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
    })
    .catch((e) => console.log('error logging in', e.response.data.message));
};

export const verifyAuth = (history) => (dispatch) => {
  let token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .get(axios.defaults.baseUrl + '/auth/validate')
      .then((response) => {
        dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
        history.push('/dashboard');
      })
      .catch((e) => console.log('e', e.response.data));
  }
};
