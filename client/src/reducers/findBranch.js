import { GET_BRANCHES } from '../actions/types';

const initialState = { branches: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRANCHES:
      return { ...state, branches: payload };
    default:
      return state;
  }
}
