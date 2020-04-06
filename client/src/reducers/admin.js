import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  GET_USER,
  GET_USERS,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  customer: null,
  adminUser: null,
  customers: [],
  adminUsers: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER:
      return {
        ...state,
        customer: payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        adminUser: payload,
        loading: false
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        adminUsers: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        adminUser: null,
        customer: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        customers: [],
        adminUsers: [],
        adminUser: null,
        customer: null,
        loading: false
      };
    default:
      return state;
  }
}
