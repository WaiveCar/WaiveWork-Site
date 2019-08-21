const initialState = {
  car: null,
  registrationFile: null,
  inspectionFile: null,
};

function carReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_CAR':
      return {
        ...state,
        car: payload.car,
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
    default:
      return state;
  }
}

export default carReducer;
