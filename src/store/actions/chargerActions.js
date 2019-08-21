import axios from 'axios';

export const fetchChargers = () => async (dispatch) => {
  let chargersResponse = await axios.get(`/chargers/list`);
  console.log('chargers', chargersResponse);
  dispatch({
    type: 'UPDATE_CHARGERS',
    payload: { chargers: chargersResponse.data },
  });
};
