import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import CartItem from './CartItem';
import Checkout from './Checkout';

import './Cart.css';

const Cart = ({
  cartItems,
  total,
  products,
  updateCartItem,
  deleteCartItem,
  token,
  sidebarType,
  handleShowCheckout,
  handleCheckout,
  address,
  handleAddress,
}) => {

  console.log(products)

  if (sidebarType === 'CHECKOUT') {
    return <Checkout total={ total }
                     cartItems={ cartItems }
                     handleCheckout={ handleCheckout }
                     token={ token }
                     address={ address }
                     handleAddress={ handleAddress } />
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <div className="cart-header-text">
          <h4>{ cartItems.length } items</h4>
        </div>
        <div className="cart-header-total">
          <h4>Total</h4>
          <h4>৳ { total.price }</h4>
        </div>
      </header>
      <ul className="cart-product-list">
        {
          cartItems.map(
            (cartItem, key) =>  <CartItem cartItem={ cartItem }
                                          key={ key }
                                          token={ token }
                                          product={ products[cartItem.product.id] }
                                          updateCartItem={ updateCartItem }
                                          deleteCartItem={ deleteCartItem }/>
          )
        }
      </ul>
      <div className="Cart-actions">
        <Button label="Checkout"
                onClick={ handleShowCheckout } />
      </div>
    </div>
  )
}

export default Cart;
