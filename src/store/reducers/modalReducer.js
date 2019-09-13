const initialState = {
  showModal: true,
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
