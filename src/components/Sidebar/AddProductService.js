import React from 'react';
import classNames from 'classnames';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input/Input';

import CustomAutocomplete from '../CustomAutocomplete';
import AddColors from './AddColors';
import AddVariances from './AddVariances';

const AddProductService = ({
  handleFieldSelect,
  categories,
  subCategories,
  subSubCategories,
  categoryID,
  handleCategoryObj,
  radioValue,
  handleRadio,
  showAddColors,
  showAddImages,
  handleShowRoute,
  productCategory,
  productSubSubCategory,
  productName,
  productWeight,
  productPrice,
  productDescription,
  handleManualInput,
  showProductDetails,
  productSubCategory,
  primaryAttributes,
  secondaryAttributes,
  handleSelect,
  handleAttributeSelect,
  handleStockUpdate,
  selectedAttribute,
  setAttributeDone,
  handleStockInputBlur,
  handleAddVairace,
  temporaryAttribute,
  handleSetTemporaryAttribute,
  type,
  showServiceDetails,
  serviceTitle,
  serviceFee,
  serviceDescription,
  showAddVariances,
  fcom,
  fcomPrice,
  showInfo,
  togglePricingInfo,
}) => {

  const infoClass = classNames('ProductsSidebar-add--products--info', {
    'ProductsSidebar-add--products--info--show': showInfo,
  });

  return (
    <div className="ProductsSidebar-add">
                {
                    <div className="ProductsSidebar-add--radio" >
                      {/*<Button icon={ <Icon size={ 32 } icon={ packageIcon } />}
                              label='Product'
                              className={
                                (radioValue === 'PRODUCT') ?
                                  'ProductSidebar-add-product ProductSidebar-add-product--active' :
                                  'ProductSidebar-add-product'
                              }
                              onClick={ () => handleRadio('PRODUCT') } />
                      <Button icon={ <Icon size={ 32 } icon={ tools } /> }
                              label="service"
                              className={
                                (radioValue === 'SERVICE') ?
                                  'ProductSidebar-add-service ProductSidebar-add-service--active' :
                                  'ProductSidebar-add-service'
                              }
                              onClick={ () => handleRadio('SERVICE') } />*/}
                    </div>
                }

                  {/*(radioValue === 'PRODUCT' || radioValue === 'SERVICE') &&*/}
                {
                    <div className="ProductsSidebar-add--products">
                      <CustomAutocomplete
                        label={`Enter ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Class`}
                        source={ categories }
                        value={ productCategory }
                        selectionOnly
                        onSelected={ id => handleFieldSelect('CATEGORY', id) }
                        handleSetValue={ value => handleManualInput('add', 'category', value)}
                      />
                      <CustomAutocomplete
                        label={`Enter ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Category`}
                        source={ subCategories }
                        value={ productSubCategory }
                        selectionOnly
                        onSelected={ id => handleFieldSelect('SUB_CATEGORY', categoryID, id) }
                        handleSetValue={ value => handleManualInput('add', 'subCategory', value)}
                      />
                      <CustomAutocomplete
                        label={`Enter type of ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' }`}
                        source={ subSubCategories }
                        value={ productSubSubCategory }
                        onSelected={
                          (id, categoryObj ) => {
                            handleFieldSelect('SUB_SUB_CATEGORY', id);
                            handleCategoryObj(categoryObj);
                          }
                        }
                        handleSetValue={ value => handleManualInput('add', 'subSubCategory', value)}
                      />
                     {
                        showProductDetails && <div>
                          <Input label={'Enter Your Product Name'}
                                required
                                onChange={ value => handleManualInput('add', 'name', value) }
                                value={ productName } />
                          <Input label={'Enter Your Product Weight(in grams)'}
                              required
                              type="number"
                              onChange={ value => handleManualInput('add', 'weight', value) }
                              value={ productWeight } />
                          <Input label={'Enter Your Product Price'}
                                type="number"
                                required
                                onChange={ value => handleManualInput('add', 'price', value) }
                                value={ productPrice } />
                          {
                            fcom &&
                              <p className="ProductSidebar-details--commission">
                                Charged to customer: { fcomPrice } &#2547;
                                <IconButton icon="info_outline"
                                            onClick={ togglePricingInfo } />
                              </p>
                          }
                          <div className={ infoClass }>
                            <p>We charge a minimum commission per product for insurance and so that you don't lose the competitive edge:</p>
                            <ul>
                              <li>BDT 1 - BDT 999 : 8%</li>
                              <li>BDT 1000 - BDT 4999 : 6%</li>
                              <li>BDT 5000 - BDT 9,999 : 4%</li>
                              <li>BDT 10,000 - BDT 19,999 : 2%</li>
                              <li>BDT 20,000+ : 1%</li>
                            </ul>
                          </div>
                          <Input label={'Enter Your Product Description'}
                                onChange={ value => handleManualInput('add', 'desc', value) }
                                value={ productDescription } />

                          {
                            showAddColors
                              && <AddColors productSubCategory={ productSubCategory }
                                                        primaryAttributes={ primaryAttributes }
                                                        secondaryAttributes={ secondaryAttributes }
                                                        handleSelect={ handleSelect }
                                                        handleAttributeSelect={ handleAttributeSelect }
                                                        handleStockUpdate={ handleStockUpdate }
                                                        selectedAttribute={ selectedAttribute }
                                                        setAttributeDone={ setAttributeDone }
                                                        handleStockInputBlur={ handleStockInputBlur }
                                                        handleAddVairace={ handleAddVairace }
                                                        temporaryAttribute={ temporaryAttribute }
                                                        handleSetTemporaryAttribute={ handleSetTemporaryAttribute }
                                                        type={ type } />
                          }
                          {
                            showAddVariances
                              && <AddVariances  productSubCategory={ productSubCategory }
                                                primaryAttributes={ primaryAttributes }
                                                secondaryAttributes={ secondaryAttributes }
                                                handleSelect={ handleSelect }
                                                handleAttributeSelect={ handleAttributeSelect }
                                                handleStockUpdate={ handleStockUpdate }
                                                selectedAttribute={ selectedAttribute }
                                                setAttributeDone={ setAttributeDone }
                                                handleStockInputBlur={ handleStockInputBlur }
                                                handleAddVairace={ handleAddVairace }
                                                temporaryAttribute={ temporaryAttribute }
                                                handleSetTemporaryAttribute={ handleSetTemporaryAttribute }
                                                type={ type } />
                          }
                        </div>
                     }
                     {
                       showServiceDetails && <div>
                         <Input label={'Enter Your service title'}
                                required
                                onChange={ value => handleManualInput('service', 'title', value) }
                                value={ serviceTitle } />
                         <Input label={'Enter Your service fee'}
                                type="number"
                                required
                                onChange={ value => handleManualInput('service', 'fee', value) }
                                value={ serviceFee } />
                          <Input label={'Enter Your service description'}
                                onChange={ value => handleManualInput('service', 'desc', value) }
                                value={ serviceDescription } />
                       </div>
                     }
                    <div className="ProductsSidebar-add-actions">
                      <Button label="Next"
                              icon="send"
                              onClick={
                                () => handleShowRoute('ADD_IMAGES')
                              }
                                disabled={ showAddImages } />
                      </div>
                    </div>
                }
            </div>
  )
}

export default AddProductService;
