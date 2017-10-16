import React from 'react';

const PaymentSelection = ({title}) => {
  return(
    <div>
      <div>{title}</div>
      <div>
        <img src="" alt=""/>
        Cash on Delivery
        <p>Seceure, cash on delivery to our delivery partner</p>
      </div>
      <div>
        <img src="" alt=""/>
        Credit Card Payment
        <p>All forms of credit cards are accepted (VISA, MasterCard)</p>
      </div>
      <div>
        <img src="" alt=""/>
        bCash Payment
        <p>Bkash Payment is also accepted Nominal fees will be charged</p>
      </div>
      <div>
        <img src="" alt=""/>
        Sh coins
        <p>No hidden fee charged. Do it the sh way</p>
      </div>
    </div>
  )
}

export default PaymentSelection;