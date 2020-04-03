import { combineReducers } from 'redux';
import alert from './alert';
import findContact from './findContact';
import findBranch from './findBranch';
import findAgency from './findAgency';

export default combineReducers({
  alert,
  findAgency,
  findContact,
  findBranch
});
