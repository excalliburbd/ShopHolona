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

const AddVariances = ({
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
  type
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
                      <Input label="Change variant name"
                              value={ obj.value }
                              />
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
                            handleAttributeSelect(
                              selected,
                              primaryAttributes[selectedAttribute].id,
                              secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes[selected[0]] ?
                                secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes[selected[0]].stock :
                                null
                            )}} >

                  <TableHead>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell numeric>Stock</TableCell>
                  </TableHead>

                  {
                    secondaryAttributes[obj.id].attributes.map(
                          (attribute, key) =>
                                <TableRow key={key} selected={ attribute.stock > 0 }>
                                  <TableCell>{ attribute.name }</TableCell>
                                  <TableCell>{ attribute.value }</TableCell>
                                  <TableCell numeric className="ProductsSidebar-add-attributes--stock">
                                      <Input value={ attribute.stock }
                                              type="number"
                                              onBlur={
                                                () => {
                                                  handleStockInputBlur(obj.id)
                                                }
                                              }
                                              onChange={
                                                value => handleStockUpdate( 'VALUE', value, obj.id, key)
                                              } />
                                  </TableCell>
                                </TableRow>
                        )
                  }
                  {
                    secondaryAttributes[obj.id].custom ?
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
                                          obj.id,
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
                      : null
                    }
                  </Table>
                <CardActions>
                  <Button icon="close" label="cancel" onClick={ () => handleSelect(-1, obj.id) }/>
                  <Button icon="done" label="done" onClick={ () => setAttributeDone(obj.id) } />
                </CardActions>
            </Card>
          )
        }
        <Card className="ProductsSidebar-add-attributes--card"
              onClick={
                () => handleAddVairace(productSubCategory)
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
