export const updateBooking = (booking) => (dispatch) => {
  return dispatch({ type: 'UPDATE_BOOKING', payload: { booking } });
};
