import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './Header/Header'
import BurderBuilder from './BurgerBuilder/BurderBuilder'
import Orders from './Order/Order'
import Checkout from './Order/Checkout/Checkout'

const Main = () => {
  return (
    <>
        <Header />
        <div className="container">
            <Routes>
                <Route path="/" element={<BurderBuilder />}/>
                <Route path="/orders" element={<Orders />}/>
                <Route path="/checkout" element={<Checkout />}/>
            </Routes>
        </div>
    </>
  )
}

export default Main