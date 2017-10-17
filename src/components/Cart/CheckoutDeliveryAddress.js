import React, { Component } from 'react';

import Input from 'react-toolbox/lib/input/Input';

import CustomAutocomplete from '../CustomAutocomplete';

import './CheckoutDeliveryAddress.css';

class AddDeliveryAddress extends Component {
  constructor(porps) {
    super(porps);

    this.state = {
      addressDetails: '',
      addressTitle: '',
    }
  }

  render() {
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
    } = this.props;

    console.log(districts);

    return (
      <div className="add-delivery-address">
        <Input  className="address-details" label="Address Details"
                        value={ this.state.addressDetails }
                        onChange={
                          val => this.setState({
                            addressDetails: val
                          })
                        } />
        <div className="add-delivery-address--dual">
        <Input className="address-title" label="Address Title"
                value={ this.state.addressTitle }
                        onChange={
                          val => this.setState({
                            addressTitle: val
                          })
                        } />
        {
          districts && districts.list[0] ?
            <CustomAutocomplete label="District"
                                source={ districts }
                                value={ districtUIValue }
                                selectionOnly
                                keyname="name"
                                handleSetValue={ text => handleSetValue('district', text) }
                                onSelected={ id => {
                                  handleSelect('district', id);
                                  // updateValue(address.details, 'address');
                                }}
            /> :
            <Input label="District" />
        }
        </div>
        <div className="add-delivery-address--dual">
        {
                    cities && cities.list[0] ?
                      <CustomAutocomplete label="City"
                                          source={ cities }
                                          value={ cityUIValue }
                                          selectionOnly
                                          keyname="name"
                                          handleSetValue={ text => {
                                            handleSetValue('city', text);
                                          }}
                                          onSelected={ id => {
                                            // updateValue(address.details, 'address');
                                            handleSelect('city', id);
                                          }}
                      /> :
                      <Input label="City"/>
                  }
           {
                    thanas && thanas.list[0] ?
                      <CustomAutocomplete label="Thana"
                                          source={ thanas }
                                          value={ thanaUIValue }
                                          selectionOnly
                                          keyname="name"
                                          handleSetValue={ text => handleSetValue('thana', text) }
                                          onSelected={ id => {
                                            // updateValue(address.details, 'address');
                                            handleSelect('thana', id);
                                          }}
                      /> :
                      <Input label="Thana" />
                  }
        </div>
      </div>
    )
  }
}

export default AddDeliveryAddress
