import React from 'react'
import Ingredient from '../Ingredient/Ingredient'

const Burger = () => {
  return (
    <div>
        <Ingredient type="bread-top"/>
        <Ingredient type="Salad"/>
        <Ingredient type="Meat"/>
        <Ingredient type="Meat"/>
        <Ingredient type="Salad"/>
        <Ingredient type="bread-bottom"/>
    </div>
  )
}

export default Burger