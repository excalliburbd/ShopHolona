import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Card from 'react-toolbox/lib/card/Card';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

import './CartItem.css';

const CartItem = ({
  cartItem,
  product,
  updateCartItem,
  deleteCartItem,
  handleMinimumItemsInCartNotification,
  token,
}) => {

  const variant = product.variances.find(
    item => (item.id === cartItem.variance.id)
  );

  const attribute = variant.attributes.find(
    item => (item.id === cartItem.product_variance_attribute.id)
  );

  return (
    <li className="cart-product-list-item-container">
      <Card className="cart-product-list-item-card">
        <div className="cart-item-img">
          <img src={ variant.images[0].image }
               alt={ product.name }
               style={{ width: '70px', height: '6rem'}} />
        </div>
        <div className="cart-item-details">
          <div className="cart-item-name">
            <div className="cart-item-name--title" title={product.name}>{ product.name }</div>
          </div>
          <div className="cart-item-info">
            <div className="cart-product-attributes">
              <div className="cart-variant-name">Color : { variant.type.value }</div>

              <div className="cart-variant-size">Size : { attribute.type.value }</div>

              <div className="cart-product-quantity">
                <span className="cart-attributes-title">Quantity</span>
                <div className="cart-product-quantity-body">
                <span className="minus" onClick={
                    () => {
                      if (cartItem.quantity > 1) {
                        updateCartItem(
                          cartItem.id,
                          attribute.id,
                          cartItem.quantity - 1,
                          token,
                        )
                      }

                      if (cartItem.quantity === 1) {
                        // deleteCartItem(cartItem.id, token);
                        handleMinimumItemsInCartNotification();
                      }
                    }
                  }>-</span>
                  <Input className="cart-quantity-input"
                         type='text'
                         name='name'
                         value={ cartItem.quantity } />

                  <span className="plus" onClick={
                  () => updateCartItem(
                    cartItem.id,
                    attribute.id,
                    cartItem.quantity + 1,
                    token,
                    attribute.stock
                  )
                }>+</span>
                </div>
              </div>
            </div>
            <div className="cart-product-price">
              <h3>৳ { attribute.sh_price * cartItem.quantity }</h3>
              <h5>(TK { attribute.sh_price } each)</h5>
            </div>
          </div>
          <FontIcon
            className="cart-product-delete"
            value="add_circle"
            onClick={ () => deleteCartItem(cartItem.id, token) }
          />
        </div>
      </Card>
    </li>
  );
}

export default CartItem;
