import React from 'react';

import './ProductCardOverlay.css';

const ProductCardOverlay = ({
  items,
  handleSelected,
  title,
  type,
}) => (
  <div className="ProductCardOverlay">
    <h2>{ title }</h2>
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
                      () => handleSelected(id+1)
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
