import React from 'react';

import Button from 'react-toolbox/lib/button/Button';
import { CirclePicker } from 'react-color';

import './ProductDetailsMain.css'

const ProductDetailsMain = ({
  id,
  variances,
  addToCart,
  weight,
  selectedVariant,
  selectedAttribute,
  select,
  chooseAttribute,
  token,
  short_desc: shortDesc,
}) => {
  if ( shortDesc === '' ) {
    shortDesc = 'No description available';
  }

  const colorsArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"].slice(0, variances.length);

  if (colorsArray.length < variances.length) {
    for(let i=0; i<(variances.length - colorsArray.length); i++) {
      colorsArray.puah('#ccc');
    }
  }

  const attributesArray = variances[selectedVariant].attributes;

  return (
    <div className="details-main-container">
      <div className="details-main-primay">
        <h4 className="details-main-subtitle">{ variances[0].type.name }</h4>
        <CirclePicker
          colors={ colorsArray }
          width= "80%"
          color={ colorsArray[selectedVariant] }
          onChangeComplete={ (color) => {
            let key = colorsArray.indexOf(color.hex);

            if (key === -1) {
              key = 0;
            }

            select(id, key);
          }}
        />
      </div>

      <div className="details-main-secondary">
        <h4 className="details-main-subtitle">
          { attributesArray[0].type.name }
        </h4>
        <ul className="details-sizes">
          {
            attributesArray.map(
              (attribute, key) => {
                return <li className={
                            (key === selectedAttribute) ?
                              'details-main-secondary-size details-main-secondary-size--selected' :
                              'details-main-secondary-size'
                          }
                          onClick={
                            () => {
                              chooseAttribute(id, key);
                            }
                          }
                          key={ key }>
                          { attribute.type.value }
                        </li>
              }
            )
          }
        </ul>
      </div>

      <div className="details-main-desc">
        <h4 className="details-main-subtitle">Description</h4>
        <p>{ shortDesc }</p>
      </div>

      <div className="details-main-weight">
        <h4 className="details-main-subtitle">Weight</h4>
        <p>{ weight } kg </p>
      </div>

      <div className="details-action">
        <Button className="details-action-cart"
                onClick={
                          () => addToCart(
                                  variances[selectedVariant].attributes[selectedAttribute].id,
                                  token,
                                  id
                                )
                        }
                label='Add to cart'
                raised
                primary />
      </div>

    </div>
  );

}

export default ProductDetailsMain;
