import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import './ProductCardOverlayAttribute.css';

const ProductCardOverlayAttribute = ({
  items,
  handleSelected,
  handleGoBack,

}) => (
  <div className="ProductCardOverlayAttribute">
    <div className="ProductCardOverlayAttributeButtonContainer">
      <Button icon="keyboard_arrow_left"
              floating
              mini
              onClick={ handleGoBack } />
    </div>
    <h2>Choose Size/Attribute</h2>
    <div className="ProductCardOverlayAttribute-container">
      {
        items.map(
          ({
            value,
            id,
          }) => {
            return <div className="ProductCardOverlayAttribute-item">
              <div  className="ProductCardOverlayAttribute-circle"
                    onClick={
                      () => handleSelected(id+1)
                    } >{ value }</div>
            </div>
          }
        )
      }
    </div>
  </div>
);

export default ProductCardOverlayAttribute;
