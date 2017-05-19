import React from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Table from 'react-toolbox/lib/table/Table';
import TableHead from 'react-toolbox/lib/table/TableHead';
import TableRow from 'react-toolbox/lib/table/TableRow';
import TableCell from 'react-toolbox/lib/table/TableCell';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

import CustomAutocomplete from './CustomAutocomplete';

import './ProductsSidebar.css'

const ProductsSidebar = ({
  type,
  handleFieldSelect,
  categories,
  subCategories,
  subSubCategories,
  categoryID,
  subCategoryID,
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
  handleFiles,
  handleRemoveImg,
  productCategory,
  productSubCategory,
  productSubSubCategory,
  productName,
  productWeight,
  productPrice,
  productDescription,
  handleManualInput,
  finishedProduct,
  handleSaveProduct,
  token,
  shop,
}) => {
  switch(type) {
    case 'ADD_PRODUCT':
    case 'ADD_SERVICE':
      return <div className="ProductsSidebar-add">
                <RadioGroup name='comic'
                            className="ProductsSidebar-add--radio"
                            value={ radioValue }
                            onChange={ handleRadio }>
                  <RadioButton label='Product' value='PRODUCT'/>
                  <RadioButton label='Service' value='SERVICE'/>
                </RadioGroup>

                {
                  (radioValue === 'PRODUCT') &&
                    <div className="ProductsSidebar-add--products">
                      <CustomAutocomplete
                        label='Enter Product Category'
                        source={ categories }
                        value={ productCategory }
                        onSelected={ id => handleFieldSelect('CATEGORY', id) }
                        handleSetValue={ value => handleManualInput('CATEGORY', value)}
                      />
                      <CustomAutocomplete
                        label='Enter Product Sub Category'
                        source={ subCategories }
                        value={ productSubCategory }
                        onSelected={ id => handleFieldSelect('SUB_CATEGORY', categoryID, id) }
                        handleSetValue={ value => handleManualInput('SUB_CATEGORY', value)}
                      />
                      <CustomAutocomplete
                        label='Enter Type of Product'
                        source={ subSubCategories }
                        value={ productSubSubCategory }
                        onSelected={
                          (id, categoryObj ) => {
                            handleFieldSelect('SUB_SUB_CATEGORY', id);
                            handleCategoryObj(categoryObj);
                          }
                        }
                        handleSetValue={ value => handleManualInput('SUB_SUB_CATEGORY', value)}
                      />
                     {
                        (primaryAttributes.length > 0) && <div>
                          <Input label="Enter Your Product Name"
                                required
                                onChange={ value => handleManualInput('NAME', value) }
                                value={ productName } />
                          <Input label="Enter Your Product Weight"
                                required
                                type="number"
                                onChange={ value => handleManualInput('WEIGHT', value) }
                                value={ productWeight } />
                          <Input label="Enter Your Product Price"
                                type="number"
                                required
                                onChange={ value => handleManualInput('PRICE', value) }
                                value={ productPrice } />
                          <Input label="Enter Your Product Description"
                                onChange={ value => handleManualInput('DESC', value) }
                                value={ productDescription } />

                          {
                            showAddColors && <div>
                              <div className="ProductsSidebar-add--colors">
                                <h3>Pick product colors</h3>
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
                                                            background: (obj.value) ?
                                                                        obj.value.toLowerCase() : null
                                                          }}
                                                          key={ obj.id }
                                                          className="ProductsSidebar-add--color" />
                                  )
                                }
                              </div>
                              <div className="ProductsSidebar-add-attributes">
                              {
                                ( selectedAttribute !== -1 ) &&
                                  <Card className="ProductsSidebar-add-attributes--card">
                                    <CardTitle
                                        title={ primaryAttributes[selectedAttribute].value }
                                      />
                                    <Table selectable
                                          onRowSelect={ selected => handleAttributeSelect(selected, primaryAttributes[selectedAttribute].id) }>
                                      <TableHead>
                                        <TableCell>Size</TableCell>
                                        <TableCell numeric >Stock</TableCell>
                                      </TableHead>
                                      {
                                        secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes.map(
                                          (attribute, key) =>
                                                <TableRow key={key} selected={ attribute.selected }>
                                                  <TableCell>{ attribute.value }</TableCell>
                                                  <TableCell numeric>
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
                                    </Table>
                                  <CardActions>
                                    <Button icon="close" label="cancle" onClick={ () => handleSelect(-1) }/>
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
    case 'ADD_PRODUCT_IMAGES':
      return <div className="ProductsSidebar-img">
              <h3>Add Product Images</h3>
               {
                 primaryAttributes
                 .filter( obj => obj.selected )
                 .map(
                      (obj, key) => <div className="ProductsSidebar-img-variants" key={ key }>
                                      <div className="ProductsSidebar-img-variants--title">
                                        <IconButton style={{
                                                      background: (obj.value) ?
                                                                  obj.value.toLowerCase() : null,
                                                      boxShadow: 'var(--shadow-4p)'
                                                    }} />
                                        <h4>{ obj.value }</h4>
                                      </div>
                                      <div className="ProductsSidebar-img-variants--content">
                                        <Dropzone className="ProductsSidebar-img-dropzone"
                                                  onDrop={ files => handleFiles(obj.id, obj.files, files, productName, shop, token) }>
                                          <FontIcon value='add' />
                                        </Dropzone>
                                        {
                                          obj.files.map(
                                            (file, key) => <div  onClick={ () => handleRemoveImg(obj.id, key) }
                                                                        key={ key }
                                                                        style={{
                                                                          background: `url(${ file.preview }) no-repeat center center`,
                                                                          height: '6em',
                                                                          width: '4em',
                                                                          margin: '.5em',
                                                                        }} />
                                          )
                                        }
                                      </div>
                                    </div>

                    )
                }
            <div className="ProductsSidebar-add-actions">
                  <Button icon="backspace"
                          label="go back"
                          onClick={
                            () => handleShowRoute('ADD_PRODUCTS')
                          } />
                  <Button icon="done"
                          label="done"
                          onClick={
                            () => handleSaveProduct(finishedProduct, shop, token)
                          } />
                </div>
             </div>
    default:
    return <div className="ProductsSidebar-empty"/>
  }
}

export default ProductsSidebar;
