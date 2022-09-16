import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngratient = igtype =>{
    return {
        type: actionTypes.ADD_INGRATIENT,
        payload: igtype,
    }
}

export const removeIngratient = igtype =>{
    return {
        type: actionTypes.REMOVE_INGRATIENT,
        payload: igtype,
    }
}

export const updatePurchaseable = () =>{
    return {
        type: actionTypes.UPDATE_PURCHASEABLE,
    }
}

export const resetIngratients = () =>{
    return {
        type: actionTypes.RESET_INGRATIENT,
    }
}

export const loadOrders = orders => {
    return{
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDERS_LOAD_FAILED
    }
}


export const fetchOrders = (token, userId) => dispatch => {
    const queryParameter = '&orderBy="userId"&equalTo"'+userId+'"';
    axios.get('https://burger-builder-68ff6-default-rtdb.firebaseio.com/orders.json?auth='+token+queryParameter)
    .then(response => {
        dispatch(loadOrders(response.data));
    })
    .catch(err => {
        dispatch(orderLoadFailed())
    })
}

