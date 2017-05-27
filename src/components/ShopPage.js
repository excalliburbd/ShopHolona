import React, { Component } from 'react';
import classNames from 'classnames';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Chip from 'react-toolbox/lib/chip';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

import ProductCard from './ProductCard';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import './ShopPage.css'

const  ShopPage = ({
  toggleDetails,
  details,
  shopName,
  shortDesc,
  products,
  selectedChip,
  selectChip,
  handleShowProductDetails,
  vendor,
  handleAddProduct,
  featuredProducts,
  handleShowImageUploader,
  proficePic,
  coverPhoto,
}) => {

  const detailsClass = classNames({
    'ShopPage-details': true,
    'ShopPage-details--show': details,
  });

  return (
    <div className="ShopPage">
      <div className="ShopPage-banner" style={{ background: `url(${coverPhoto}) no-repeat center top fixed`,
                                                'background-size': 'cover'}} />
      <div className={ detailsClass }>
        <div className="ShopPage-banner">
          <div className="ShopPage-details-img" style={{ background: `url(${proficePic}) no-repeat center center` }}>
            <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') } />
          </div>
        </div>
        <IconButton className="ShopPage-add-banner"
                    icon="add_a_photo" onClick={ () => handleShowImageUploader('COVER') } />
        <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                    className="ShopPage-details--toggle"
                    onClick={ toggleDetails }/>
        <div className="ShopPage-details-img" style={{ background: `url(${proficePic}) no-repeat center center` }}>
          <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') } />
        </div>
        <div className="ShopPage-details-description">
          <h2 className="ShopPage-details--text">{ shopName }</h2>
          <p className="ShopPage-details--text">Address</p>
          <Stars rating="4" />
          { !vendor &&  <Button raised primary label="Follow" />}
          <p className="ShopPage-details--text-desc">{shortDesc}</p>
        </div>
      </div>
      <div className="ShopPage-products">
        <div className="ShopPage-featured">
          <FeaturedSlider vendor={ vendor }
                          products = { featuredProducts.map(
                                          (porduct, key) => <ProductCard { ...porduct }
                                                                          vendor={ vendor }
                                                                          handleShowDetails={ () => handleShowProductDetails(vendor, porduct) }
                                                                          key={ key }/>
                                        ) }/>
        </div>
        <div className="ShopPage-products--container">
          <div className="ShopPage-banner" style={{ background: `url(${coverPhoto}) no-repeat center top fixed`,
                                                    'background-size': 'cover'}}>

            <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('COVER') } />
          </div>
          <div className="ShopPage-products--categories">
            {
              products.map(
                (obj, key) => <Chip onClick={ () => selectChip(key) } key={key}>
                                { obj.name }
                              </Chip>
              )
            }
          </div>
          <div className="ShopPage-products--content">
            <div className="ShopPage-products--list">
              {
                (vendor) && <ProductCard  addProductCard
                                          vendor={ vendor }
                                          handleShowDetails={ handleAddProduct }
                                          key="AddProductKey" />
              }
              {
                products[selectedChip].products.map(
                  (porduct, key) => <ProductCard { ...porduct }
                                                  vendor={ vendor }
                                                  handleShowDetails={ () => handleShowProductDetails(vendor, porduct) }
                                                  key={ key }/>
                )
              }
            </div>
            <div className="emptydiv-phone"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage;
