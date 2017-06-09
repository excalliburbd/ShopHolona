import React from 'react';
import moment from 'moment';

import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

import './Settings.css';

const Settings = ({
  info,
  updateValue
}) => {

  const {
    name,
    domain,
    address,
    phone,
    hours,
    license,
  } = info;

  return (
    <div className="Settings">
      <Card>
        <CardTitle title="Shop Information" />
        <CardText>
          <Input label="Change shop name"
                value={ name }
                onChange={
                  val => updateValue(val, 'name')
                } />
          <Input label="Change shop domain"
                value={ domain }
                onChange={
                  val => updateValue(val, 'domain')
                } />
          <div className="Settings-info--address-group">
            <Input  label="Change shop address"
                    value={ address.body }
                    onChange={
                      val => updateValue(val, 'address')
                    } />
            <Input  label="Change city"
                    value={ address.city }
                    onChange={
                      val => updateValue(val, 'city')
                    } />
            <Input  label="Change postal code"
                    value={ address.postal }
                    onChange={
                      val => updateValue(val, 'postal')
                    } />
          </div>
          <Input label="Change shop contact number"
                value={ phone }
                onChange={
                  val => updateValue(val, 'phone')
                } />
          <div className="Settings-info--time-group">
            hours from: { moment(hours.from).toString() }
            hours to: { moment(hours.to).toString() }
          </div>
          <div className="Settings-info--licence-group">
            <Input  label="Change trade license number"
                    value={ license.number }
                    onChange={
                      val => updateValue(val, 'licenseNumber')
                    } />
            <div style={{ backgroundImage: `url(${license.img})`}} />
          </div>
        </CardText>
        <CardActions>
          <Button label="reset"  />
          <Button label="update" primary  />
        </CardActions>
      </Card>
      <Card>
        <CardTitle title="Shop Payment" />
        <CardActions>
          <Button label="reset"  />
          <Button label="update" primary  />
        </CardActions>
      </Card>
      <Card>
        <CardTitle title="Shop Shipping" />
        <CardActions>
          <Button label="reset"  />
          <Button label="update" primary  />
        </CardActions>
      </Card>
    </div>
  );
}

export default Settings;
