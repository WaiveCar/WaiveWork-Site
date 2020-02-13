export const updateForm = (formName, field, value) => (dispatch) => {
  return dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });
};

export const clearForm = (formName) => (dispatch) => {
  return dispatch({ type: 'CLEAR_FORM', payload: { formName } });
};

export const handlePageChange = (form) => (dispatch) => {
  form.classList.remove('was-validated');
  form.querySelectorAll('input').forEach((one) => {
    if (!one.value) {
      one.classList.remove('is-valid');
      one.parentNode.classList.remove('was-validated');
      one.classList.remove('input-focus');
      one.nextSibling.classList.remove('display-block');
      one.nextSibling.nextSibling.classList.remove('display-block');
    } else {
      one.classList.add('input-focus');
      if (one.checkValidity() && one.nextSibling.nextSibling) {
        one.nextSibling.nextSibling.classList.add('display-block');
      } else {
        one.nextSibling.classList.add('display-block');
      }
    }
  });
};
