export const showModal = (message, confirmFunc, confirmButton = 'Confirm') => (
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
