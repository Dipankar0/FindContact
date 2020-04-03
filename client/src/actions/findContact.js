import axios from 'axios';
import { setAlert } from './alert';

import { GET_CONTACT, GET_CONTACTS, GET_AGENCIES } from './types';

export const getAgencies = () => async dispatch => {
  try {
    const res = await axios.get('/api/agencies');

    dispatch({
      type: GET_AGENCIES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getContact = subAgency => async dispatch => {
  try {
    const res = await axios.get(`/api/contact/${subAgency}`);

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
