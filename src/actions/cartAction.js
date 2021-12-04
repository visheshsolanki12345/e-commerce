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
  FAIL_SHOW_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";


//show cart
const userInfo = JSON.parse(localStorage.getItem('user-details'))
export const showCartData = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ADD_TO_CART })
    const { data } = await axios.get(`/api/showcart`, {
      headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` },
    })
    // // console.log('show cart data', data.data)
    dispatch({ type: SHOW_ADD_TO_CART, payload: data })
  } catch (error) {
    dispatch({ type: FAIL_ADD_TO_CART })
  }
}


// Add to Cart
export const addItemsToCart = (id) => async (dispatch) => {
  dispatch({ type: REQUEST_ADD_TO_CART })
  fetch(`/api/productcart/${id}/`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userInfo && userInfo.access}`
    },
  }).then((result) => {
    // // console.log("Result", result.status)
    if (result.status !== 401)
      result.json().then((resp) => {
        // // console.log("Result", resp)
        if (resp === 201) {
          dispatch({ type: SUCCESS_ADD_TO_CART });
        } else {
          dispatch({ type: FAIL_ADD_TO_CART, payload: result.status });
        }
      })
    else {
      if (result.status === 401) {
        dispatch({ type: FAIL_ADD_TO_CART, payload: result.status });
      }
    }
  })
};



export const incDec = (id, quan) => async (dispatch) => {
  var quantity = quan + 1
  dispatch({ type: REQUEST_ADD_TO_CART })

  // // console.log('..............', quantity)
  let item = { quantity }
  await fetch(`/api/showcart/${id}/`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userInfo && userInfo.access}`,
    },
    body: JSON.stringify(item)
  }).then((result) => {
    // // console.log("Result", result.status)
    result.json().then((resp) => {
      if (resp === 201) {
        dispatch({ type: SUCCESS_ADD_TO_CART });
      } else {
        dispatch({ type: FAIL_ADD_TO_CART });
      }
      // // console.log(resp.data)
    })
  })
}


export const Decriment = (id, quan) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem('user-details'))
  var quantity = quan - 1
  dispatch({ type: REQUEST_ADD_TO_CART })

  // // console.log('..............', quantity)
  let item = { quantity }
  await fetch(`/api/showcart/${id}/`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userInfo && userInfo.access}`,
    },
    body: JSON.stringify(item)
  }).then((result) => {
    // // console.log("Result", result.status)
    result.json().then((resp) => {
      if (resp === 201) {
        dispatch({ type: SUCCESS_ADD_TO_CART });
      } else {
        dispatch({ type: FAIL_ADD_TO_CART });
      }
      // // console.log(resp.data)
    })
  })
}


export const deleteItem = (id) => async (dispatch) => {
  dispatch({ type: REQUEST_REMOVE_CART_ITEM })
  await fetch(`/api/showcart/${id}/`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userInfo && userInfo.access}`,
    },
  }).then((result) => {
    // // console.log("Result", result.status)
    result.json().then((resp) => {
      if (resp.status === 204) {
        dispatch({ type: SUCCESS_REMOVE_CART_ITEM });
      } else {
        dispatch({ type: FAIL_REMOVE_CART_ITEM });
      }
      // // console.log(resp.data)
    })
  })
}


// SAVE SHIPPING INFO
export const showAddresh = () => async (dispatch) => {
  try {
    dispatch({ type: REQUES_SHOW_SHIPPING_INFO })
    const { data } = await axios.get(`/api/address/`, {
      headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` },
    })
    // // console.log('addresh cart data', data.data)
    dispatch({ type: SUCCESS_SHOW_SHIPPING_INFO, payload: data })
  } catch (error) {
    dispatch({ type: FAIL_SHOW_SHIPPING_INFO })
  }
}



// SAVE SHIPPING INFO
export const saveShippingInfo = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REQUES_SAVE_SHIPPING_INFO });
    const config = { headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
    await axios.post(`/api/address/`, userData, config)
    dispatch({ type: SUCCESS_SAVE_SHIPPING_INFO });
  }catch (error) {
    dispatch({ type: FAIL_SAVE_SHIPPING_INFO })
  }
}
  
