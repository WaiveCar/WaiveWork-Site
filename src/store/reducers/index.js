import { combineReducers } from 'redux';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';
import menuReducer from './menuReducer';
import carReducer from './carReducer';
import chargerReducer from './chargerReducer';
import bookingReducer from './bookingReducer';
import paymentReducer from './paymentReducer';
import formReducer from './formReducer';
import modalReducer from './modalReducer';

const appReducer = combineReducers({
  userReducer,
  snackbarReducer,
  menuReducer,
  carReducer,
  chargerReducer,
  bookingReducer,
  paymentReducer,
  formReducer,
  modalReducer,
});

export default function(state, action) {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
}
