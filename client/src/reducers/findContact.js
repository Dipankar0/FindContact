import { GET_CONTACT, GET_CONTACTS } from '../actions/types';

const initialState = { contact: null, contacts: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACT:
      return { ...state, contact: payload };
    case GET_CONTACTS:
      return { ...state, contacts: payload };
    default:
      return state;
  }
}
