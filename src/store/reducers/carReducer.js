const initialState = {
  car: null,
};

function carReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    default:
      return state;
  }
}

export default menuReducer;
