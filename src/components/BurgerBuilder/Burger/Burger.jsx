import React from 'react'
import Ingredient from '../Ingredient/Ingredient'

const Burger = (props) => {
  let ingredientArr = props.ingredient.map(item=>{
    let amount = [...Array(item.amount).keys()];
    return amount.map(_ => {
        return <Ingredient key={Math.random()} type={item.type} />
    })
  })
  .reduce((acc, item) =>{
    return acc.concat(item)
  },[])
  if(ingredientArr.length === 0){
    ingredientArr = <p className="text-danger">Please Add Some Ingredients</p>
  }
  return (
    <div className="Burger">
        <Ingredient type="bread-top"/>
        {ingredientArr}
        <Ingredient type="bread-bottom"/>
    </div>
  )
}

export default Burger