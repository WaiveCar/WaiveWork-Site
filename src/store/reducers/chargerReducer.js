const initialState = {
  allChargers: [],
  nearest5: [],
  currentStart: 0,
  current5: [],
};

function chargerReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_CHARGERS':
      let first5 = payload.chargers.slice(0, 5);
      return {
        ...state,
        allChargers: payload.chargers,
        nearest5: first5,
        current5: first5,
      };
    case 'EXPAND_CHARGER_LOCATION':
      let temp = [...state.current5];
      temp[payload.index].expanded = !temp[payload.index].expanded;
      return {
        ...state,
        current5: temp,
      };
    default:
      return state;
  }
}

export default chargerReducer;
