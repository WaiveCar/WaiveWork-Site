const initialState = {
  showSnackbar: false,
  message: null,
  color: 'green',
};

function snackbarReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return {
        showSnackbar: true,
        message: action.message,
        color: action.color,
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
