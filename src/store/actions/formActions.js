export const updateForm = (formName, field, value) => (dispatch) => {
  return dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });
};

export const clearForm = (formName) => (dispatch) => {
  return dispatch({ type: 'CLEAR_FORM', payload: { formName } });
};

export const handlePageChange = (form) => (dispatch) => {
  form.classList.remove('was-validated');
  form.querySelectorAll('input').forEach((one) => {
    if (one.type !== 'radio') {
      one.classList.remove('is-valid');
      one.parentNode.classList.remove('was-validated');
      one.classList.remove('input-focus');
      if (one.nextSibling && one.nextSibling.nodeType !== 3) {
        one.nextSibling.classList.remove('display-block');
      }
      if (
        one.nextSibling &&
        one.nextSibling.nextSibling &&
        one.nextSibling.nextSibling.nodeType !== 3
      ) {
        one.nextSibling.nextSibling.classList.remove('display-block');
      }
      if (one.value) {
        one.classList.add('input-focus');
        if (one.checkValidity() && one.nextSibling.nextSibling) {
          one.nextSibling.nextSibling.classList.add('display-block');
        } else {
          if (one.nextSibling && one.nextSibling.nodeType !== 3) {
            one.nextSibling.classList.add('display-block');
          }
        }
      }
    }
  });
};
