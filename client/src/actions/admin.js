import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  GET_USER,
  GET_USERS,
  PROFILE_ERROR
} from './types';

export const getCustomerById = customerId => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/customer/${customerId}`);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUserById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/user/${userId}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getCustomers = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/customers');

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/admin/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const approveCustomer = (customerId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/approveCustomer/${customerId}`);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data
    });

    dispatch(setAlert('User has been Approved Successfully', 'success'));
    history.push('/customers');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const rejectCustomer = (customerId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/rejectCustomer/${customerId}`);

    dispatch({
      type: GET_CUSTOMER,
      payload: res.data
    });

    dispatch(setAlert('User has been Rejected Successfully', 'danger'));
    history.push('/customers');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = userId => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/admin/${userId}`);

      dispatch(setAlert('Account has been permanantly deleted', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
