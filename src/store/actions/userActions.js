import axios from 'axios';

export const updateForm = (formName, field, value) => (dispatch) =>
  dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });

export const login = (email, password) => (dispatch) => {
  axios
    .post(axios.defaults.baseUrl + '/auth/login', {
      identifier: email,
      password,
    })
    .then((response) => localStorage.setItem('token', response.data.token))
    .catch((e) => console.log('error logging in', e.response.data.message));
};
