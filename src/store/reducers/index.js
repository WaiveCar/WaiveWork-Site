import { combineReducers } from 'redux';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  userReducer,
  snackbarReducer,
  menuReducer,
});
