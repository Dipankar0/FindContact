import { GET_AGENCIES, CLEAR_PROFILE } from '../actions/types';

const initialState = { agencies: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_AGENCIES:
      return { ...state, agencies: payload };
    case CLEAR_PROFILE:
      return {
        ...state,
        agencies: []
      };
    default:
      return state;
  }
}
