import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';

import CheckoutDeliveryAddress from './CheckoutDeliveryAddress';

import express from '../../assets/images/express-delivery-icon.svg';
import standard from '../../assets/images/standard-delivery-icon.svg';

import './CheckoutDelivery.css'

class CheckoutDelivery extends Component {
  constructor (props) {
    super (props);

    this.state = {
      add_new: this.props.addresses.length < 1,
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
      districts,
      districtUIValue,
      cities,
      cityUIValue,
      cityUIID,
      thanas,
      thanaUIValue,
      thanaUIID,
      handleSetValue,
      handleSelect,
    } = this.props;

    return (
      <div className="checkout-delivery">
        <div className="checkout-delivery-body">
          <h2 className="checkout-delivery-title">Delivery Address Details</h2>
          <Button className="checkout-delivery-address--btn-add" icon='add' label='Add Delivery Address' raised onClick={ ()=>this.handleAddNewAddress() } />

          {
            this.state.add_new ? <CheckoutDeliveryAddress districts={ districts }
                                                          districtUIValue={ districtUIValue }
                                                          cities={ cities }
                                                          cityUIValue={ cityUIValue }
                                                          cityUIID={ cityUIID }
                                                          thanas={ thanas }
                                                          thanaUIValue={ thanaUIValue }
                                                          thanaUIID={thanaUIID }
                                                          handleSetValue={ handleSetValue }
                                                          handleSelect={ handleSelect }  /> : ''
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
        <div>
          <div className="checkout--btn-title-container">
            <p className="checkout--delivery-title">Choose Your Delivery Option</p>
            <div className="checkout--btn-container">
              <Button className="checkout--exprs-btn" ><img src={express} alt="" />Express</Button>
              <Button className="checkout--std-btn sh-btn--yellow"><img src={standard} alt="" />Standard</Button>
            </div>
            <button className="add-special-feature-btn">+ Special Instructions</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutDelivery;
