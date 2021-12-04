import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
} from '../constants/orderConstants'

export const orderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
    case ORDER_HISTORY_REQUEST:
      return {
        loadingOrder: true,
      }
    case ORDER_SUCCESS:
    case ORDER_HISTORY_SUCCESS:
      return {
        loadingOrder: false,
        order: action.payload
      }
    case ORDER_FAIL:
    case ORDER_HISTORY_FAIL:
      return {
        ...state,
        loadingOrder: false,
        ...state,
      }
    default:
      return state;
  }
};
