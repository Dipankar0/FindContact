import { combineReducers } from 'redux';
import admin from './admin';
import auth from './auth';
import alert from './alert';
import findContact from './findContact';
import findBranch from './findBranch';
import findAgency from './findAgency';
import findMRAContact from './findMRAContact';

export default combineReducers({
  admin,
  auth,
  alert,
  findAgency,
  findContact,
  findBranch,
  findMRAContact
});
