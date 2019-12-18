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
      let expandedCurrent = [];
      state.current5.forEach((charger, i) => {
        if (!charger.isExpansion) {
          expandedCurrent.push(charger);
          if (i === payload.index) {
            expandedCurrent.push({ ...charger, isExpansion: true });
          }
        }
      });
      return {
        ...state,
        current5: expandedCurrent,
      };
    case 'SHIFT_SELECTED':
      return {
        ...state,
        currentStart: payload.currentStart,
        current5: state.allChargers.slice(
          payload.currentStart,
          payload.currentStart + 5,
        ),
      };
    default:
      return state;
  }
}

export default chargerReducer;
