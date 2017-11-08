import React from "react";

import UserPicExample from "../../assets/images/user-pic-example.svg";
import './CheckoutFinalizeOrder.css';

import CartInfoIcon from '../../assets/images/sh-shopping-cart-tooltip.svg';

const FinalizeOrder = ({
  name,
  email,
  phone,
  address,
  cartTotal,
  invoiceNumber,
  profile,
  shopName,
  cartItems,
  additionalComments
}) => {
  return(
    <div>
      {/* <div>{title}</div> */}
      <div className="confirmation-icon-step">
        <p>Awaiting Confirmation From { shopName }</p>
        <div className="confirm-icon-div">
          <i className="material-icons done-icon">done</i>
        </div>
      </div>
      <div className="Checkout-final">
        <p className="checkout-final-title">Order Finalized </p>
        <div className="order-finalized-container">
          <img className="user-profile-pic"
               src={ (profile.split('/').slice(-1)[0] === 'no_images.jpg') ? UserPicExample : profile }
               alt=""  />
          <div className="user-info-title-desc">
            <p className="user-name">Name: </p>
            <p className="user-name-value"> { name }</p>
          </div>
          <div className="user-info-title-desc">
            <p className="user-phn-num">Phone: </p>
            <p className="user-phn-num-value"> { phone }</p>
          </div>
          <div className="user-info-title-desc">
            <p className="user-email">E-mail: </p>
            <p className="user-email-value"> { email }</p>
          </div>
          <div className="user-info-title-desc">
            {<p className="user-adress">Address:</p>}
            <p className="user-adress-value"> { address.details }</p>
          </div>
          <div className="order-details">
            <p className="invoice-no">Invoice No:</p>
            <p className="invoice-no--value">{ invoiceNumber }</p>
            <div className="cart-details-icon-container">
              <p className="cart-details">Cart Details</p>
              <img className="extra-details-icon" src={ CartInfoIcon } alt='cart-details-icon'/>
              <div className="cart-details-tooltip">
                <div className="cart-details-table-title">
                  <p>Product Name</p>
                  <p>Qty</p>
                  <p>Price</p>
                </div>
                {
                  cartItems.map((item, index)=>{
                    return <div key={index} className="cart-details-table-desc">
                      <p>{item.product.name}</p>
                      <p>{item.quantity}</p>
                      <p>{item.product.sh_price}</p>
                    </div>
                  })
                }
              </div>
            </div>
            <div className="total-amount">
              <p className="Total">Total:</p>
              <p className="total-value"> { cartTotal.price } TK</p>
            </div>
            <div className="est-deliv-date">
              <p>Estimated Delivery Date: </p>
              <p> 2-3Days </p>
            </div>
            {/* <div className="amount-and-comment">
              <div className="delivery-amount">
                <p className="Delivery">Delivery Cost:</p>
                <p className="delivery-value">{45 + Math.round(cartTotal.weight / 1000) * 15}TK</p>
              </div>
              <p className="add-comment">{additionalComments}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalizeOrder;
