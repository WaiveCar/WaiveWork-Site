const initialState = {
  allChargers: [],
  nearest5: [],
};

function carReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_CHARGERS':
      return {
        ...state,
        allChargers: payload.chargers,
        nearest5: payload.chargers.slice(0, 5),
      };
    default:
      return state;
  }
}

export default carReducer;
