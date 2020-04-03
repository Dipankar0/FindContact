import { GET_AGENCIES } from '../actions/types';

const initialState = { agencies: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_AGENCIES:
      return { ...state, agencies: payload };
    default:
      return state;
  }
}
