import React from 'react';

import IconButton from 'react-toolbox/lib/button/IconButton';
import Table from 'react-toolbox/lib/table/Table';
import TableHead from 'react-toolbox/lib/table/TableHead';
import TableRow from 'react-toolbox/lib/table/TableRow';
import TableCell from 'react-toolbox/lib/table/TableCell';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

import CustomAutocomplete from '../CustomAutocomplete';

const AddVariances = ({
  productSubCategory,
  primaryAttributes,
  secondaryAttributes,
  handleSelect,
  handleAttributeSelect,
  handleSecondaryAttributeUpdate,
  selectedAttribute,
  setAttributeDone,
  handleStockInputBlur,
  handleAddVairance,
  temporaryAttribute,
  handleSetTemporaryAttribute,
  type,
  fusedAttributes,
  rawAttributes,
  handleFieldSelect,
  handleManualInput,
}) => {
  return (
    <div>
      <div className="ProductsSidebar-add--colors">
        <h3>Product Variances</h3>
        {
          primaryAttributes.map(
            (obj, key) =>
                  <Card className="ProductsSidebar-add-attributes--card" key={ key }>
                  {
                    secondaryAttributes[obj.id].custom ?
                      <CustomAutocomplete label="Change variant name"
                                          source={ fusedAttributes }
                                          value={ obj.value }
                                          keyname="value"
                                          onSelected={ id => handleFieldSelect('ATTRIBUTE_PRIMARY', {id, primary: obj.id}, null, rawAttributes) }
                                          handleSetValue={ value => handleManualInput('select', 'attribute', {primary: obj.id, value})} />
                      :
                      <CardTitle
                        title={ obj.value }
                        avatar={
                          <IconButton  icon={
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
                        }
                      />
                  }
                  <Table selectable
                          className="ProductsSidebar-add-attributes--table"
                          onRowSelect={ selected => {
                            primaryAttributes[selectedAttribute] &&
                            secondaryAttributes[primaryAttributes[selectedAttribute].id] &&
                            handleAttributeSelect(
                              selected,
                              primaryAttributes[selectedAttribute].id,
                              secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes[selected[0]] ?
                                secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes[selected[0]].stock :
                                null
                            )}} >

                  <TableHead>
                    <TableCell>Attribute<br/><p className="ProductsSidebar-add-attributes--headerhint">e.g. size</p></TableCell>
                    <TableCell>Value<br/><p className="ProductsSidebar-add-attributes--headerhint">e.g. S, XL</p></TableCell>
                    <TableCell numeric>Stock</TableCell>
                  </TableHead>

                  {
                    secondaryAttributes[obj.id].attributes.map(
                          (attribute, key) =>
                                <TableRow key={key} selected={ attribute.stock > 0 }>
                                  <TableCell>
                                    {
                                      (secondaryAttributes[obj.id].custom ||
                                      secondaryAttributes[obj.id].fromList ) ?
                                          <Input  value={ attribute.name }
                                                  onChange={
                                                    value => handleSecondaryAttributeUpdate( 'NAME', value, primaryAttributes[selectedAttribute].id, key)
                                                  } /> :
                                          `${attribute.name}`
                                    }
                                  </TableCell>
                                  <TableCell>
                                    {
                                      (secondaryAttributes[obj.id].custom ||
                                      secondaryAttributes[obj.id].fromList ) ?
                                          <Input  value={ attribute.value }
                                                  onChange={
                                                    value => handleSecondaryAttributeUpdate( 'VALUE', value, primaryAttributes[selectedAttribute].id, key)
                                                  } /> :
                                          `${attribute.value}`
                                    }
                                  </TableCell>
                                  <TableCell numeric className="ProductsSidebar-add-attributes--stock">
                                      <Input value={ attribute.stock }
                                              type="number"
                                              onBlur={
                                                () => {
                                                  handleStockInputBlur(primaryAttributes[selectedAttribute].id)
                                                }
                                              }
                                              onChange={
                                                value => handleSecondaryAttributeUpdate( 'STOCK', value, primaryAttributes[selectedAttribute].id, key)
                                              } />
                                  </TableCell>
                                </TableRow>
                        )
                  }
                  </Table>
                  {
                    (secondaryAttributes[obj.id].custom ||
                    secondaryAttributes[obj.id].fromList ) &&
                      <Button icon="add"
                              raised
                              disabled={
                                secondaryAttributes[obj.id].attributes.slice(-1)[0] &&
                                (
                                  secondaryAttributes[obj.id].attributes.slice(-1)[0].name === '' ||
                                  secondaryAttributes[obj.id].attributes.slice(-1)[0].value === ''
                                )
                              }
                              onClick={ () => {
                                handleSetTemporaryAttribute(
                                    primaryAttributes[selectedAttribute].id,
                                    {
                                      key: '',
                                      value: '',
                                      stock: ''
                                    }
                                  ) }
                                } />
                    }
                <CardActions>
                  <Button icon="close" label="cancel" onClick={ () => handleSelect(-1, obj.id) }/>
                  <Button icon="done" label="done" onClick={ () => setAttributeDone(obj.id) } />
                </CardActions>
            </Card>
          )
        }
        <Card className="ProductsSidebar-add-attributes--card"
              onClick={
                () => handleAddVairance(productSubCategory)
              }>
                <CardTitle
                  title="Add Custom Variance"
                  avatar={
                    <IconButton   icon="add"
                                  style={{ background: "#ccc"}} />
                  }
                />
        </Card>
      </div>
    </div>
  )
}

export default AddVariances;
