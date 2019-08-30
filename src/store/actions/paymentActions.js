import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { updateBooking, getBookingStats } from './bookingActions';

export const groupCurrentBookingPayments = (payments) => async (dispatch) => {
  const table = {};
  for (let payment of payments) {
    if (payment.refId) {
      if (!table[payment.refId]) {
        table[payment.refId] = [];
      }
      table[payment.refId].push(payment);
    } else {
      if (!table[payment.id]) {
        table[payment.id] = [];
      }
      table[payment.id].push(payment);
    }
  }
  let paymentArray = Object.values(table)
    .map((paymentGroup) => paymentGroup)
    .reverse();
  return dispatch({
    type: 'UPDATE_PAYMENTS',
    payload: { payments: paymentArray },
  });
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

export const retryPayment = (paymentId, lateFees, allPayments) => async (
  dispatch,
) => {
  try {
    let response = await axios.post(`/shop/retryPayment/${paymentId}`, {
      lateFees: lateFees,
    });
    return dispatch(
      groupCurrentBookingPayments([...allPayments, response.data]),
    );
  } catch (e) {
    dispatch(
      groupCurrentBookingPayments([...allPayments, e.response.data.data]),
    );
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};

export const fetchCards = (user) => async (dispatch) => {
  // if user hasn't already been added to stripe, they need to be
  if (!user.stripeId) {
    await axios.post(`/shop/customers`, {
      userId: user.id,
      customer: { description: 'WaiveCar customer registered via web.' },
    });
  }
  let { data } = await axios.get(`shop/cards?userId=${user.id}`);
  return dispatch({ type: 'UPDATE_CARDS', payload: { cards: data } });
};

export const addCard = (user, form) => async (dispatch) => {
  try {
    let { data } = await axios.post('/shop/cards', {
      userId: user.id,
      card: form,
    });
    return dispatch({ type: 'ADD_CARD', payload: { card: data } });
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};

export const deleteCard = (cardId, index) => async (dispatch) => {
  try {
    let deleteResponse = await axios.delete(`/shop/cards/${cardId}`);
    console.log('deleteResponse', deleteResponse);
    return dispatch({ type: 'DELETE_CARD', payload: { index } });
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};
