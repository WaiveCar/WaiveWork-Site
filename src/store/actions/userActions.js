import axios from 'axios';
import { Redirect } from 'react-router';

export const updateForm = (formName, field, value) => (dispatch) =>
  dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });

export const verifyAuth = (history, pathName) => (dispatch) => {
  let token = localStorage.getItem('token');
  if (token) {
    axios
      .get('/auth/validate', { headers: { Authorization: token } })
      .then((response) => {
        dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
        history.push(pathName);
        axios.defaults.headers.common['Authorization'] = token;
        return dispatch({
          type: 'TOGGLE_AUTH_CHECKED',
          payload: { authChecked: true },
        });
      })
      .catch((e) => {
        return dispatch({
          type: 'TOGGLE_AUTH_CHECKED',
          payload: { authChecked: true },
        });
      });
  } else {
    return dispatch({
      type: 'TOGGLE_AUTH_CHECKED',
      payload: { authChecked: true },
    });
  }
};

export const login = (email, password) => (dispatch) => {
  axios
    .post('/auth/login', {
      identifier: email,
      password,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = response.data.token;
      return dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: true } });
    })
    .catch((e) =>
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: { message: e.response.data.message, type: 'danger' },
      }),
    );
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'TOGGLE_LOGIN', payload: { loggedIn: false } });
};
