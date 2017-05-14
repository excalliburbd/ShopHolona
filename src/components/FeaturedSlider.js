import React from 'react';

import IconButton from 'react-toolbox/lib/button/IconButton';

import ProductCard from './ProductCard';

import './FeaturedSlider.css';

const FeaturedSlider = ({
  products = [
    <ProductCard rating="5" />,
    <ProductCard rating="4" />,
    <ProductCard rating="3" />,
    <ProductCard rating="3" />,
    <ProductCard rating="3" />,
    <div className="emptydiv-featured"></div>
  ]
}) => {
  return (
    <div className="FeaturedSlider">
      {/*<div>Featured Products</div>*/}
      <div className="FeaturedSlider-products">
        <h1>Featured Products</h1>
        { products }
      </div>
    </div>
  );
}

export default FeaturedSlider;
