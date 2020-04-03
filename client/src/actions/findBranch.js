import axios from 'axios';
import { setAlert } from './alert';

import { GET_BRANCHES } from './types';

export const getBranches = agency => async dispatch => {
  try {
    const res = await axios.get(`/api/branches/${agency}`);

    dispatch({
      type: GET_BRANCHES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
