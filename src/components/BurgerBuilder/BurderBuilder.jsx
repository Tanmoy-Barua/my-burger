import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'
import Summary from './Summary/Summary'

import {connect} from 'react-redux'
import {addIngratient, removeIngratient, updatePurchaseable} from '../../redux/actionCreator'


const mapStateToProps = (state) =>{
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchaseAble: state.purchaseAble
  }
}

const mapDispatchtoProps = (dispatch) =>{
  return {
    addIngratient: (igtype) => dispatch(addIngratient(igtype)),
    removeIngratient: (igtype) => dispatch(removeIngratient(igtype)),
    updatePurchaseable: () => dispatch(updatePurchaseable()),
  }
}

// const IngredientPrice = {
//     Salad: 10,
//     Cheese: 30,
//     Meat: 60
// }

const BurderBuilder = (props) => {
  document.title = "BURGER BUILDER || HOME";
  let navigate = useNavigate();


  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }


  // const [ingredients, setIngratients] = useState([
  //   {type: 'Salad', amount: 0},
  //   {type: 'Cheese', amount: 0},
  //   {type: 'Meat', amount: 0}
  //   ])

    // const [totalPrice, setTotalPrice] = useState(50);

    // const [purchaseAble, setPurchaseAble] = useState(false)

    // console.log(totalPrice)

    const addIngratient = type => {
        props.addIngratient(type)
        props.updatePurchaseable();
    }

    const removeIngratient = type => {
        props.removeIngratient(type)
        props.updatePurchaseable();
    }

    // const updatePurchaseable = ingredients =>{
    //     const sum = ingredients.reduce((sum, ele) => {
    //         return sum + ele.amount;
    //     }, 0)
    //     setPurchaseAble(sum > 0 ? true : false)
    // }
    // let className = "";
    const handleCheckout = () => {
      // className += "modal-backdrop-opacity";
      navigate('/checkout', { replace: true })
    }
    


  return (
    <div>
    <div className="d-flex flex-md-row flex-col">
        <Burger ingredient={props.ingredients}/>
        <Controls addIngratient={addIngratient} removeIngratient={removeIngratient} price={props.totalPrice} purchaseable={props.purchaseAble} clicks={openModal} />

    </div>


    
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
            <Summary ingredients={props.ingredients}/>

            <h5>Total: {props.totalPrice.toFixed(0)} BDT</h5>


          </div>
          <hr />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary mx-1"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" onClick={handleCheckout} className="btn navbar-bg-color mx-1">
              Continue to Checkout
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchtoProps)(BurderBuilder)