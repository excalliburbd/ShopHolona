import React from 'react';
import classNames from 'classnames';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import Menu from 'react-toolbox/lib/menu/Menu';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Chip from 'react-toolbox/lib/chip';


import ProductCard from './ProductCard';
import Stars from './Stars';
import FeaturedSlider from './FeaturedSlider';

import './ShopPage.css'

const ShopPage = ({
  catagories,
  categoryIndex,
  handleCategorySelect,
  toggleDetails,
  details,
}) => {

  const detailsClass = classNames({
    'ShopPage-details': true,
    'ShopPage-details--show': details,
  });

  return (
    <div className="ShopPage">
      <div className="ShopPage-banner" />
      <div className={ detailsClass }>
        <div className="ShopPage-banner">
          <div className="ShopPage-details-img" />
        </div>
        <IconButton icon={ (details) ? 'close' :'keyboard_arrow_down'}
                    className="ShopPage-details--toggle"
                    onClick={ toggleDetails }/>
        <div className="ShopPage-details-img" />
        <div className="ShopPage-details-description">
          <h2 className="ShopPage-details--text">Shop Page</h2>
          <h3 className="ShopPage-details--text">Contact Info</h3>
          <Stars rating="4" />
          <Button raised primary label="Follow" />
        </div>
      </div>
      <div className="ShopPage-products">
        <div className="ShopPage-featured">
          <FeaturedSlider />
        </div>
        <div className="ShopPage-products--container">
          <div className="ShopPage-banner" />
          <div className="ShopPage-products--categories">
            <Chip>Fuck</Chip>
          </div>
          <div className="ShopPage-products--content">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
