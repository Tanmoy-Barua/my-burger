import React from 'react'

const SingleOrders = (props) => {
    console.log(props);
    
  return (
    <tr key={props.id}>
        <th scope="row">{props.index+1}</th>
        <td>{props.order.id}</td>
        {props.order.ingredients.map((ingredient)=>{
            return <td>{ingredient.amount}</td>
        })}
        <td>{props.order.orderTime}</td>
        <td>{props.order.paymentType}</td>
        <td>{props.order.phoneNumber}</td>
        <td>{props.order.deliveryAddress}</td>
      </tr>
  )
}

export default SingleOrders