const initialState = {
  currentBookingPayments: [],
  cards: [],
};

function paymentReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_PAYMENTS':
      return {
        ...state,
        currentBookingPayments: [...payload.payments],
      };
    default:
      return state;
  }
}

export default paymentReducer;
