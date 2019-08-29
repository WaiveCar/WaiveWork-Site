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
    case 'UPDATE_CARDS':
      return {
        ...state,
        cards: [...payload.cards],
      };
    case 'ADD_CARD':
      return {
        ...state,
        cards: [...state.cards, payload.card],
      };
    default:
      return state;
  }
}

export default paymentReducer;
