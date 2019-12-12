export const showSnackbar = (message, type) => (dispatch) => {
  return dispatch({
    type: 'SHOW_SNACKBAR',
    payload: {
      message,
      type,
    },
  });
};

export const hideSnackbar = () => (dispatch) =>
  dispatch({ type: 'HIDE_SNACKBAR' });
