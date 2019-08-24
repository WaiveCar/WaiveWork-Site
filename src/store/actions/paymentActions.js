import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { updateBooking, getBookingStats } from './bookingActions';

export const advancePayment = (booking, carHistory) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/waiveworkPayment/advanceWorkPayment/${booking.id}/`,
    );
    return dispatch(
      updateBooking({ ...booking, waiveworkPayment: response.data }),
    );
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};
