import axios from 'axios';

export const carCommand = (carId, command) => async (dispatch) => {
  try {
    let response = await axios.get(`/cars/${carId}/${command}`);
    dispatch({ type: 'UPDATE_CAR', payload: { car: response.data } });
  } catch (e) {
    dispatch({
      type: 'SHOW_SNACKBAR',
      payload: {
        message: e.response ? e.response.data.message : e,
        type: 'error',
      },
    });
  }
};
