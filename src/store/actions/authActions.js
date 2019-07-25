export const updateForm = (field, value) => dispatch =>
  dispatch({ type: "UPDATE_FORM", payload: { field, value } });
