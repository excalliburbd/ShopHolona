import React from 'react';
import classNames from 'classnames';
import { Switch, Route } from 'react-router';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Chip from 'react-toolbox/lib/chip/Chip';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import Icon from 'react-icons-kit';
import Input from 'react-toolbox/lib/input/Input';

import ProductCard from './Product/ProductCard';
import ProductDetails from './Product/ProductDetails';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import addressIcon from '../../src/assets/images/address-icon.svg';
import callIcon from '../../src/assets/images/phone-icon.svg';

import { female } from 'react-icons-kit/ionicons/female';
import { male } from 'react-icons-kit/ionicons/male';

import store1 from '../assets/images/demo_store1.png';
import cover_night from '../assets/images/demo_store_cover_night.png';

import './ShopPage.css'

const ShopPage = ({
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
  profilePic,
  coverPhoto,
  shopPhones,
  shopAddress,
  handleEditContactNumber,
  handleSaveContactNumber,
  handleAddToCart,
  productDetails,
  handleToggleProductDetails,
  selectedProductDetails,
  handleSetVariant,
  handleSetAttribute,
  productDetailstabIndex,
  handleProductDetailsTab,
  token,
  featured,
  shop,
  makeFeaturedProduct,
  deleteFromFeaturedProduct,
  handleSaveDescription,
  handleEditDescription,
  editDesc,
  handleShowEditDescription,
  info,
  following,
  handleFollowShop,
  handleUnfollowShop,
  handlePromptSignIn,
  tourIsOpen,
  tourCurrentStep,
  handleTourInterrupt,
  selectVariance,
  shopDomain,
  location,
  productLoading,
  handleSetProductDetails,
  searchResults,
  searchString,
}) => {

  const detailsClass = classNames({
    'ShopPage-details': true,
    'ShopPage-details--show': details,
  });

  const productDetailsClass = classNames( 'ShopPage', {
    'ShopPage-product-details': productDetails,
  });

  const getIcon = name => {
    switch(name) {
      case 'Womens':
        return <Icon icon={ female } />
      case 'Men\'s':
        return <Icon icon={ male } />
      case 'Electronics':
        return <FontIcon value='devices_other' />;
      default:
        break;
    }

    return null;
  }

  products = products.map(
    obj => {
      return {
        ...obj,
        first_parent: {
          ...obj.first_parent,
          icon: getIcon(obj.first_parent.name)
        }
      }
    }
  );

  if (!profilePic || profilePic.split('/').slice(-1)[0] === 'no_images.jpg') {
    profilePic = store1
  }

  if (!coverPhoto || coverPhoto.split('/').slice(-1)[0] === 'no_images.jpg') {
    coverPhoto = cover_night
  }

  const GetFollowingButton = ({
    vendor,
    following,
    handleFollowShop,
    handleUnfollowShop,
    handlePromptSignIn
  }) => {

    if ( vendor ) {
      return null;
    } else if (following.status) {
      return <Button  raised
                      label="Unfollow"
                      onClick={
                        () => {
                          if (token) {
                            handleUnfollowShop(shop, token, shopName, following.id);
                          }
                        }
                      }
             />
    }

    return <Button  raised
                    primary
                    onClick={
                      () => {
                        if (token) {
                          handleFollowShop(shop, token, shopName);
                        } else {
                          handlePromptSignIn(shopName);
                        }
                      }
                    }
                    label="Follow"/>
  }

  let activeProducts = products[selectedChip].products;

  if (searchString) {
    activeProducts = searchResults;
  }

  return (
    <div className={ productDetailsClass } >
      <div className="ShopPage-banner" style={{ backgroundImage: `url(${coverPhoto})`}}/>
      <div className={ detailsClass } data-tour="details-sidebar" >
        <div className="ShopPage-banner">
          <div className="ShopPage-details-img" style={{ backgroundImage: `url(${profilePic})` }} data-tour="shop-profile" >
            { vendor && <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE', tourIsOpen, tourCurrentStep) }/> }
          </div>
        </div>
        <div className="ShopPage-banner-divider">
          <MenuDivider/>
        </div>
        {
          vendor && <IconButton className="ShopPage-add-banner"
                                icon="add_a_photo"
                                onClick={ () => handleShowImageUploader('COVER', tourIsOpen, tourCurrentStep) }/>
        }
        {/* ToDo: remove associated logic
            <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                    className="ShopPage-details--toggle"
                    onClick={ toggleDetails }/> */}
        <div className="ShopPage-details-img" style={{ backgroundImage: `url(${profilePic})` }} >
          { vendor && <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE', tourIsOpen, tourCurrentStep) }/> }
        </div>

        <div className="ShopPage-details-description">
          <h2 className="ShopPage-details--title">{ shopName }</h2>
          <Stars rating="0" />
          {
            shopAddress &&
            <p className="ShopPage-details--address">
              <img src={ addressIcon } alt=""/><label>{ shopAddress.details }</label>
            </p>
          }
          <ul className="ShopPage-details-contacts">
            {
              shopPhones.map(
                (contact, key) => {
                  /*{if (vendor) {
                   return  <div className="ShopPage-details-contacts--contact">
                   <Input label="Edit contact number"
                   value={ contact.number }
                   onChange={
                   value => handleEditContactNumber(contact.id, value)
                   }
                   />
                   <IconButton icon="save" onClick={ () => handleSaveContactNumber(contact.id) }/>
                   </div><h1 className="product-details-title">{ product.name }</h1>
                   <div className="product-details-price-title">
                     <h2 className="product-details-price">Price: &#2547; { product.sh_price }</h2>
                     <Stars rating={ 3 } />
                   </div>
                   }}*/
                  return (
                    <li className="ShopPage-details--contact-number" key={key}>
                      <img src={ callIcon } alt=""/> <label>{ contact.number }</label>
                    </li>
                  )
                }
              )
            }
          </ul>
          <GetFollowingButton vendor={ vendor }
                              following={ following }
                              handleFollowShop={ handleFollowShop }
                              handleUnfollowShop={ handleUnfollowShop }
                              handlePromptSignIn={ handlePromptSignIn }/>
        </div>
        <div className="ShopPage-details--text" data-tour="shop-description">
          <div className="ShopPage-details-header">
            <p>About</p>
            {
                  vendor && <IconButton icon="edit"
                                        onClick={ () => handleShowEditDescription() }/>
                }
          </div>
          {
              (editDesc) ? <div className="ShopPage-details--text-desc--update">
                <Input  label="Edit Shop Description"
                        value={ shortDesc }
                        multiline
                        onChange={
                          value => handleEditDescription(value)
                        }
                        />
                <IconButton icon="save"
                            onClick={ () => handleSaveDescription(info, shop, token) }/>
              </div> :
              <div className="ShopPage-details--text-desc--update">
                <p className="ShopPage-details--text-desc">
                  { shortDesc }
                </p>
              </div>
          }
        </div>
      </div>
      <div className="ShopPage-products">
        <Switch>
          <Route path="/product/:id" children={ props => <ProductDetails  toggleDetails={ handleToggleProductDetails }
                                                                          { ...selectedProductDetails }
                                                                          product={ selectedProductDetails }
                                                                          token={ token }
                                                                          addToCart={ handleAddToCart }
                                                                          setVariant={ handleSetVariant }
                                                                          tabIndex={ productDetailstabIndex }
                                                                          tabChange={ handleProductDetailsTab }
                                                                          setAttribute={ handleSetAttribute }
                                                                          vendor={vendor}
                                                                          featured={ featured }
                                                                          shop={ shop }
                                                                          makeFeaturedProduct={ makeFeaturedProduct }
                                                                          deleteFromFeaturedProduct={ deleteFromFeaturedProduct }
                                                                          selectVariance={ selectVariance }
                                                                          shopDomain={ shopDomain }
                                                                          { ...props }
                                                                          loading={ productLoading }
                                                                          handleSetProductDetails={ handleSetProductDetails } />
                                              } />
          <Route children={ () =>  null} />
        </Switch>
        {
          location.pathname.split('/')[1] !== 'product' && <div className="ShopPage-featured" key="arr-layout-1">
            <FeaturedSlider vendor={ vendor }
                            products = { featuredProducts.map(
                                            (product, key) => <ProductCard  { ...product }
                                                                            vendor={ vendor }
                                                                            token={ token }
                                                                            handleShowVendorDetails={ () => handleShowProductDetails(vendor, product) }
                                                                            handleShowCustomerDetails={ () => handleShowProductDetails(false, product) }
                                                                            key={ key }
                                                                            addToCart={ handleAddToCart }
                                                                            setVariant={ handleSetVariant }
                                                                            shopDomain={ shopDomain } />
                                          ) }/>
          </div>
        }
        {
          location.pathname.split('/')[1] !== 'product' && <div className="ShopPage-products--container" key="arr-layout-2">
            <div className="ShopPage-products--container-scroll-div" data-tour="shop-banner" >
              {
                vendor && <IconButton className="ShopPage-banner--icon"
                                      icon="add_a_photo"
                                      onClick={ () => handleShowImageUploader('COVER', tourIsOpen, tourCurrentStep) } />
              }
            </div>
            <div className="ShopPage-products--categories">
              {
                (searchString) ?
                  <h2>Results: </h2>
                : products.map(
                  (obj, key) => <Chip onClick={ () => selectChip(key) }
                                      className={
                                        (selectedChip === key) ?
                                        'ShopPage-products--category ShopPage-products--categories-selected' :
                                        'ShopPage-products--category'
                                      }
                                      key={key}>
                                  {/*{ obj.first_parent.icon && <Avatar icon={ obj.first_parent.icon } /> }*/}
                                  { `${obj.name} (${obj.products.length})` }
                                </Chip>
                )
              }
            </div>
            <div className="ShopPage-products--content">
              <div className={ `ShopPage-products--list ${ products[selectedChip].products.length === 0 ? 'ShopPage-products--list--empty': null }` } >
                {
                  (vendor && !searchString) && <ProductCard  addProductCard
                                            vendor={ vendor }
                                            token={ token }
                                            handleShowVendorDetails={ handleAddProduct }
                                            handleShowCustomerDetails={ handleAddProduct }
                                            key="AddProductKey"
                                            addToCart={ handleAddToCart }
                                            setVariant={ handleSetVariant }
                                            data-tour="add-product"
                                            shopDomain={ shopDomain } />
                }
                {
                  (searchString) ?
                    (searchResults.length > 0) ?
                      activeProducts.map(
                        (product, key) => <ProductCard  { ...product }
                                                        vendor={ vendor }
                                                        token={ token }
                                                        handleShowVendorDetails={ () => handleShowProductDetails(vendor, product) }
                                                        handleShowCustomerDetails={ () => handleShowProductDetails(false, product) }
                                                        key={ key }
                                                        addToCart={ handleAddToCart }
                                                        setVariant={ handleSetVariant }
                                                        shopDomain={ shopDomain } />
                      )
                    : <h2> Not Found </h2>
                  : activeProducts.map(
                    (product, key) => <ProductCard  { ...product }
                                                    vendor={ vendor }
                                                    token={ token }
                                                    handleShowVendorDetails={ () => handleShowProductDetails(vendor, product) }
                                                    handleShowCustomerDetails={ () => handleShowProductDetails(false, product) }
                                                    key={ key }
                                                    addToCart={ handleAddToCart }
                                                    setVariant={ handleSetVariant }
                                                    shopDomain={ shopDomain } />
                  )
                }
              </div>
              <div className="emptydiv-phone"></div>
            </div>
            <div className="ShopPage-banner" >
              <div style={{ backgroundImage: `url(${coverPhoto})`}} className="ShopPage-banner" />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ShopPage;
