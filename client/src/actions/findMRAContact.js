import axios from 'axios';
import { setAlert } from './alert';

import { GET_MRA_CONTACT, GET_MRA_CONTACTS } from './types';

export const getOneContact = contactId => async dispatch => {
  try {
    const res = await axios.get(`/api/getOneMRAContact/${contactId}`);

    dispatch({
      type: GET_MRA_CONTACT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getContact = () => async dispatch => {
  try {
    const res = await axios.get('/api/getMRAContacts');

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
