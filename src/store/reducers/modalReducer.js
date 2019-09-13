const initialState = {
  showModal: false,
  confirmButton: '',
  confirmFunc: null,
  message: null,
};

function modalReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: true,
        message: payload.message,
        confirmButton: payload.confirmButton,
        confirmFunc: payload.confirmFunc,
      };
    case 'HIDE_MODAL':
      return {
        ...initialState,
        showModal: false,
      };
    default:
      return state;
  }
}

export default modalReducer;
