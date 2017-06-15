import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Sticky from 'react-sticky-el';
import Button from 'react-toolbox/lib/button/Button';

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
                    onClick={ toggleDetails }
          />

        <div className="product-details-left">
          <Sticky stickyClassName="product-details-info-sticky">
            <h1 className="product-details-title">{ product.name }</h1>
            <div className="product-details-price-title">
              <h2 className="product-details-price">Price: &#2547; { product.price }</h2>
              <Stars rating={ 3 } />
            </div>
          </Sticky>
          <div className="product-details-slider">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showBullets={true}
              showNav={false}
            />
          </div>

          <div className="ProductDetails-action">
            <Button className="ProductDetails-action-cart"
                    onClick={ () => addToCart(product.id, product.variances) }
                    label='Add to cart'
                    raised
                    primary />
            <Button className="ProductDetails-action-buy"
                    // onClick={  }
                    label='Buy Now'
                    raised
                    primary />
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
