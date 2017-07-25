import React from 'react';

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
  fcom,
  banks,
  branches,
  bankUIValue,
  branchUIValue,
  handleSetValue,
  accountNumberUIValue,
  postBankInfo,
  bankUIID,
  branchUIID,
  payments,
  editing,
  bankInfo,
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
          <div className="Settings-info-gourp">
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
          </div>
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
          {
            fcom &&
              <div className="Settings-info--licence-group">
                <h2><FontIcon value="account_balance" />License and TIN</h2>
                 <div className="Settings-info--licence-group--inputs">
                  <Input  label="Change trade license number"
                          value={ license.number }
                          onChange={
                            val => updateValue(val, 'licenseNumber')
                          } />
                  <div style={{
                                backgroundImage: `url(${license.img})`,
                                backgroundColor: '#ccc',
                                width: '100%',
                                height: '10em'
                              }} />
                </div>
              </div>
          }
        </CardText>
        <CardActions>
          <Button label="reset"  />
          <Button label="update" primary onClick={ () => postUpdates(info, shop, token) } />
        </CardActions>
      </Card>
      <div className="Settings-payment-gourp">
        <Card>
          <CardTitle title="Shop Payment" />
          <CardText>
            {
              banks && banks[0] ?
                <CustomAutocomplete label="Bank Name"
                                    source={ banks }
                                    value={ (!editing && bankInfo[payments.bank.bank_name]) ? bankInfo[payments.bank.bank_name].name : bankUIValue }
                                    selectionOnly
                                    handleSetValue={ text => handleSetValue('bank', text) }
                                    onSelected={ id => handleSelect('bank', id) }
                                    editing={ editing }
                                  /> :
                <Input label="Bank Name"
                       disabled={ true } />
            }
            {
              editing ?
                <CustomAutocomplete label="Branch Name"
                                    source={ branches }
                                    value={ branchUIValue }
                                    selectionOnly
                                    handleSetValue={ text => handleSetValue('branch', text) }
                                    onSelected={ id => handleSelect('branch', id) }
                                    editing={ editing }
                                  /> :
                <Input label="Branch Name"
                       disabled={ true }
                       value={ payments.bank && payments.bank.name } />
            }
            <Input type="text"
                  label="Account Name"
                  value={ editing ? accountNumberUIValue : payments.account_name }
                  onChange={ text => handleSetValue('account', text) } />
          </CardText>
          <CardActions>
            <Button label="reset"  />
            <Button label="update" primary onClick={ () => postBankInfo(branchUIID, accountNumberUIValue, shop, token) } />
          </CardActions>
        </Card>
        {/*<Card>
          <CardTitle title="Shop Shipping" />
            Shipping Information:
            a. Pick up Address (Checkbox to write, same as shop address)
            b. Preferred pick up time slo
          <CardActions>
            <Button label="reset"  />
            <Button label="update" primary onClick={ () => postUpdates(info, shop, token) } />
          </CardActions>
        </Card>*/}
      </div>
    </div>
  );
}

export default Settings;
