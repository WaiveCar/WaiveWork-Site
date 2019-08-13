export const showSnackbar = (message) => (dispatch) =>
  dispatch({
    type: 'SHOW_SNACKBAR',
    payload: {
      message,
      type: 'error',
    },
  });

export const hideSnackbar = () => (dispatch) =>
  dispatch({ type: 'HIDE_SNACKBAR' });
