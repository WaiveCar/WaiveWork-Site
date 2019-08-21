const initialState = {
  car: null,
  registrationFile: null,
  inspectionFile: null,
};

function carReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_REGISTRATION':
      return {
        ...state,
        car: payload.car,
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
