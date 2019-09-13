export const showModal = (message, confirmButton, confirmFunc) => (
  dispatch,
) => {
  dispatch({
    type: 'SHOW_MODAL',
    payload: {
      confirmFunc: async () => (confirmFunc(), dispatch(hideModal())),
      message,
      confirmButton,
    },
  });
};

export const hideModal = () => (dispatch) => dispatch({ type: 'HIDE_MODAL' });
