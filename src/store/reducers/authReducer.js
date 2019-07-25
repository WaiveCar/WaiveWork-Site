const initialState = {
  form: {
    email: "",
    password: ""
  },
  loggedIn: false
};

function authReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case "UPDATE_FORM":
      const { form } = state;
      return {
        ...state,
        form: {
          ...form,
          [payload.field]: payload.value
        }
      };
    default:
      return state;
  }
}

export default authReducer;
