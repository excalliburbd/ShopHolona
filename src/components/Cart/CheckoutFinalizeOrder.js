import React from "react";

import UserPicExample from "../../assets/images/user-pic-example.svg";
import './CheckoutFinalizeOrder.css';

const FinalizeOrder = ({
  name,
  email,
  phone,
  address,
  cartTotal,
  invoiceNumber,
  profile,
}) => {
  return(
    <div>
      {/* <div>{title}</div> */}
      <div className="confirmation-icon-step">
        <p>Awaiting Confirmation From "Vendor Name"</p>
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
              <i className="material-icons extra-details-icon">error_outline</i>
            </div>
            <div className="total-amount">
              <p className="Total">Total:</p>
              <p className="total-value">{ cartTotal.price }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalizeOrder;
