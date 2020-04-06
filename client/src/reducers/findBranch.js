import { GET_BRANCHES, CLEAR_PROFILE } from '../actions/types';

const initialState = { branches: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRANCHES:
      return { ...state, branches: payload };
    case CLEAR_PROFILE:
      return {
        ...state,
        branches: []
      };
    default:
      return state;
  }
}
