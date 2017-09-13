import React from 'react';

import Input from 'react-toolbox/lib/input/Input';

import './CheckoutDeliveryAddress.css'

const AddDeliveryAddress = () => {
  return (
    <div className="add-delivery-address">
      <Input label="Address Title" />
      <Input label="Address Details" />
      <div className="add-delivery-address--dual">
        <Input label="District" />
        <Input label="City" />
      </div>
      <div className="add-delivery-address--dual">
        <Input label="Thana" />
        <Input label="Postal Code" />
      </div>
    </div>
  )
}

export default AddDeliveryAddress
