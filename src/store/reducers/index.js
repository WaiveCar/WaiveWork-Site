import { combineReducers } from 'redux';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';
import menuReducer from './menuReducer';
import carReducer from './carReducer';
import chargerReducer from './chargerReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
  userReducer,
  snackbarReducer,
  menuReducer,
  carReducer,
  chargerReducer,
  bookingReducer,
});
