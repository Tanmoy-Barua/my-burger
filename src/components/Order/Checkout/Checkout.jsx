import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux'
import axios from 'axios';
import {resetIngratients} from '../../../redux/actionCreator'
import Spinner from '../../Spinner/Spinner'

const mapStateToProps = state =>{
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchaseAble: state.purchaseAble,
    userId: state.userId,
    token: state.token
  }
}

const mapDispatchtoProps = dispatch =>{
  return {
    resetIngratients: () => dispatch(resetIngratients())
  }
}


const Checkout = (props) => {
  document.title = "BURGER BUILDER || CHECKOUT";
  const navigate = useNavigate();

  const [deliveryAddress, setdeliveryAddress] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [paymentType, setPaymentType] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const orders = {
      ingredients: props.ingredients,
      deliveryAddress: deliveryAddress,
      phoneNumber: phoneNumber,
      paymentType: paymentType,
      orderTime: new Date(),
      userId: props.userId
    }
    
    axios.post('https://burger-builder-68ff6-default-rtdb.firebaseio.com/orders.json?auth='+props.token, orders)
    .then(response => {
      if(response.status === 200) {
        setIsOpen(true)
        setIsLoading(false)
        setModalMessage(<p className="text-success">Ordered Placed Successfully!</p>)
        props.resetIngratients();
      }else{
        setIsOpen(true)
        setIsLoading(false)
        setModalMessage(<p className="text-danger">Something went wrong Ordered not Placed!</p>)
      }
    })
    .catch(err => {
        setIsOpen(true)
        setIsLoading(false)
        setModalMessage('Something went wrong Ordered not Placed!')
    })

    // console.log(respond);
  }

  let form = (
    <>
      <h3>Your Order Details:</h3>
    <h4>Payment: {props.totalPrice} BDT</h4>
      <form className="my-2" onSubmit={handleChangeSubmit}>
        <div className="col-6 mb-3">
          <label htmlFor="exampleInputAddress" className="form-label">
            Delivery address
          </label>
          <textarea type="text" name="deliveryAddress" className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" value={deliveryAddress} onChange={(e)=>setdeliveryAddress(e.target.value)} placeholder="Address"></textarea>
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="exampleInputPhoneNumber" className="form-label">
            Phone Number
          </label>
          <input type="text" name="phoneNumber" className="form-control" id="exampleInputPhoneNumber" value={phoneNumber} placeholder="your mobile number" onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="exampleSelectPayment" className="form-label">
            Payment Type
          </label>
          <select name="payment-type" id="exampleSelectPayment" className="form-select" onChange={(e)=>setPaymentType(e.target.value)}>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
        </div>
        <button type="submit" className="btn navbar-bg-color me-1" disabled={!props.purchaseAble}>
          Place Your Order
        </button>
        <button className="btn btn-info text-white ms-1" onClick={()=> navigate("/")}>
          Cancle Order
        </button>
      </form>
    </>
  );
  

  return (
    <>
      {isLoading ? <Spinner/> : form}


      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
          <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Your Order Summary
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">
           
            {modalMessage}
           


          </div>
        </div>
      </Modal>

    </>
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(Checkout)