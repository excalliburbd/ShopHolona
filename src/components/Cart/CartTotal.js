import React from 'react';

// import CartIcon from '../../assets/images/shopping-cart.svg'

import './CartTotal.css';

const CartTotal = ({
    cartItems,
    total,
  }) => {
  return (
    <div className="cart-total">
      <div className="cart-total-text">
        <h4>{ cartItems.length } items</h4>
        {/* <div className="cart-icon-container">  <img src={CartIcon} alt=""/>  </div> */}
      </div>
      <div className="cart-total-tk">
        <p>Cart Price</p>
        <p>৳ { total.price }</p>
      </div>
    </div>
  )
}

export default CartTotal;

