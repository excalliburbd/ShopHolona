import React from 'react';

import './FeaturedSlider.css';

const FeaturedSlider = ({ products }) => {
  products.push(<div className="emptydiv-featured" key="featured-products"></div>);

  return (
    <div className="FeaturedSlider">
      <div className="FeaturedSlider-products">
        <div className="FeaturedSlider-text"><h1>Featured Products</h1></div>
        { products }
      </div>
    </div>
  );
}

export default FeaturedSlider;
