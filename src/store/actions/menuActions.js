export const showMenu = () => (dispatch) => dispatch({ type: 'SHOW_MENU' });

export const hideMenu = () => (dispatch) => dispatch({ type: 'HIDE_MENU' });

export const toggleItem = (name) => (dispatch) =>
  dispatch({ type: 'TOGGLE_MENU_ITEM', payload: { name } });

export const toggleLoading = () => (dispatch) =>
  dispatch({ type: 'TOGGLE_LOADING' });
