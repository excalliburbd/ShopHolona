import React from 'react';

import IconButton from 'react-toolbox/lib/button/IconButton';

import ProductCard from './ProductCard';

import './FeaturedSlider.css';

const FeaturedSlider = ({
  products = [
    <ProductCard rating="5" />,
    <ProductCard rating="4" />,
    <ProductCard rating="3" />,
  ]
}) => {
  return (
    <div className="FeaturedSlider">
      {/*<IconButton icon="keyboard_arrow_left" className="ShopPage-featured-nav" />*/}
      <div className="FeaturedSlider-products">
        { products }
      </div>
      {/*<IconButton icon="keyboard_arrow_right" className="ShopPage-featured-nav" />*/}
    </div>
  );
}

export default FeaturedSlider;
