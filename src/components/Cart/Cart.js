import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import CartItem from './CartItem';
import CartTotal from './CartTotal';
import Checkout from './Checkout'

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

  if (sidebarType === 'CHECKOUT') {
    // return <Checkout total={ total }
    //                  cartItems={ cartItems }
    //                  handleCheckout={ handleCheckout }
    //                  token={ token }
    //                  address={ address }
    //                  handleAddress={ handleAddress } />
    return  <Checkout total={ total }
                       cartItems={ cartItems }
            />
  }

  return (
    <div className="cart-container">
      <CartTotal total={ total }
                  cartItems={ cartItems }/>
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
      <div className="cart-actions">
        <Button label="Checkout"
                raised
                className="cart-action-checkout--btn sh-btn--yellow"
                onClick={ () => handleShowCheckout(token) } />
      </div>
    </div>
  )
}

export default Cart;
