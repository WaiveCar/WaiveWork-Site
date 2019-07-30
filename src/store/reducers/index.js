import { combineReducers } from 'redux';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  userReducer,
  snackbarReducer,
});
