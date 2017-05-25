import React from 'react';

import IconButton from 'react-toolbox/lib/button/IconButton';

import ProductCard from './ProductCard';

import './FeaturedSlider.css';

const FeaturedSlider = ({
  products
}) => {

  products.push(<div className="emptydiv-featured"></div>);

  return (
    <div className="FeaturedSlider">
      {/*<div>Featured Products</div>*/}
      <div className="FeaturedSlider-products">
        <div className="FeaturedSlider-text"><h1>Featured Products</h1></div>
        { products }
      </div>
    </div>
  );
}

export default FeaturedSlider;
