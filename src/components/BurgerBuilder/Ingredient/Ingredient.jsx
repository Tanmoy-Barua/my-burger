import React from 'react'
import Images from '../../Images/Image'

const Ingredient = (props) => {

    let ingredient = null;

    switch (props.type){
        case 'bread-bottom':
            ingredient = <div><img src={Images.Bottom} alt={Images.Bottom} /></div>;
            break;
        case 'bread-top':
            ingredient = <div><img src={Images.Top} alt={Images.Top} /></div>;
            break;
        case 'Meat':
            ingredient = <div><img src={Images.Meat} alt={Images.Meat} /></div>;
            break;
        case 'Cheese':
            ingredient = <div><img src={Images.Cheese} alt={Images.Cheese} /></div>;
            break;
        case 'Salad':
            ingredient = <div><img src={Images.Salad} alt={Images.Salad} /></div>;
            break;
        default:
            ingredient = null;
    }

  return (
    <div className="ingredient">
        {ingredient}
    </div>
  )
}

export default Ingredient