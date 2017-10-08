import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import CartItem from './CartItem';
import CartTotal from './CartTotal';
import Checkout from './Checkout';
import Loader from '../Loader';

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
    return <Checkout total={ total }
                     cartItems={ cartItems }
                     handleCheckout={ handleCheckout }
                     token={ token }
                     address={ address }
                     handleAddress={ handleAddress } />
  }

  return (
    <div className="cart-container">
    {
      cartItems.length > 0
      ?
      <div>
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
        <div className="Cart-actions">
          <Button label="Checkout"
                  onClick={ handleShowCheckout } />
        </div>
      </div>
      :
      <Loader />
    }
    </div>
  )
}

export default Cart;
