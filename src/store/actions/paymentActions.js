import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { updateBooking, getBookingStats } from './bookingActions';

export const groupCurrentBookingPayments = (payments) => async (dispatch) => {
  const table = {};
  for (let payment of payments) {
    table[payment.id] = [...table[payment.id], payment] || [payment];
  }
  console.log('array from', Array.from(table));
};

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
