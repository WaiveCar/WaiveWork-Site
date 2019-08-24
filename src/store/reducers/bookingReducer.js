const initialState = {
  currentBooking: null,
};

function bookingReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_BOOKING':
      console.log('payload: ', payload.booking.stats, payload.booking);
      return {
        ...state,
        currentBooking: payload.booking,
      };
    default:
      return state;
  }
}

export default bookingReducer;
