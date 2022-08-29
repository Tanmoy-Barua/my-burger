import React, {useState} from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'
import Summary from './Summary/Summary'

const IngredientPrice = {
    Salad: 10,
    Cheese: 30,
    Meat: 60
}

const BurderBuilder = () => {
  const [ingredients, setIngratients] = useState([
    {type: 'Salad', amount: 0},
    {type: 'Cheese', amount: 0},
    {type: 'Meat', amount: 0}
    ])

    const [totalPrice, setTotalPrice] = useState(50);

    const [purchaseAble, setPurchaseAble] = useState(false)

    console.log(totalPrice)

    const addIngratient = type => {
        const ingredient = [...ingredients];
        const NewPrice = totalPrice + IngredientPrice[type]
        for(let item of ingredient){
            if(item.type === type) item.amount++;
        }
        setIngratients(ingredient)
        setTotalPrice(NewPrice)
        updatePurchaseable(ingredient)
    }

    const removeIngratient = type => {
        const ingredient = [...ingredients];
        const NewPrice = totalPrice - IngredientPrice[type]
        for(let item of ingredient){
            if(item.type === type) {
                if(item.amount === 0)return
                item.amount--;
            }

        }
        setIngratients(ingredient)
        setTotalPrice(NewPrice)
        updatePurchaseable(ingredient)
    }

    const updatePurchaseable = ingredients =>{
        const sum = ingredients.reduce((sum, ele) => {
            return sum + ele.amount;
        }, 0)
        setPurchaseAble(sum > 0 ? true : false)
    }


  return (
    <div>
    <div className="d-flex flex-md-row flex-col">
        <Burger ingredient={ingredients}/>
        <Controls addIngratient={addIngratient} removeIngratient={removeIngratient} price={totalPrice} purchaseable={purchaseAble} />

    </div>

      {/* Modal */}
      <div
      className="modal fade"
      id="summaryModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
            />
          </div>
          <div className="modal-body">
            <Summary ingredients={ingredients}/>

            <h5>Total: {totalPrice.toFixed(0)} BDT</h5>


          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn navbar-bg-color">
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BurderBuilder