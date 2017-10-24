import React from 'react';

import CartIcon from '../../assets/images/cart-icon.svg'

import './CartTotal.css';

const CartTotal = ({
    cartItems,
    total,
  }) => {
  return (
    <div className="cart-total">
      <div className="cart-total-text">
        <h4>{ cartItems.length } items</h4>
        <div className="cart-icon-container">  <img src={CartIcon} alt=""/>  </div>
      </div>
      <div className="cart-total-amount">
        <h4>Total</h4>
        <h4>৳ { total.price }</h4>
      </div>
    </div>
  )
}

export default CartTotal;

