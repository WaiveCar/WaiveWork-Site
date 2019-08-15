const initialState = {
  showMenu: false,
};

function menuReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW_MENU':
      return {
        showSnackbar: true,
      };
    case 'HIDE_MENU':
      return {
        showSnackbar: false,
      };
    default:
      return state;
  }
}

export default snackbarReducer;
