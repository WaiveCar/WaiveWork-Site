import axios from 'axios';
import moment from 'moment';
import { updateCar, getCarHistory } from './carActions';
import { groupCurrentBookingPayments } from './paymentActions';

export const getBookingStats = (booking, carHistory) => (dispatch) => {
  let startDate = moment(booking.createdAt).format('MM/DD/YYYY');
  let dayOfBooking = moment().diff(moment(booking.createdAt), 'days') + 1;
  let totalMiles = (
    (Number(carHistory[carHistory.length - 1].data) -
      Number(carHistory[0].data)) *
    0.621371
  ).toFixed(2);
  let last30Days = carHistory[carHistory.length - 31]
    ? (
        ((Number(carHistory[carHistory.length - 1].data) -
          Number(carHistory[carHistory.length - 31].data)) /
          30) *
        0.621371
      ).toFixed(2)
    : 'Ride not yet over 30 days';
  let last7Days = carHistory[carHistory.length - 8]
    ? (
        ((Number(carHistory[carHistory.length - 1].data) -
          Number(carHistory[carHistory.length - 8].data)) /
          7) *
        0.621371
      ).toFixed(2)
    : 'Ride not yet over 1 week';
  let lastDay =
    carHistory.length > 1
      ? (
          (Number(carHistory[carHistory.length - 1].data) -
            Number(carHistory[carHistory.length - 2].data)) *
          0.621371
        ).toFixed(2)
      : 'Ride not yet over 1 day';
  let stats = {
    startDate,
    dayOfBooking,
    totalMiles,
    last30Days,
    last7Days,
    lastDay,
  };
  return dispatch(updateBooking({ ...booking, stats }));
};

export const fetchBookingInfo = (user) => async (dispatch) => {
  try {
    // This is done instead of fetching by id because this api call already allows inclusion of WaiveworkPayment and details
    let bookingResponse = await axios.get(
      `/bookings?userId=${user.id}&order=id,desc&limit=1&status=reserved,started,ended&details=true&includeWaiveworkPayment=true&includeLateFees=true`,
    );
    let currentBooking = bookingResponse.data[0];
    let { car } = currentBooking;
    currentBooking.stats = getBookingStats(currentBooking);
    await dispatch(updateBooking(currentBooking));
    await dispatch(updateCar(car));
    await dispatch(getCarHistory(car.id, currentBooking));
    await dispatch(
      groupCurrentBookingPayments(bookingResponse.data[0].payments),
    );
    // Keep the request of these two types of requests at the bottom of this function so the at previous parts don't fail
    if (car && car.registrationFileId) {
      let registrationResponse = await axios.get(
        `/files/${car.registrationFileId}`,
      );
      await dispatch({
        type: 'UPDATE_REGISTRATION',
        payload: { registrationFile: registrationResponse.data },
      });
    }
    if (car && car.inspectionFileId) {
      let inspectionResponse = await axios.get(
        `/files/${car.inspectionFileId}`,
      );
      await dispatch({
        type: 'UPDATE_INSPECTION',
        payload: { inspectionFile: inspectionResponse.data },
      });
    }
  } catch (e) {}
};

export const updateBooking = (booking) => (dispatch) => {
  return dispatch({ type: 'UPDATE_BOOKING', payload: { booking } });
};
