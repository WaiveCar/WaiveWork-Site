const initialState = {
  showSnackbar: false,
  message: null,
  color: 'green',
};

function snackbarReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      let color = payload.type === 'error' ? '#f20d0d' : '#2eab42';
      return {
        showSnackbar: true,
        message: payload.message,
        color,
      };
    case 'HIDE_SNACKBAR':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default snackbarReducer;
