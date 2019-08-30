export const updateForm = (formName, field, value) => (dispatch) => {
  return dispatch({ type: 'UPDATE_FORM', payload: { formName, field, value } });
};
