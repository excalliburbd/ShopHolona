import React from 'react';

import Input from 'react-toolbox/lib/input/Input';

import './CheckoutDeliveryAddress.css'

const AddDeliveryAddress = () => {
  return (
    <div className="add-delivery-address">      
      <Input className="address-details" label="Address Details" />     
      <div className="add-delivery-address--dual">
      <Input className="address-title" label="Address Title" />
      <Input label="District" />
      </div>
      <div className="add-delivery-address--dual">
        <Input label="City" />
        <Input label="Thana" />
      </div>
    </div>
  )
}

export default AddDeliveryAddress
