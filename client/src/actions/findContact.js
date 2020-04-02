import axios from 'axios';
import { setAlert } from './alert';

import { GET_CONTACT, GET_CONTACTS } from './types';

export const getContact = agency => async dispatch => {
  try {
    const res = await axios.get(`/api/contact/${agency}`);

    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getAllContact = () => async dispatch => {
  try {
    const res = await axios.get('/api/contacts');

    dispatch({
      type: GET_CONTACTS,
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
    const res = await axios.post('/api/addContact', formData, config);

    dispatch({
      type: GET_CONTACT,
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
