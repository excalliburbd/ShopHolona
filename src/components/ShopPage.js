import React from 'react';
import classNames from 'classnames';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Chip from 'react-toolbox/lib/chip/Chip';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import Icon from 'react-icons-kit';

import ProductCard from './ProductCard';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import { female } from 'react-icons-kit/ionicons/female';
import { male } from 'react-icons-kit/ionicons/male';



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
  proficePic,
  coverPhoto,
  shopPhones,
  shopAddress,
  handleEditContactNumber,
  handleSaveContactNumber,
}) => {

  const detailsClass = classNames({
    'ShopPage-details': true,
    'ShopPage-details--show': details,
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
  )

  return (
    <div className="ShopPage">
      <div className="ShopPage-banner" style={{ backgroundImage: `url(${coverPhoto})`}}/>
      <div className={ detailsClass }>
        <div className="ShopPage-banner">
          <div className="ShopPage-details-img" style={{ backgroundImage: `url(${proficePic})` }}>
            <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') }/>
          </div>
        </div>
        <div className="ShopPage-banner-divider">
          <MenuDivider/>
        </div>
        <IconButton className="ShopPage-add-banner"
                    icon="add_a_photo" onClick={ () => handleShowImageUploader('COVER') }/>
        <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                    className="ShopPage-details--toggle"
                    onClick={ toggleDetails }/>
        <div className="ShopPage-details-img" style={{ backgroundImage: `url(${proficePic})` }}>
          <IconButton icon="add_a_photo" onClick={ () => handleShowImageUploader('PROFILE') }/>
        </div>

        <div className="ShopPage-details-description">
          <h2 className="ShopPage-details--title">{ shopName }</h2>
          <Stars rating="4" />
          {
            shopAddress &&
            <p className="ShopPage-details--address">
              <FontIcon value="store"/><label>{ shopAddress.details }</label>
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
                   </div>
                   }}*/
                  return (<li className="ShopPage-details--contact-number" key={key}>
                    <FontIcon value="local_phone"/> <label>{ contact.number }</label>
                  </li>)
                }
              )
            }
          </ul>
          { !vendor && <Button raised primary label="Follow"/>}
        </div>
        <div className="ShopPage-details--text">
          <p className="ShopPage-details--text-desc">{shortDesc}</p>
        </div>
      </div>
      <div className="ShopPage-products">
        <div className="ShopPage-featured">
          <FeaturedSlider vendor={ vendor }
                          products={ featuredProducts.map(
                                          (porduct, key) => <ProductCard { ...porduct }
                                                                          vendor={ vendor }
                                                                          handleShowDetails={ () => handleShowProductDetails(vendor, porduct) }
                                                                          key={ key }/>
                                        ) }/>
        </div>
        <div className="ShopPage-products--container">
          <div className="ShopPage-products--container-scroll-div">
            <IconButton className="ShopPage-banner--icon"
                        icon="add_a_photo"
                        onClick={ () => handleShowImageUploader('COVER') } />
          </div>
          <div className="ShopPage-products--categories">
            {
              products.map(
                (obj, key) => <Chip onClick={ () => selectChip(key) }
                                    className={
                                      (selectedChip === key) ?
                                      'ShopPage-products--category ShopPage-products--categories-selected' :
                                      'ShopPage-products--category'
                                    }
                                    key={key}>
                                {/*{ obj.first_parent.icon && <Avatar icon={ obj.first_parent.icon } /> }*/}
                                { obj.name }
                              </Chip>
              )
            }
          </div>
          <div className="ShopPage-products--content">
            <div className="ShopPage-products--list">
              {
                (vendor) && <ProductCard addProductCard
                                         vendor={ vendor }
                                         handleShowDetails={ handleAddProduct }
                                         key="AddProductKey"/>
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
          <div className="ShopPage-banner" >
            <div style={{ backgroundImage: `url(${coverPhoto})`}} className="ShopPage-banner" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage;
