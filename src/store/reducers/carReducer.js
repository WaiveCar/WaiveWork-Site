const initialState = {
  car: null,
  registrationFile: null,
  inspectionFile: null,
  carHistory: [],
  searchResults: [],
  searchComplete: false,
  more: false,
  offset: 0,
};

function carReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_CAR':
      return {
        ...state,
        car: payload.car,
      };
    case 'UPDATE_SEARCH':
      const { results, more, searchComplete } = payload;
      const { searchResults } = state;
      return {
        ...state,
        searchResults: more ? [...searchResults, ...results] : payload.results,
        more: results.length === 10 && true,
        searchComplete: true,
        offset: more ? state.offset + 10 : 10,
        searchComplete: searchComplete && true,
      };
    case 'UPDATE_REGISTRATION':
      return {
        ...state,
        registrationFile: payload.registrationFile,
      };
    case 'UPDATE_INSPECTION':
      return {
        ...state,
        inspectionFile: payload.inspectionFile,
      };
    case 'UPDATE_CAR_HISTORY':
      return {
        ...state,
        carHistory: payload.carHistory,
      };
    default:
      return state;
  }
}

export default carReducer;
