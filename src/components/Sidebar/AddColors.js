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

const AddColors = ({
  productSubCategory,
  primaryAttributes,
  secondaryAttributes,
  handleSelect,
  handleAttributeSelect,
  handleStockUpdate,
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
                        () => handleAddVairance(productSubCategory)
                      }
                      className="ProductsSidebar-add--color" />
      </div>
      <div className="ProductsSidebar-add-attributes">
      {
        ( selectedAttribute !== -1 ) &&
          <Card className="ProductsSidebar-add-attributes--card">
            {
              secondaryAttributes[primaryAttributes[selectedAttribute].id].custom ?
                      <CustomAutocomplete label="Change variant name"
                                          source={ fusedAttributes }
                                          value={ primaryAttributes[selectedAttribute].value }
                                          keyname="value"
                                          onSelected={ id => handleFieldSelect('ATTRIBUTE_PRIMARY', {id, primary: primaryAttributes[selectedAttribute].id}, null, rawAttributes) }
                                          handleSetValue={ value => handleManualInput('select', 'attribute', {primary: primaryAttributes[selectedAttribute].id, value})} />
              :
              <CardTitle
                title={ primaryAttributes[selectedAttribute].value }
              />
            }
            <Table  selectable
                    className="ProductsSidebar-add-attributes--table"
                    onRowSelect={ selected => {
                      handleAttributeSelect(
                        selected,
                        primaryAttributes[selectedAttribute].id,
                        secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes[selected[0]] ?
                          secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes[selected[0]].stock :
                          null
                      )
                    }}>

            <TableHead>
              <TableCell>Attribute<br/><p style={{margin: '0', color: 'grey', fontWeight: '300', marginTop: '-0.5rem',}}>e.g. size</p></TableCell>
              <TableCell>Value<br/><p style={{margin: '0', color: 'grey', fontWeight: '300', marginTop: '-0.5rem',}}>(e.g. S, M, L)</p></TableCell>
              <TableCell numeric>Stock</TableCell>
            </TableHead>

            {
              secondaryAttributes[primaryAttributes[selectedAttribute].id].attributes.map(
                    (attribute, key) =>
                          <TableRow key={key} selected={ attribute.stock > 0 }>
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
              (secondaryAttributes[primaryAttributes[selectedAttribute].id].custom ||
               secondaryAttributes[primaryAttributes[selectedAttribute].id].fromList ) ?
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
                : null
              }
            </Table>
          <CardActions>
            <Button icon="close" label="cancel" onClick={ () => handleSelect(-1, primaryAttributes[selectedAttribute].id) }/>
            <Button icon="done" label="done" onClick={ () => setAttributeDone(primaryAttributes[selectedAttribute].id) } />
          </CardActions>
      </Card>
      }
      </div>
    </div>
  )
}

export default AddColors;
