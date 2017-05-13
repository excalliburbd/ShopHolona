import React from 'react';
import classNames from 'classnames';

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
  handleAttributeSelect
}) => {
  switch(type) {
    case 'ADD_PRODUCT':
      return <div className="ProductsSidebar-add">
                <CustomAutocomplete
                  label='Enter Product Category'
                  source={ categories }
                  onSelected={ id => handleFieldSelect('CATEGORY', id) }
                />
                <CustomAutocomplete
                  label='Enter Product Sub Category'
                  source={ subCategories }
                  onSelected={ id => handleFieldSelect('SUB_CATEGORY', categoryID, id) }
                />
                <CustomAutocomplete
                  label='Enter Type of Product'
                  source={ subSubCategories }
                  onSelected={
                    (id, categoryObj ) => {
                      handleFieldSelect('SUB_SUB_CATEGORY', id);
                      handleCategoryObj(categoryObj);
                    }
                  }
                />
                {
                  (primaryAttributes.length > 0) ?
                    <div className="ProductsSidebar-add--colors">
                      <h3>Pick product colors</h3>
                      {
                        primaryAttributes.map(
                          obj => <IconButton  icon={
                                                  (obj.selected) ?
                                                  'done' :
                                                  <span />
                                                }
                                                onClick={
                                                  () => handleSelect(obj)
                                                }
                                                style={{
                                                  background: (obj.value) ?
                                                               obj.value.toLowerCase() : null
                                                }}
                                                key={ obj.id }
                                                className="ProductsSidebar-add--color" />
                        )
                      }
                    </div> :
                   null
                }
                <div className="ProductsSidebar-add-attributes">
                  {
                    primaryAttributes
                      .filter( obj => obj.selected )
                      .map(
                        (obj, key) => <Card className='ProductsSidebar-add-attributes--card' key={key} >
                                <div className="ProductsSidebar-add-attributes--card-heading">
                                  <h4>{ obj.value }</h4>
                                </div>
                                <Table selectable
                                       onRowSelect={ selected => handleAttributeSelect(selected, obj.id) }>
                                  <TableHead>
                                    <TableCell>Size</TableCell>
                                    <TableCell numeric >Stock</TableCell>
                                    <TableCell />
                                  </TableHead>
                                  {
                                    secondaryAttributes[obj.id].attributes.map(
                                      (attribute, key) =>
                                            <TableRow key={key} selected={ attribute.selected }>
                                              <TableCell>{ attribute.value }</TableCell>
                                              <TableCell numeric>
                                                  { attribute.stock }
                                              </TableCell>
                                              <TableCell>
                                                  <IconButton icon="keyboard_arrow_up" />
                                                  <IconButton icon="keyboard_arrow_down" />
                                              </TableCell>
                                            </TableRow>
                                    )
                                  }
                                  </Table>
                              </Card>
                    )
                  }
                </div>
            </div>
      default:
      return <div />
  }
}

export default ProductsSidebar;
