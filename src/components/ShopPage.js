import React from 'react';

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

import './ShopPage.css'

const ShopPage = ({
  catagories,
  categoryIndex,
  handleCategorySelect
}) => (
  <div className="ShopPage">
    <div className="ShopPage-details">
      <div className="ShopPage-banner">
        <div className="ShopPage-details-img" />
      </div>
      <Card className="ShopPage-details-name">
        <CardText>
          <div>Shop Name</div>
          <div>Contact: +880xxxxxxxxxxx</div>
        </CardText>
        <CardActions>
          <Button raised label="Follow" />
          <Button raised label="Details" />
        </CardActions>
      </Card>
      <div className="ShopPage-details-fold-area">
        <Card className="ShopPage-details-stars">
          <CardText>
            stars
          </CardText>
        </Card>
        <Card className="ShopPage-details-badges">
          <CardText>
            badges
          </CardText>
        </Card>
        <Card className="ShopPage-details-description">
          <CardText>
            Description
          </CardText>
        </Card>
        <Card className="ShopPage-details-mic">
          <CardText>
            Miscellaneous
          </CardText>
        </Card>
      </div>
    </div>
    <div className="ShopPage-products">
      <div className="ShopPage-banner" />

    </div>
    <div className="ShopPage-featured">

    </div>
  </div>
);

export default ShopPage;
