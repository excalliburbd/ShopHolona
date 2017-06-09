import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import ProductDetailsMain from './ProductDetailsMain';
import Stars from './Stars'
import './ProductDetails.css'

class CartProduct extends Component {
  state = {
    quantity: 0,
    detailsTabIndex: 0,
  };

  handleDetailsTabChange = (index) => {
    this.setState({detailsTabIndex: index});
  };

  render() {
    const images = [
      {
        original: 'http://lorempixel.com/200/200/fashion',
        thumbnail: 'http://lorempixel.com/250/250/fashion',
      },
      {
        original: 'http://lorempixel.com/600/400/fashion',
        thumbnail: 'http://lorempixel.com/250/150/fashion',
      },
      {
        original: 'http://lorempixel.com/400/600/fashion',
        thumbnail: 'http://lorempixel.com/150/350/fashion'
      }
    ]

    return (
      <div className="product-details-container">
        <div className="product-details-left">
          <h1 className="product-details-title">Product Name</h1>
          <div className="product-details-price-title">
            <h2 className="product-details-price">Price: &#2547; 2000</h2>
            <Stars rating={ 3 } />
          </div>
          <div className="product-details-slider">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showBullets={true}
              showNav={false}
            />
          </div>

        </div>

        <div className="product-details-right">
          <Tabs className="product-details-tabs" index={this.state.detailsTabIndex} onChange={this.handleDetailsTabChange} fixed>
            <Tab label='Details'><small><ProductDetailsMain/></small></Tab>
            <Tab label='Specifications'><small>Product Specifications Not Available</small></Tab>
          </Tabs>
        </div>

      </div>
    );
  }
}

export default CartProduct;
