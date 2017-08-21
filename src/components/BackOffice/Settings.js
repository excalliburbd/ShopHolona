import React from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import TimePicker from 'react-toolbox/lib/time_picker/TimePicker';
import IconButton from 'react-toolbox/lib/button/IconButton';

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
  accountNameUIValue,
  accountNumberUIValue,
  postBankInfo,
  bankUIID,
  branchUIID,
  payments,
  editing,
  bankInfo,
  physicalStore,
  districts,
  districtUIValue,
  cities,
  cityUIValue,
  cityUIID,
  thanas,
  thanaUIValue,
  thanaUIID,
  handleShowImageUploader,
  editSocial,
}) => {

  const {
    name,
    phone,
    hours,
    license,
    social,
  } = info;

  const address = info.address[0];

  const activeBank = bankInfo.find(
                      bank => bank && payments && payments.bank && bank.id === payments.bank.bank_name
                   );

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
                      value={ address.details }
                      onChange={
                        val => updateValue(val, 'address')
                      } />
              {
                districts && districts.list[0] ?
                  <CustomAutocomplete label="District"
                                      source={ districts }
                                      value={ !editing ? address && address.district && address.district.name : districtUIValue }
                                      selectionOnly
                                      keyname="name"
                                      handleSetValue={ text => handleSetValue('district', text) }
                                      onSelected={ id => {
                                        handleSelect('district', id);
                                        updateValue(address.details, 'address');
                                      }}
                                      editing={ editing }
                                    /> :
                  <Input label="District"
                         value={ address && address.district && address.district.name } />
              }
              {
                cities && cities.list[0] ?
                  <CustomAutocomplete label="City"
                                      source={ cities }
                                      value={ !editing ? address && address.city && address.city.name : cityUIValue }
                                      selectionOnly
                                      keyname="name"
                                      handleSetValue={ text => {
                                        handleSetValue('city', text);
                                      }}
                                      onSelected={ id => {
                                        updateValue(address.details, 'address');
                                        handleSelect('city', id);
                                      }}
                                      editing={ editing }
                                    /> :
                  <Input label="City"
                         value={ address && address.city && address.city.name } />
              }
              {
                thanas && thanas.list[0] ?
                  <CustomAutocomplete label="Thana"
                                      source={ thanas }
                                      value={ !editing ? address && address.thana && address.thana.name : thanaUIValue }
                                      selectionOnly
                                      keyname="name"
                                      handleSetValue={ text => handleSetValue('thana', text) }
                                      onSelected={ id => {
                                        updateValue(address.details, 'address');
                                        handleSelect('thana', id);
                                      }}
                                      editing={ editing }
                                    /> :
                  <Input label="Thana"
                         value={ address && address.thana && address.thana.name } />
              }
              <Input  label="Change postal code"
                      value={ address.postal_code }
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
              <span className="Settings-info--time-group--divider">&mdash;</span>
              <TimePicker label="hours to"
                          format="ampm"
                          onChange={ val => updateValue(val, 'toHour') }
                          value={ hours.to_hour }
                        />
            </div>
          </div>
          {
            physicalStore &&
              <div className="Settings-info--licence-group">
                <h2><FontIcon value="account_balance" />License and TIN</h2>
                 <div className="Settings-info--licence-group--inputs">
                  <Input  label="Change trade license number"
                          value={ license.number }
                          onChange={
                            val => updateValue(val, 'licenseNumber')
                          } />
                  <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader() }/>
                  <div style={{
                                backgroundImage: `url(${license.image})`,
                                backgroundSize: 'contain',
                                backgroundColor: '#ccc',
                                width: '100%',
                                height: '10em'
                              }} />
                </div>
              </div>
          }
        </CardText>
        <CardActions>
          <Button className="sh-btn--yellow" label="update" onClick={ () => postUpdates(info, shop, token) } />
        </CardActions>
      </Card>
      <div className="Settings-payment-gourp">
        <Card>
          <CardTitle title="Social Links" />
          <CardText>
            <Input icon="watch_later"
                   label="Facebook"
                   onChange={
                     value => editSocial('facebook', value)
                   }
                   value={ social.fb_link } />
            <Input icon="watch_later"
                   label="Twitter"
                   onChange={
                     value => editSocial('twitter', value)
                   }
                   value={ social.twitter_link } />
            <Input icon="watch_later"
                   label="Google Plus"
                   onChange={
                     value => editSocial('plus', value)
                   }
                   value={ social.google_plus } />
            <Input icon="watch_later"
                   label="Instagram"
                   onChange={
                     value => editSocial('instagram', value)
                   }
                   value={ social.instagram } />
            <Input icon="watch_later"
                   label="LinkedIn"
                   onChange={
                     value => editSocial('linkedin', value)
                   }
                   value={ social.linkedin } />
          </CardText>
          <CardActions>
            <Button className="sh-btn--yellow" label="update" onClick={ () => postUpdates(info, shop, token) } />
          </CardActions>
        </Card>
      </div>
      <div className="Settings-payment-gourp">
        <Card>
          <CardTitle title="Shop Payment" />
          <CardText>
            {
              banks && banks.list[0] ?
                <CustomAutocomplete label="Bank Name"
                                    source={ banks }
                                    value={ !editing ? activeBank && activeBank.name : bankUIValue }
                                    selectionOnly
                                    keyname="name"
                                    handleSetValue={ text => handleSetValue('bank', text) }
                                    onSelected={ id => handleSelect('bank', id) }
                                    editing={ editing }
                                  /> :
                <Input label="Bank Name"
                       value={ activeBank && activeBank.name } />
            }
            {
              branches ?
                <CustomAutocomplete label="Branch Name"
                                    source={ branches }
                                    value={ branchUIValue }
                                    selectionOnly
                                    keyname="name"
                                    handleSetValue={ text => handleSetValue('branch', text) }
                                    onSelected={ id => handleSelect('branch', id) }
                                  /> :
                <Input label="Branch Name"
                       value={ payments.bank && payments.bank.name } />
            }
            <Input  type="text"
                    label="Account Name"
                    value={ editing ? accountNameUIValue : payments.account_name }
                    onChange={ text => handleSetValue('account_name', text) } />
            <Input  type="text"
                    label="Account Number"
                    value={ editing ? accountNumberUIValue : payments.account_number }
                    onChange={ text => handleSetValue('account_number', text) } />
          </CardText>
          <CardActions>
            <Button className="sh-btn--yellow" label="update" onClick={ () => postBankInfo(bankUIID, branchUIID, accountNameUIValue, accountNumberUIValue, shop, token) } />
          </CardActions>
        </Card>
        {/*<Card>
          <CardTitle title="Shop Shipping" />
            Shipping Information:
            a. Pick up Address (Checkbox to write, same as shop address)
            b. Preferred pick up time slot
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
