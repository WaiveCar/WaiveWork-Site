export const showModal = (message, type) => (dispatch) => {
  dispatch({
    type: 'SHOW_MODAL',
    payload: {
      message,
      type,
    },
  });
};

export const hideModal = () => (dispatch) => dispatch({ type: 'HIDE_MODAL' });
