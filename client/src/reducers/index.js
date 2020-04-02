import { combineReducers } from 'redux';
import alert from './alert';
import findContact from './findContact';

export default combineReducers({
  alert,
  findContact
});
