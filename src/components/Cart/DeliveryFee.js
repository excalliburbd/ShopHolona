import React from "react";

const DeliveryFee = ({total}) => {
  return(
    <div className="checkout-footer--info">
      <div className="fee-info-and-icon">
        <p>Calculated Delivery Fee </p>
        <i className="material-icons deliv-fee-info-btn">&#xE001;</i>
        <div className="fee-info-tooltip">
          <p>Inside Dhaka :</p>
          <p>Upto 1Kg: 45 Tk; Each +KG: 15TK</p>
          <p>Dhaka Suburbs :</p>
          <p>Upto 1Kg: 80 TK; Each +KG: 20 TK</p>
          <p>Outside Dhaka :</p>
          <p>Upto 1Kg: 140 TK; Each +KG: 30 TK</p>
        </div>
      </div>
      <p className="calc-money-amount">&#2547; {45 + Math.round(total.weight / 1000) * 15}</p>
    </div>
  )
}

export default DeliveryFee;
