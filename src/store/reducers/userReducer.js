const initialState = {
  authForm: {
    email: "",
    password: ""
  },
  loggedIn: false
};

function userReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case "UPDATE_FORM":
      const { form } = state;
      return {
        ...state,
        [payload.formName]: {
          ...form,
          [payload.field]: payload.value
        }
      };
    default:
      return state;
  }
}

export default userReducer;
