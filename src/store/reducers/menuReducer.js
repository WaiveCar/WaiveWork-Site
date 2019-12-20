import menuLinks from '../../components/Menu/menuLinks';

const initialState = {
  menuVisible: false,
  menuLinks,
  loading: false,
};

function menuReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SHOW_MENU':
      return {
        ...state,
        menuVisible: true,
      };
    case 'HIDE_MENU':
      return {
        ...state,
        menuVisible: false,
      };
    case 'TOGGLE_MENU_ITEM':
      const { name } = payload;
      return {
        ...state,
        menuLinks: {
          ...state.menuLinks,
          [name]: {
            ...state.menuLinks[name],
            expanded: !state.menuLinks[name].expanded,
          },
        },
      };
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
}

export default menuReducer;
