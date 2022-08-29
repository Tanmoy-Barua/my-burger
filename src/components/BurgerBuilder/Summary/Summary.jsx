import React from 'react'

const Summary = (props) => {
    
    const ingredientSummary = props.ingredients.map(item => {
        
        return (
            <li key={item.type}>
                <span className="text-uppercase">{item.type}</span>: 
                <span className="text-uppercase"> {item.amount}</span>
            </li>
        )
    })
  return (
    <div>
        <ol>
            {ingredientSummary}
        </ol>
    </div>
  )
}

export default Summary