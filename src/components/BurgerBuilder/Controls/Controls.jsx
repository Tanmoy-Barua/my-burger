import React from 'react'



const controls = [
    {label: 'Salad', type: 'Salad'},
    {label: 'Cheese', type: 'Cheese'},
    {label: 'Meat', type: 'Meat'}
];

const BuildControl = (props) => {
    return (
        <div className="d-flex my-1">
            <div className="me-auto ms-5 bolder fw-bolder"> {props.label} </div>
            <button className="btn btn-danger mx-1" onClick={props.remove}> <i className="fa-solid fa-minus"></i> </button>
            <button className="btn btn-success mx-1" onClick={props.added}> <i className="fa-solid fa-add"></i> </button>
        </div>
    )
}


const Controls = (props) => {
  return (
    <div className="container ml-md-5 text-center">
        <div className="card text-center my-4">
            <div className="card-header navbar-bg-color">Add Ingredients</div>
            <div className="card-body">
            {
                controls.map(item => {
                    return <BuildControl key={Math.random()} label={item.label} type={item.type} added={() => props.addIngratient(item.type)} remove={()=>props.removeIngratient(item.type)} />
                })
            }
            </div>
            <div className="card-footer">
              <h5>Price: {props.price} BDT</h5>
              <button type="button" className="btn navbar-bg-color" data-bs-toggle="modal" data-bs-target="#priceModal" onClick={props.clicks} disabled={!props.purchaseable}>
                  Place Order
              </button>
            </div>
        </div>
    </div>
  )
}

export default Controls