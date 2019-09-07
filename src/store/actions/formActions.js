export const updateForm = (formName, field, value) => (dispatch) => {
  return dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });
};

export const clearForm = (formName) => (dispatch) => {
  return dispatch({ type: 'CLEAR_FORM', payload: { formName } });
};
