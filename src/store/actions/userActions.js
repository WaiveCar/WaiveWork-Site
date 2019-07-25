export const updateForm = (formName, field, value) => dispatch =>
  dispatch({ type: "UPDATE_FORM", payload: { formName, field, value } });
