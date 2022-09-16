import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
// import { Spinner } from 'reactstrap'
import {fetchOrders} from '../../redux/actionCreator'
import SingleOrder from './SingleOrders'
import Spinner from '../Spinner/Spinner'


const mapStateToProps = state =>{
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderError: state.orderError,
    token: state.token,
    userId: state.userId
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  }
}

const Order = (props) => {
  document.title = "BURGER BUILDER || ORDER";
  const isInitialMount = useRef(true);
  useEffect(() => {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    // }else{
    //   // isInitialMount.current = false;
      props.fetchOrders(props.token, props.userId);
    // }
  });
  




  let order = props.orders.map((order, index) =>{
    return <SingleOrder order={order} key={order.id} index={index} />
  }
  )

  let table = null;
  if(props.orderError){
    table = <p className="m-3 p-3 shadow text-center text-danger">Sorry! Failed to load orders.</p>
  }else{
    table = (
      <>
          <table className="table table-dark table-striped mt-5 text-center border">
      <thead>
        <tr>
          <th rowspan="2" scope="col">#</th>
          <th rowspan="2" scope="col">Order ID</th>
          <th  scope="col" colspan="3">Ingredients</th>
          <th rowspan="2" scope="col">Order Time</th>
          <th rowspan="2" scope="col">Payment Type</th>
          <th rowspan="2" scope="col">Phone Number</th>
          <th rowspan="2" scope="col">Address</th>
        </tr>
        <tr>
          <th scope="col">Salad</th>
          <th scope="col">Cheese</th>
          <th scope="col">Meat</th>
        </tr>
      </thead>
      <tbody>
          {order}
        
      </tbody>
      </table>
      </>
    )
  }

  console.log(props.orderError);

  // console.log(props);
  return (
    <>
      {props.orderLoading ? <Spinner/> : table}
    </>
    
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(Order)