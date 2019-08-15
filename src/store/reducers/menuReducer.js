const initialState = {
  menuVisible: false,
};

function menuReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW_MENU':
      return {
        menuVisible: true,
      };
    case 'HIDE_MENU':
      return {
        menuVisible: false,
      };
    default:
      return state;
  }
}

export default menuReducer;
