import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';

import CheckoutDeliveryAddress from './CheckoutDeliveryAddress';

// import express from '../../assets/images/express-delivery-icon.svg';
// import standard from '../../assets/images/standard-delivery-icon.svg';

import './CheckoutDelivery.css'

class CheckoutDelivery extends Component {
  constructor (props) {
    super (props);

    this.state = {
      addNewAddress: !this.props.isGuestUser,
      more: false,
      comment: false,
    }
  }

  handleAddNewAddress = () => {
    this.setState(
      (prevState) => {
        return {
          addNewAddress: !prevState.addNewAddress
        }
      }
    )
  }

  toggleShowMore = () => {
    this.setState(
      (prevState) => {
        return {
          more: !prevState.more
        }
      }
    )
  }

  toggleCommentBox = () => {
    this.setState(
      (prevState) => {
        return {
          comment: !prevState.comment
        }
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addresses.length !== nextProps.addresses.length) {
      this.setState({
        addNewAddress: nextProps.addresses.length < 1,
      })
    }

    // if (this.props.addresses.length !== nextProps.addresses.length) {
    //   this.setState({
    //     addNewAddress: nextProps.addresses.length < 1,
    //   })
    // }
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
      addressTitle,
      addressDescription,
      addressThana,
      addressDistrict,
      addressCity
    } = this.props;

    let addresses = (this.state.more) ? this.props.addresses : this.props.addresses.slice(0, 2);
    return (
      <div className="checkout-delivery">
        <div className="checkout-delivery-body">
          <h2 className="checkout-delivery-title">Delivery Address Details</h2>
          {
            addresses.length > 0 &&
            <Button className="checkout-delivery-address--btn-add"
                    icon={this.state.addNewAddress?'remove':'add'}
                    label='Add Delivery Address'
                    raised
                    onClick={ ()=> {
                      this.handleAddNewAddress();
                    }} />
          }
          {
            this.state.addNewAddress ? <CheckoutDeliveryAddress districts={ districts }
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
              !this.state.addNewAddress?
                addresses.length > 2?
                Array.isArray(addresses) && addresses.map((address, key) => {
                  return (
                    <div className={ `checkout-delivery-address--card ${ selectedAddress === key ? 'Checkout-toggled' : '' }` }
                        key={address.id}
                        onClick={ () => setSelectedAddress(key, selectedAddress === key) }>
                      <p className="checkout-delivery-address--card-title">{address.address_title}</p>
                      <p className="checkout-delivery-address--card-content">{address.details}</p>
                      <div className="cross-btn" onClick={ () => {deleteAddress(address.id);} }><i className="material-icons cross-btn-icon">clear</i></div>
                    </div>
                  )
                })
                :
                Array.isArray(addresses) && addresses.map((address, key) => {
                  return (
                    <div className={ `checkout-delivery-address--card ${ selectedAddress === key ? 'Checkout-toggled' : '' }` }
                        key={address.id}
                        onClick={ () => setSelectedAddress(key, selectedAddress === key) }>
                      <p className="checkout-delivery-address--card-title">{address.address_title}</p>
                      <p className="checkout-delivery-address--card-content">{address.details}</p>
                    </div>
                  )
                }) : null
            }
            {
              (this.props.addresses.length > 2 && !this.state.addNewAddress) && <Button className="address-card-more-btn" label={this.state.more?"Less":"More"} onClick={ () => this.toggleShowMore() }/>
            }
          </div>
        </div>
        {
          ((addressTitle && addressDescription && addressThana && addressDistrict && addressCity) || selectedAddress !== null) &&
            <div className="checkout--btn-title-container">
              <p className="checkout--delivery-title">Estimated delivery time : 2-3 days</p>
              {/* <div className="checkout--btn-container">
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
              </div> */}
              <button className="add-special-feature-btn" onClick={ this.toggleCommentBox }>{ this.state.comment ? '-  ADDITIONAL REQUESTS' : '+  ADDITIONAL REQUESTS'}</button>
              {
                this.state.comment && <Input multiline
                    value={ additionalComments }
                    autoFocus
                    className="spec-inst-input-box"
                    hint="e.g Call me when nearby, handle with care &amp; love, etc."
                    onChange={
                      value => updateAdditionalComments(value)
                    }  />
              }
            </div>
        }
      </div>
    )
  }
}

export default CheckoutDelivery;
