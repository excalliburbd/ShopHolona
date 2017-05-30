import React from 'react';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Table from 'react-toolbox/lib/table/Table';
import TableHead from 'react-toolbox/lib/table/TableHead';
import TableRow from 'react-toolbox/lib/table/TableRow';
import TableCell from 'react-toolbox/lib/table/TableCell';
import CustomAutocomplete from '../CustomAutocomplete';

import Icon from 'react-icons-kit';
import { tools } from 'react-icons-kit/entypo/tools';
import { packageIcon } from 'react-icons-kit/oct/packageIcon';

const AddProductService = ({
  handleFieldSelect,
  categories,
  subCategories,
  subSubCategories,
  categoryID,
  handleCategoryObj,
  primaryAttributes,
  secondaryAttributes,
  handleSelect,
  handleAttributeSelect,
  radioValue,
  handleRadio,
  handleStockUpdate,
  selectedAttribute,
  setAttributeDone,
  showAddColors,
  showAddImages,
  handleStockInputBlur,
  handleShowRoute,
  productCategory,
  productSubCategory,
  productSubSubCategory,
  productName,
  productWeight,
  productPrice,
  productDescription,
  handleManualInput,
  showProductDetails,
  handleAddVairace,
  temporaryAttribute,
  handleSetTemporaryAttribute,
  type
}) => {

  return (
    <div className="ProductsSidebar-add">
                {
                    <div className="ProductsSidebar-add--radio" >
                      <Button icon={ <Icon size={ 32 } icon={ packageIcon } />}
                              label='Product'
                              className={
                                (type === 'ADD_PRODUCT') ?
                                  'ProductSidebar-add-product ProductSidebar-add-product--active' :
                                  'ProductSidebar-add-product'
                              }
                              onClick={ () => handleRadio('PRODUCT') } />
                      <Button icon={ <Icon size={ 32 } icon={ tools } /> }
                              label="service"
                              className={
                                (type === 'ADD_SERVICE') ?
                                  'ProductSidebar-add-service ProductSidebar-add-service--active' :
                                  'ProductSidebar-add-service'
                              }
                              onClick={ () => handleRadio('SERVICE') } />
                    </div>
                }
                {
                  (radioValue === 'PRODUCT' || radioValue === 'SERVICE') &&
                    <div className="ProductsSidebar-add--products">
                      <CustomAutocomplete
                        label={`Enter ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Category`}
                        source={ categories }
                        value={ productCategory }
                        selectionOnly
                        onSelected={ id => handleFieldSelect('CATEGORY', id) }
                        handleSetValue={ value => handleManualInput('ADD', 'CATEGORY', value)}
                      />
                      <CustomAutocomplete
                        label={`Enter ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Sub Category`}
                        source={ subCategories }
                        value={ productSubCategory }
                        selectionOnly
                        onSelected={ id => handleFieldSelect('SUB_CATEGORY', categoryID, id) }
                        handleSetValue={ value => handleManualInput('ADD', 'SUB_CATEGORY', value)}
                      />
                      <CustomAutocomplete
                        label={`Enter type of ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' }`}
                        source={ subSubCategories }
                        value={ productSubSubCategory }
                        selectionOnly
                        onSelected={
                          (id, categoryObj ) => {
                            handleFieldSelect('SUB_SUB_CATEGORY', id);
                            handleCategoryObj(categoryObj);
                          }
                        }
                        handleSetValue={ value => handleManualInput('ADD', 'SUB_SUB_CATEGORY', value)}
                      />
                     {
                        showProductDetails && <div>
                          <Input label={`Enter Your ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Name`}
                                required
                                onChange={ value => handleManualInput('ADD', 'NAME', value) }
                                value={ productName } />
                          {
                            (radioValue === 'PRODUCT') &&
                              <Input label={`Enter Your ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Weight`}
                                required
                                type="number"
                                onChange={ value => handleManualInput('ADD', 'WEIGHT', value) }
                                value={ productWeight } />
                          }
                          <Input label={`Enter Your ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Price`}
                                type="number"
                                required
                                onChange={ value => handleManualInput('ADD', 'PRICE', value) }
                                value={ productPrice } />
                          <Input label={`Enter Your ${ (radioValue === 'PRODUCT') ? 'Product' : 'Service' } Description`}
                                onChange={ value => handleManualInput('ADD', 'DESC', value) }
                                value={ productDescription } />

                          {
                            showAddColors && <div>
                              <div className="ProductsSidebar-add--colors">
                                <h3>Pick product { (productSubCategory === 'Clothing') ? 'color' : 'color' }</h3>
                                {
                                  primaryAttributes.map(
                                    (obj, key) => <IconButton  icon={
                                                            (obj.selected) ?
                                                            'done' :
                                                            <span />
                                                          }
                                                          onClick={
                                                            () => handleSelect(key)
                                                          }
                                                          style={{
                                                            background: (obj.value && (obj.value.split(' ')[0] !== 'Color')) &&
                                                                        (obj.value && (obj.value.split(' ')[0] !== 'Custom')) ?
                                                                          obj.value.toLowerCase() : '#ccc'
                                                          }}
                                                          key={ obj.id }
                                                          className="ProductsSidebar-add--color" />
                                  )
                                }
                                <IconButton   icon="add"
                                              style={{ background: "#ccc"}}
                                              onClick={
                                                () => handleAddVairace(productSubCategory)
                                              }
                                              className="ProductsSidebar-add--color" />
                              </div>
                              <div className="ProductsSidebar-add-attributes">
                              {
                                ( selectedAttribute !== -1 ) &&
                                  <Card className="ProductsSidebar-add-attributes--card">
                                    {
                                      secondaryAttributes[primaryAttributes[selectedAttribute].id].custom ?
                                      <Input label="Change vaniant name"
                                             value={ primaryAttributes[selectedAttribute].value }
                                             />
                                      :
                                      <CardTitle
                                        title={ primaryAttributes[selectedAttribute].value }
                                      />
                                    }
                                    <Table selectable
                                            className="ProductsSidebar-add-attributes--table"
                                            onRowSelect={ selected => handleAttributeSelect(selected, primaryAttributes[selectedAttribute].id) }>

                                    <TableHead>
                                      <TableCell>Name</TableCell>
                                      <TableCell>Value</TableCell>
                                      <TableCell numeric>Stock</TableCell>
                                    </TableHead>

                                    {
                                      secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes.map(
                                            (attribute, key) =>
                                                  <TableRow key={key} selected={ attribute.selected }>
                                                    <TableCell>{ attribute.name }</TableCell>
                                                    <TableCell>{ attribute.value }</TableCell>
                                                    <TableCell numeric className="ProductsSidebar-add-attributes--stock">
                                                        <Input value={ attribute.stock }
                                                                type="number"
                                                                onBlur={
                                                                  () => {
                                                                    handleStockInputBlur(primaryAttributes[selectedAttribute].id)
                                                                  }
                                                                }
                                                                onChange={
                                                                  value => handleStockUpdate( 'VALUE', value, primaryAttributes[selectedAttribute].id, key)
                                                                } />
                                                    </TableCell>
                                                  </TableRow>
                                          )
                                    }
                                    {
                                      secondaryAttributes[primaryAttributes[selectedAttribute].id].custom ?
                                          <TableRow>
                                            <TableCell>
                                              <Input  value={ temporaryAttribute.key }
                                                      onChange={
                                                        value => handleSetTemporaryAttribute( 'KEY', value)
                                                      }/>
                                            </TableCell>
                                            <TableCell>
                                              <Input  value={ temporaryAttribute.value }
                                                      onChange={
                                                        value => handleSetTemporaryAttribute( 'VALUE', value)
                                                      }/>
                                            </TableCell>
                                            <TableCell>
                                              <Input  value={ temporaryAttribute.stock }
                                                      onBlur={
                                                        () => {
                                                          handleSetTemporaryAttribute(
                                                            'ADD',
                                                            primaryAttributes[selectedAttribute].id,
                                                            temporaryAttribute
                                                          )
                                                        }
                                                      }
                                                      type="number"
                                                      onChange={
                                                        value => handleSetTemporaryAttribute( 'STOCK', value)
                                                      }/>
                                            </TableCell>
                                          </TableRow>
                                        :
                                           null                                   }
                                    </Table>
                                  <CardActions>
                                    <Button icon="close" label="cancle" onClick={ () => handleSelect(-1, primaryAttributes[selectedAttribute].id) }/>
                                    <Button icon="done" label="done" onClick={ () => setAttributeDone(primaryAttributes[selectedAttribute].id) } />
                                  </CardActions>
                              </Card>
                              }
                              </div>
                            </div>
                          }
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
