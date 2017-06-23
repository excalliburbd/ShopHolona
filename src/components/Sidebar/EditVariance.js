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

const EditVariance = ({
  product,
  variant
}) => {
  const variance = product.variances[variant];
  const attributes = product.category.secondary_attr.map(
                        attribute => {

                          const found = variance.attributes.find(
                            attr => attr.type.id === attribute.id
                          );

                          if (found) {
                            return found
                          }

                          return {
                            type: attribute,
                            description: '',
                            weight: '',
                            price: '',
                            stock: '',
                          }
                        }
                     )

  return (
    <div>
      <div className="ProductsSidebar-add--colors">
        <CardTitle title={ variance.type.value }/>
        <Card className="ProductsSidebar-add-attributes--card" >
          <Table  selectable
                  className="ProductsSidebar-add-attributes--table"
                  onRowSelect={ selected => null }>

            <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell numeric>Stock</TableCell>
            </TableHead>

            {
              attributes.map(
                    (attribute, key) =>
                      <TableRow key={key} selected={ attribute.stock > 0 }>
                        <TableCell>{ attribute.type.name }</TableCell>
                        <TableCell>{ attribute.type.value }</TableCell>
                        <TableCell numeric className="ProductsSidebar-add-attributes--stock">
                        <Input value={ attribute.stock }
                                type="number"
                                onBlur={
                                  () => null
                                }
                                onChange={
                                  value => null
                                } />
                        </TableCell>
                      </TableRow>
                )
              }
            </Table>
        </Card>
      </div>
    </div>
  )
}

export default EditVariance;
