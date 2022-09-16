import React, {useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import {logout} from '../../redux/AuthActionCreators'

const mapDispatchtoProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}


const Logout = (props) => {

    useEffect(()=>{
        props.logout()
    })

  return (
    <Navigate to='/'/>
  )
}

export default connect(null, mapDispatchtoProps)(Logout)