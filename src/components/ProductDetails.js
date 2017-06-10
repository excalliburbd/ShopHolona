import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import IconButton from 'react-toolbox/lib/button/IconButton';

import ProductDetailsMain from './ProductDetailsMain';
import Stars from './Stars';

import './ProductDetails.css'

class ProductDetails extends Component {
  state = {
    quantity: 0,
    detailsTabIndex: 0,
  };

  handleDetailsTabChange = (index) => {
    this.setState({detailsTabIndex: index});
  };

  render() {
    const {
      toggleDetails,
      product,
      selectedProductVariance,
      selectVariance,
      addToCart,
    } = this.props;

    const images = product.variances[selectedProductVariance].images.map(
      ({ image }) => ({
        original: image,
        thumbnail: image,
      })
    )

    return (
      <div className="product-details-container">
        <IconButton icon="close"
                    className="ProductDetails--toggle"
                    onClick={ toggleDetails }/>
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
            <Tab label='Details'>
              <small>
                <ProductDetailsMain selected={ selectedProductVariance }
                                    select={ selectVariance }
                                    { ...product }
                                    addToCart={ addToCart } />
              </small>
            </Tab>
            <Tab label='Specifications'><small>Product Specifications Not Available</small></Tab>
          </Tabs>
        </div>

      </div>
    );
  }
}

export default ProductDetails;
