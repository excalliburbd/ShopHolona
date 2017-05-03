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
import Chip from 'react-toolbox/lib/chip';

import Stars from './Stars';

import './ProductCard.css';

const ProductCard = ({
  rating = 1,
  productImg = 'https://unsplash.it/720/480',
  productThumb = 'https://unsplash.it/100',
}) => {
  return (
    <Card className="ProductCard">
      <CardMedia aspectRatio="square"
                 image={ productImg } />
      <CardTitle title="Product Name"
                 subtitle={
                    <Stars rating={ rating } />
                  } />
      <CardActions>
        <Button raised label="Add to Cart" />
      </CardActions>
    </Card>
  )
}

export default ProductCard;
