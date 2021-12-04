import {
  REQUEST_ADD_TO_CART,
  SUCCESS_ADD_TO_CART,
  FAIL_ADD_TO_CART,
  SHOW_ADD_TO_CART,
  REQUEST_REMOVE_CART_ITEM,
  SUCCESS_REMOVE_CART_ITEM,
  FAIL_REMOVE_CART_ITEM,
  REQUES_SAVE_SHIPPING_INFO,
  SUCCESS_SAVE_SHIPPING_INFO,
  FAIL_SAVE_SHIPPING_INFO,
  REQUES_SHOW_SHIPPING_INFO,
  SUCCESS_SHOW_SHIPPING_INFO,
  FAIL_SHOW_SHIPPING_INFO
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] },action) => 
{
  switch (action.type) {
    case REQUEST_ADD_TO_CART:
    case REQUEST_REMOVE_CART_ITEM:
      return {
        loadingCart: true,
      }
    case SHOW_ADD_TO_CART:
      return {
        loadingCart: false,
        cartItems: action.payload
      }
    case SUCCESS_ADD_TO_CART:
    case SUCCESS_REMOVE_CART_ITEM:
      return {
        loadingCart: false,
        ...state,
      }
    case FAIL_ADD_TO_CART:
    case FAIL_REMOVE_CART_ITEM:
      return {
        loadingCart: false,
        cartItems: action.payload
      }
    default:
      return state;
  }
};



export const shippingReducer = (
  state = { shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case REQUES_SAVE_SHIPPING_INFO:
    case REQUES_SHOW_SHIPPING_INFO:
      return {
        shiploading: true,
      }
    case SUCCESS_SHOW_SHIPPING_INFO:
      return {
        shiploading: false,
        shippingInfo: action.payload
      }
    case SUCCESS_ADD_TO_CART:
    case SUCCESS_REMOVE_CART_ITEM:
      return {
        shiploading: false,
        ...state,
      }
    case SUCCESS_SAVE_SHIPPING_INFO:
      return {
        shiploading: false,
        shippingInfo: action.payload,
      }
      case FAIL_SHOW_SHIPPING_INFO:
      case FAIL_SAVE_SHIPPING_INFO:
      return {
        ...state,
        shiploading: false
      };
    default:
      return state;
  }
};