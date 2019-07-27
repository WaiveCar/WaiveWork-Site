import axios from 'axios';

export const updateForm = (formName, field, value) => (dispatch) =>
  dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });

export const login = (email, password) => (dispatch) => {
  axios
    .post(axios.defaults.baseUrl + '/auth/login', { email, password })
    .then((response) => console.log('response'))
    .catch((e) => console.log('error logging in', e));
};
