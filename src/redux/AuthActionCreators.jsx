import * as actionTypes from './actionTypes'

import axios from 'axios'

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = (isLoading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    }
}

export const authFailed = (errorMessage) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errorMessage
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true))
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let authUrl = null;
    if(mode === 'Sign Up'){
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }else{
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const api = `AIzaSyCUXL5ErMsEvokwt7Mk837GfAVZUEr1_zo`;
    axios.post(authUrl +api, authData)
    .then((response) => 
        {
            if(response.status === 200){
                dispatch(authLoading(false))
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            }
        }
    )
    .catch((error) =>{
        dispatch(authLoading(false))
        // console.log(error.response.data.error.message);
        dispatch(authFailed(error.response.data.error.message))
    })
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheck = () => dispatch =>{
    const token = localStorage.getItem('token')
    if(!token){
        // Logout
        dispatch(logout())
    }else{
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if(expirationTime <= new Date()){
            // Logout
            dispatch(logout())
        }else{
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token, userId))
        }
    }
}