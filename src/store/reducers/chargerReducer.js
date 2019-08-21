const initialState = {
  chargers: [],
};

function carReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_CHARGERS':
      return {
        ...state,
        chargers: payload.chargers,
      };
    default:
      return state;
  }
}

export default carReducer;
