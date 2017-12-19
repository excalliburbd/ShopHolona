import React from 'react';

import Button from 'react-toolbox/lib/button/Button';

import './ProductCardOverlay.css';

const ProductCardOverlay = ({
  items,
  handleSelected,
  handleGoBack
}) => (
  <div className="ProductCardOverlay">
    <div className="ProductCardOverlayAttributeButtonContainer">
      <Button icon="keyboard_arrow_left"
              floating
              mini
              onClick={ handleGoBack } />
      <h2>Choose Color/Variant</h2>
    </div>
    <div className="ProductCardOverlay-container">
      {
        items.map(
          ({
            img,
            id,
            name,
          }) => {
            return <div className="ProductCardOverlay-item">
              <div  className="ProductCardOverlay-circle"
                    style={{
                      background: `url(${img})`,
                      backgroundSize: 'contain',
                    }}
                    onClick={
                      () => handleSelected(id)
                    } />
              <p>{ name }</p>
            </div>
          }
        )
      }
    </div>
  </div>
);

export default ProductCardOverlay;
