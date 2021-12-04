import axios from "axios";
import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAIL,
} from '../constants/orderConstants'

//paytem form submit functions
function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
}

function isObj(val) {
    return typeof val === 'object'

}

function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
}

function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', stringifyValue(params[key]))
        form.appendChild(input)
    })

    return form
}
function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
}


const userInfo = JSON.parse(localStorage.getItem('user-details'))
export const payTemOrder = (orderId, customer) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_REQUEST })
        const config = { headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.post(`/api/checkoutpaytem/`, { orderId, customer }, config)
        if (data.status === 200) {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.param_dict
            }
            post(information)
            dispatch({ type: ORDER_SUCCESS, payload: data }, showAllOrders())
        }
        // // console.log('paytem', data.status)

    } catch (error) {
        // // console.log(error)
        dispatch({ type: ORDER_FAIL, payload: error.response.data.detail })
    }
}




export const showAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_HISTORY_REQUEST })
        const { data } = await axios.get(`/api/orders/`, {
            headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` },
        })
        // // console.log('addresh cart data', data.data)
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_HISTORY_FAIL })
    }
}


export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_HISTORY_REQUEST })
        const { data } = await axios.get(`/api/orders/${id}/`, {
            headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` },
        })
        // console.log('order one data', data.data)
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_HISTORY_FAIL })
    }
}


export const orderdelete = (id, cancelOrderTitle) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_HISTORY_REQUEST })
        const config = { headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userInfo.access}` } }
        const { data } = await axios.put(`/api/cencelmyorder/${id}`, { cancelOrderTitle }, config)
        // // console.log('order one data', data.data)
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_HISTORY_FAIL })
    }
}