import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';

import CheckoutDeliveryAddress from './CheckoutDeliveryAddress';

import express from '../../assets/images/express-delivery-icon.svg';
import standard from '../../assets/images/standard-delivery-icon.svg';

import './CheckoutDelivery.css'

class CheckoutDelivery extends Component {
  constructor (props) {
    super (props);

    this.state = {
      add_new: this.props.addresses.length < 1,
      more: false,
      addressToggleer : "add",
      comment: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addresses.length !== nextProps.addresses.length) {
      this.setState({
        add_new: nextProps.addresses.lenght < 1,
      })
    }
  }

  handleAddNewAddress() {
    this.setState((prevState) => {
      return { add_new: !prevState.add_new }
    })
  }

  toggleShowMore = () => {
    this.setState(
      (prevState, props) => {
        return {
          more: !prevState.more,
        }
      }
    )
  }

  toggleAddress = () => {
    this.setState(
      (prevState, props) => {
        return {
          addressToggleer: prevState.addressToggleer === "add" ? "remove":"add",
        }
      }
    )
  }

  toggleCommentBox = () => {
    this.setState(
      (prevState, props) => {
        return {
          comment: !prevState.comment,
        }
      }
    )
  }

  render () {
    const {
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
      details,
      title,
      selectedAddress,
      setSelectedAddress,
      additionalComments,
      updateAdditionalComments,
      deleteAddress,
    } = this.props;

    let addresses = (this.state.more) ? this.props.addresses : this.props.addresses.slice(0, 2);

    return (
      <div className="checkout-delivery">
        <div className="checkout-delivery-body">
          <h2 className="checkout-delivery-title">Delivery Address Details</h2>
          <Button className="checkout-delivery-address--btn-add"
                  icon={this.state.addressToggleer}
                  label='Add Delivery Address'
                  raised
                  onClick={ ()=> {
                    this.handleAddNewAddress();
                    this.toggleAddress();
                  }} />
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
                                                          handleSelect={ handleSelect }
                                                          details={ details }
                                                          title={ title }  /> : ''
          }

          <div className="checkout-delivery-address--view">
            {
              addresses.length > 2?
              Array.isArray(addresses) && addresses.map((address, key) => {
                return (
                  <div className={ `checkout-delivery-address--card ${ selectedAddress === key ? 'Checkout-toggled' : '' }` }
                       key={address.id}
                       onClick={ () => setSelectedAddress(key, selectedAddress === key) }>
                    <div className="checkout-delivery-address--card-title">{address.address_title}</div>
                    <div className="checkout-delivery-address--card-content">{address.details}</div>
                    <div className="cross-btn" onClick={ () => deleteAddress(address.id) }><i className="material-icons cross-btn-icon">clear</i></div>
                  </div>
                )
              })
              :
              Array.isArray(addresses) && addresses.map((address, key) => {
                return (
                  <div className={ `checkout-delivery-address--card ${ selectedAddress === key ? 'Checkout-toggled' : '' }` }
                       key={address.id}
                       onClick={ () => setSelectedAddress(key, selectedAddress === key) }>
                    <div className="checkout-delivery-address--card-title">{address.address_title}</div>
                    <div className="checkout-delivery-address--card-content">{address.details}</div>
                  </div>
                )
              })
            }
            {
              this.props.addresses.length > 2 && <Button className="address-card-more-btn" label={this.state.more?"Less":"More"} onClick={ () => this.toggleShowMore() }/>
            }
          </div>
        </div>
        <div>
          <div className="checkout--btn-title-container">
            <p className="checkout--delivery-title">Choose Your Delivery Option</p>
            <div className="checkout--btn-container">
              <Button className="checkout--exprs-btn" title="Coming Soon"><img src={express} alt="" />
                <div className="btn-desc">
                  <p>Standard</p>
                  <p>(2-3Days)</p>
                </div>
              </Button>
              <Button className="checkout--std-btn sh-btn--yellow"><img src={standard} alt="" />
                <div className="btn-desc">
                  <p>Standard</p>
                  <p>(2-3Days)</p>
                </div>
              </Button>
            </div>
            <button className="add-special-feature-btn" onClick={ this.toggleCommentBox }>+ SPECIAL INSRUCTIONS</button>
            {
              this.state.comment && <Input multiline
                   value={ additionalComments }
                   className="spec-inst-input-box"
                   onChange={
                     value => updateAdditionalComments(value)
                   }  />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutDelivery;
