import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL
} from '../constants/userConstants'

export const CLEAR_ERRORS = "CLEAR_ERRORS"

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/account/login/`, { username, password }, config)
        localStorage.setItem("user-details", JSON.stringify(data));
        // console.log('login', data)
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
        // console.log(error)
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.detail })
    }
}


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post(`/api/account/register/`, userData, config)
        localStorage.setItem("user-details", JSON.stringify(data));
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.detail })
    }
}

// Load user
export const loadUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/account/finduser/`, { token }, config)
        // console.log('loadUser',data)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data[0] })
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.detail })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response })
    }
}



export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${userInfo && userInfo.access}`} }
        const { data } = await axios.put(`/api/account/profile/update/`, userData, config)
        // // console.log("userProfile", data)
        // localStorage.setItem("user-details", JSON.stringify(data));
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.detail })
    }
}


// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const userInfo = JSON.parse(localStorage.getItem('user-details'))
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${userInfo && userInfo.token}` } };
  
      const { data } = await axios.put(
        `/api/account/passwordupdate/`,
        passwords,
        config
      );
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//error none ke kaam
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
