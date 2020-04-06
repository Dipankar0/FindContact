import { GET_CONTACT, GET_CONTACTS, CLEAR_PROFILE } from '../actions/types';

const initialState = { contact: null, contacts: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACT:
      return { ...state, contact: payload };
    case GET_CONTACTS:
      return { ...state, contacts: payload };
    case CLEAR_PROFILE:
      return {
        ...state,
        contact: null,
        contacts: []
      };
    default:
      return state;
  }
}
