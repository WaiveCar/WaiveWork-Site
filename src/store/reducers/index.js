import { combineReducers } from 'redux';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';
import menuReducer from './menuReducer';
import carReducer from './carReducer';

export default combineReducers({
  userReducer,
  snackbarReducer,
  menuReducer,
  carReducer,
});
