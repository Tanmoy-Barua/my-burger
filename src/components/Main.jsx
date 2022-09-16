import React, {useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Header from './Header/Header'
import BurderBuilder from './BurgerBuilder/BurderBuilder'
import Orders from './Order/Order'
import Checkout from './Order/Checkout/Checkout'
import Auth from './Auth/Auth'
import {connect} from 'react-redux'
import {authCheck} from '../redux/AuthActionCreators'
import Logout from './Auth/Logout'

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: ()=>dispatch(authCheck()),
  }
}

const Main = (props) => {

  useEffect(() => {
    props.authCheck()
  })

  let routes = null;
  
  if(props.token === null) {
    routes = (
      <>
      <Routes>
        <Route path="/login" element={<Auth />}/>
        <Route path="*" element={<Navigate to="/login" />}/>

      </Routes>
      </>
      )
    }else{
      routes = (
        <>
        <Routes>
        <Route path="/" exact element={<BurderBuilder />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
        </>
    )
  }
  return (
    <>
        <Header />
        <div className="container">
            {routes}
        </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)