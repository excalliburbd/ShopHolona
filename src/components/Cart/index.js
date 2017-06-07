import React from 'react';
import { connect } from 'react-redux'
import CartItem from './CartItem'
import { totalPrice } from '../../selectors'

import './style.css'

const stateToProps = state => ({
  cartItems: state.cart.items,
  totalPrice: totalPrice(state)
})

const Cart = ({ cartItems, totalPrice }) => (
  <div className="cart-container">
    <header className="cart-header">
      <div className="cart-header-text">
        <h4>{cartItems.length} items</h4>
      </div>
      <div className="cart-header-total">
        <h4>Total</h4>
        <h4>৳ {totalPrice}</h4>
      </div>
    </header>
    <ul className="cart-product-list">
      { cartItems.map(cartItem => (
        <CartItem cartItem={cartItem} key={cartItem.id}/>
      )) }
    </ul>
  </div>
)

export default connect(stateToProps)(Cart)
