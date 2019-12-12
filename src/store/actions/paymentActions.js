import axios from 'axios';
import { showSnackbar } from './snackbarActions';
import { updateBooking, getBookingStats } from './bookingActions';
import { showModal } from './modalActions';
import moment from 'moment';

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
  let warningRow = [{ isWarning: true }];
  for (let i = 0; i < paymentArray.length; i++) {
    if (moment(paymentArray[i][0].createdAt).isBefore('2019-08-23')) {
      paymentArray.splice(i, 0, warningRow);
      break;
    }
  }
  let retryablePayments = paymentArray.filter(
    (payment) => payment[payment.length - 1].canRetry,
  );
  return dispatch({
    type: 'UPDATE_PAYMENTS',
    payload: { payments: paymentArray, retryablePayments },
  });
};

export const advancePayment = (booking, carHistory) => async (dispatch) => {
  dispatch(
    showModal(
      'Are you sure you want to make your payment in advance?',
      async () => {
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
      },
    ),
  );
};

export const retryPayment = (paymentId, lateFees, allPayments) => async (
  dispatch,
) => {
  dispatch(
    showModal('Are you sure you want to retry your payment?', async () => {
      try {
        let response = await axios.post(`/shop/retryPayment/${paymentId}`, {
          lateFees: lateFees,
        });
        return dispatch(
          groupCurrentBookingPayments([...allPayments, response.data]),
        );
      } catch (e) {
        return dispatch(
          showSnackbar(e.response ? e.response.data.message : e, 'error'),
        );
      }
    }),
  );
};

export const fetchCards = (user) => async (dispatch) => {
  // If user hasn't already been added to stripe, they need to be
  if (!user.stripeId) {
    await axios.post(`/shop/customers`, {
      userId: user.id,
      customer: { description: 'WaiveCar customer registered via web.' },
    });
  }
  let { data } = await axios.get(
    `shop/cards?userId=${user.id}&showSelected=true`,
  );
  return dispatch({ type: 'UPDATE_CARDS', payload: { cards: data } });
};

export const addCard = (user, form) => async (dispatch) => {
  try {
    let { data } = await axios.post('/shop/cards', {
      userId: user.id,
      card: form,
    });
    await dispatch({ type: 'ADD_CARD', payload: { card: data } });
    return dispatch({ type: 'SELECT_CARD', payload: { card: data } });
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};

export const deleteCard = (cardId, index) => async (dispatch) => {
  try {
    let deleteResponse = await axios.delete(`/shop/cards/${cardId}`);
    return dispatch({ type: 'DELETE_CARD', payload: { index } });
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};

export const selectCurrentlyUsedCard = (cardId) => async (dispatch) => {
  // Currently when our api looks for which card to use, it just selects the most recently updated
  // though this api call is not meant to be used to select the currently used card,
  // it will modify the updated_at field of the card so that it is the currently used one
  try {
    let { data } = await axios.put(`/shop/cards/${cardId}`, {});
    data.selected = true;
    return dispatch({ type: 'SELECT_CARD', payload: { card: data } });
  } catch (e) {
    return dispatch(
      showSnackbar(e.response ? e.response.data.message : e, 'error'),
    );
  }
};
