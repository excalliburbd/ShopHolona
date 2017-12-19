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
            color,
            img,
            id,
            name,
          }) => {
            if (!color && img) {
              return <div className="ProductCardOverlay-item">
                <div className="ProductCardOverlay-circle"
                          style={{
                            backgroundImage: `url(${img})`,
                          }}
                          onClick={
                            () => handleSelected(id)
                          } />
                <p>{ name }</p>
              </div>
            }

            return <div className="ProductCardOverlay-item">
              <div  className="ProductCardOverlay-circle"
                    style={{
                      background: color,
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
