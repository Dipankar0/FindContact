import {
  GET_MRA_CONTACT,
  GET_MRA_CONTACTS,
  GET_MRA_DESIGNATIONS,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = { contact: null, contacts: [], designations: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MRA_CONTACT:
      return { ...state, contact: payload };
    case GET_MRA_CONTACTS:
      return { ...state, contacts: payload };
    case GET_MRA_DESIGNATIONS:
      return { ...state, designations: payload };
    case CLEAR_PROFILE:
      return {
        ...state,
        contact: null,
        contacts: [],
        designations: []
      };
    default:
      return state;
  }
}
