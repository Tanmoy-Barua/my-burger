import React from 'react'
import Header from './Header/Header'
import BurderBuilder from './BurgerBuilder/BurderBuilder'

const Main = () => {
  return (
    <>
        <Header />
        <div className="container">
            <BurderBuilder />
        </div>
    </>
  )
}

export default Main