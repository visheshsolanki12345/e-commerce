import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    // NEW_REVIEW_REQUEST,
    // NEW_REVIEW_SUCCESS,
    // NEW_REVIEW_FAIL,
    // ALL_REVIEW_REQUEST,
    // ALL_REVIEW_SUCCESS,
    // ALL_REVIEW_FAIL,
} from '../constants/productConstant'


export const getProduct = (keyword = "", currentPage = "", category = "", ratings = "", filterPrice = [0, 25000]) => async (dispatch) => {
    // console.log('pagination', ratings)

    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        let linkProduct = "/api/product/"
        let linkSearch = `/api/product/?keyword=${keyword}&page=1`
        let linkPagination = `/api/product/?page=${currentPage}`
        let linkCategoryPage = `/api/product/?category=${category}&page=${currentPage}`
        let linkRatingSearch = `/api/product/?ratings=${ratings}&page=${currentPage}`
        let linkPriceSearch = `/api/product/?prices=${filterPrice[0]},${filterPrice[1]}&page=${currentPage}`
        // console.log('noPage', ratings)

        //All Product 
        if ((filterPrice[0] !== 0 || filterPrice[1] !== 25000) && currentPage >= 1) {
            const { data } = await axios.get(linkPriceSearch)
            // console.log('Price Page', data)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            })
        }
        if (ratings !== 0 && currentPage >= 1) {
            const { data } = await axios.get(linkRatingSearch)
            // console.log('Rating Page', data)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            })
        }
        if (category === 'All') {
            const { data } = await axios.get(linkPagination)
            // console.log('product all', data)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            })

        } else {
            if (category !== '' && currentPage >= 1) {
                const { data } = await axios.get(linkCategoryPage)
                // console.log('category Page', data)
                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: data,
                })
            }
        }

        if (keyword) {
            const { data } = await axios.get(linkSearch)
            // console.log('search', data)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            })
        }
        if (currentPage !== '' && currentPage >= 2) {
            const { data } = await axios.get(linkPagination)
            // console.log('page', data)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            })
        } else {
            if (!keyword && !category && !ratings && filterPrice[0] === 0 && filterPrice[1] === 25000) {
                const { data } = await axios.get(linkProduct)
                // console.log('product', data)
                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: data,
                })
            }
        }

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.detail,
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/product/${id}/`)
        // console.log('data review',data)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data,
        })
    }
}

const userInfo = JSON.parse(localStorage.getItem('user-details'))

export const newReview = (id, rating, comment) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const config = { headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userInfo.access}` } }
        const { data } = await axios.post(`/api/product/${id}/reviews/`, { rating, comment  }, config)
        // console.log('review data', data)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        // console.log('error', error.response.data)
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload:  error.response.data.detail})
    }
}


//error none ke kaam
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

