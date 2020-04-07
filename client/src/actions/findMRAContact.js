import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_MRA_CONTACT,
  GET_MRA_CONTACTS,
  GET_MRA_DESIGNATIONS
} from './types';

export const getContacts = designationId => async dispatch => {
  try {
    const res = await axios.get(`/api/getMRAContacts/${designationId}`);

    dispatch({
      type: GET_MRA_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getDesignations = () => async dispatch => {
  try {
    const res = await axios.get('/api/getMRAPositions');

    dispatch({
      type: GET_MRA_DESIGNATIONS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addContact = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    const res = await axios.post('/api/addMRAContact', formData, config);

    dispatch({
      type: GET_MRA_CONTACT,
      payload: res.data
    });
    dispatch(setAlert('Contact details Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
