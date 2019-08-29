import paymentFormFields from '../../components/Form/paymentFormFields';
import paymentForm from '../../components/Form/paymentForm';

const initialState = {
  currentBookingPayments: [],
  cards: [],
  paymentFormFields: { ...paymentFormFields },
  paymentForm: paymentForm,
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
