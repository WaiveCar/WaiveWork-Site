const initialState = {
  authForm: {
    email: '',
    password: '',
  },
  loggedIn: false,
  authChecked: false,
};

function userReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_FORM':
      const { form } = state;
      return {
        ...state,
        [payload.formName]: {
          ...state[payload.formName],
          [payload.field]: payload.value,
        },
      };
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        loggedIn: payload.loggedIn,
      };
    case 'TOGGLE_AUTH_CHECKED':
      return {
        ...state,
        authChecked: payload.authChecked,
      };
    default:
      return state;
  }
}

export default userReducer;
