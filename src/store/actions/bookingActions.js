import axios from 'axios';
import { updateCar, getCarHistory } from './carActions';

export const fetchBookingInfo = (user) => async (dispatch) => {
  // This is done instead of fetching by id because this api call already allows inclusion of WaiveworkPayment and details
  let bookingResponse = await axios.get(
    `/bookings?userId=${user.id}&order=id,desc&limit=1&status=reserved,started,ended&details=true&includeWaiveworkPayment=true`,
  );
  let currentBooking = bookingResponse.data[0];
  let { car } = currentBooking;
  dispatch(updateBooking(currentBooking));
  dispatch(updateCar(car));
  dispatch(getCarHistory(car.id, currentBooking.id));
  if (car && car.registrationFileId) {
    let registrationResponse = await axios.get(
      `/files/${car.registrationFileId}`,
    );
    dispatch({
      type: 'UPDATE_REGISTRATION',
      payload: { registrationFile: registrationResponse.data },
    });
  }
  if (car && car.inspectionFileId) {
    let inspectionResponse = await axios.get(`/files/${car.inspectionFileId}`);
    dispatch({
      type: 'UPDATE_INSPECTION',
      payload: { inspectionFile: inspectionResponse.data },
    });
  }
};

export const updateBooking = (booking) => (dispatch) => {
  return dispatch({ type: 'UPDATE_BOOKING', payload: { booking } });
};
