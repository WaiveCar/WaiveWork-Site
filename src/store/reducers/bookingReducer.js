const initialState = {
  booking: null,
};

function bookingReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_BOOKING':
      return {
        ...state,
        booking: payload.booking,
      };
    default:
      return state;
  }
}

export default bookingReducer;
