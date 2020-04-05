import { GET_MRA_CONTACT, GET_MRA_CONTACTS } from '../actions/types';

const initialState = { contact: null, contacts: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MRA_CONTACT:
      return { ...state, contact: payload };
    case GET_MRA_CONTACTS:
      return { ...state, contacts: payload };
    default:
      return state;
  }
}
