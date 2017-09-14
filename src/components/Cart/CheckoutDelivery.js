import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';

import AddDeliveryAddress from './CheckoutDeliveryAddress';
import CartTotal from './CartTotal'

import './CheckoutDelivery.css'

class CheckoutDelivery extends Component {
  constructor (props) {
    super (props);

    this.state = {
      add_new: false
    }
  }

  handleAddNewAddress () {
    this.setState((prevState) => {
      return { add_new: !prevState.add_new }
    })
  }


  render () {
    const {
      addresses,
      total,
      cartItems,
      handleCheckout,
      token,
    } = this.props;

    return (
      <div className="checkout-delivery">
        <div className="checkout-delivery-body">
          <h2 className="checkout-delivery-title">Delivery Address Details</h2>
          <Button className="checkout-delivery-address--btn-add" icon='add' label='Add Delivery Address' raised onClick={ ()=>this.handleAddNewAddress() } />

          {
            this.state.add_new ? <AddDeliveryAddress /> : ''
          }

          <div className="checkout-delivery-address--view">
            {
              Array.isArray(addresses) && addresses.map((address) => {
                return (
                  <div className="checkout-delivery-address--card"
                       key={address.id}
                       onClick={ () => handleCheckout(total, cartItems, address.id, token)}>
                    <div className="checkout-delivery-address--card-title">{address.title}</div>
                    <div className="checkout-delivery-address--card-content">{address.details}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="checkout-footer">
          <div className="checkout-footer--info">
            <p>Calculated Delivery Fee</p>
          </div>
          <CartTotal total={ this.props.total }
                     cartItems={ this.props.cartItems }/>
        </div>
      </div>
    )
  }
}

export default CheckoutDelivery
