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
    case 'SELECT_CARD':
      let idx = state.cards.findIndex((card) => payload.card.id === card.id);
      let temp = state.cards.map((card) => {
        delete card.selected;
        return card;
      });
      temp[idx].selected = true;
      return {
        ...state,
        cards: temp,
      };
    case 'ADD_CARD':
      return {
        ...state,
        cards: [...state.cards, payload.card],
      };
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.splice(payload.index - 1, 1),
      };
    default:
      return state;
  }
}

export default paymentReducer;
