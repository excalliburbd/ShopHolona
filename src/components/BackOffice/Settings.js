import React from 'react';
import moment from 'moment';

import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import TimePicker from 'react-toolbox/lib/time_picker/TimePicker';

import CustomAutocomplete from '../CustomAutocomplete';

import './Settings.css';

const Settings = ({
  info,
  updateValue,
  postUpdates,
  shop,
  token,
  handleSelect,
}) => {

  const {
    name,
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
          <Input  label="Change shop name"
                  value={ name }
                  icon="store"
                  onChange={
                    val => updateValue(val, 'name')
                  } />
          {/*<Input  label="Change shop domain"
                  icon="link"
                  value={ domain }
                  onChange={
                    val => updateValue(val, 'domain')
                  } />*/}
          <Input  label="Change shop contact number"
                  icon="phone"
                  value={ phone.number }
                  onChange={
                    val => updateValue(val, 'phone')
                  } />
          <div className="Settings-info--address-group">
            <h2><FontIcon value="location_on" /> Address</h2>
            <div className="Settings-info--address-group--inputs">
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
              <Input  label="Change thana"
                      value={ address.postal }
                      onChange={
                        val => updateValue(val, 'postal')
                      } />
              </div>
          </div>
          <div className="Settings-info--time-group">
            <h2><FontIcon value="watch_later" />Hours</h2>
            <div className="Settings-info--time-group--inputs">
              <TimePicker label="hours from"
                          format="ampm"
                          onChange={ val => updateValue(val, 'fromHour') }
                          value={ hours.from_hour }
                        />
              <TimePicker label="hours to"
                          format="ampm"
                          onChange={ val => updateValue(val, 'toHour') }
                          value={ hours.to_hour }
                        />
            </div>
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
          <Button label="update" primary onClick={ () => postUpdates(info, shop, token) } />
        </CardActions>
      </Card>
      <div className="Settings-payment-gourp">
        <Card>
          <CardTitle title="Shop Payment" />

          {/*<CustomAutocomplete label="Bank Name"
                              source={ bankNames }
                              value={ bankName }
                              selectionOnly
                              onSelected={ id => handleSelect('bank', id) }
                            />*/}
              b. Bank Branch Name
              c. Account Number (Not Typeahead)
          <CardActions>
            <Button label="reset"  />
            <Button label="update" primary onClick={ () => postUpdates(info, shop, token) } />
          </CardActions>
        </Card>
        <Card>
          <CardTitle title="Shop Shipping" />
          <CardActions>
            <Button label="reset"  />
            <Button label="update" primary onClick={ () => postUpdates(info, shop, token) } />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
