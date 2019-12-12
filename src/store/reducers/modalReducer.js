const initialState = {
  showModal: false,
  confirmButton: 'Confirm',
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
        confirmFunc: payload.confirmFunc,
        confirmButton: payload.confirmButton,
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        confirmFunc: null,
        showModal: false,
      };
    default:
      return state;
  }
}

export default modalReducer;
