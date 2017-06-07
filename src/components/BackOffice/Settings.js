import React from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

import './Settings.css';

const Settings = ({
  name,
  domain,
  address,
  hours,
  tradeLicence,
  updateValue
}) => (
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
          <Input label="Change shop address"
               value={ address }
               onChange={
                 val => updateValue(val, 'address')
               } />
        </div>
        Open Hours: ''
      </CardText>
      <CardActions>
        <Button label="reset" raised/>
        <Button label="update" primary raised/>
      </CardActions>
    </Card>
    <Card>
      <CardTitle title="Shop Payment" />
      <CardActions>
        <Button label="reset" raised/>
        <Button label="update" primary raised/>
      </CardActions>
    </Card>
    <Card>
      <CardTitle title="Shop Shipping" />
      <CardActions>
        <Button label="reset" raised/>
        <Button label="update" primary raised/>
      </CardActions>
    </Card>
  </div>
);

export default Settings;
