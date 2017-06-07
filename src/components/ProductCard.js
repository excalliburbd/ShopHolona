import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from "uuid"
import Card from 'react-toolbox/lib/card/Card'
import CardMedia from 'react-toolbox/lib/card/CardMedia'
import Button from 'react-toolbox/lib/button/Button'
import Dialog from 'react-toolbox/lib/dialog/Dialog'

import addProductIcon from '../assets/svg/add-product.svg'
import ProductDetails from './ProductDetails'
import * as types from '../constants/cart'

import Stars from './Stars'

import './ProductCard.css'

const actionsToState = dispatch => ({
  addToCart: payload => {
    dispatch({
      type: 'SHOW_SIDEBAR_CART_CHOOSE'
    })
    dispatch({
      type: types.CART_ITEM_ADD_SUCCESS,
      payload
    })
  }
})

// const getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

class ProductCard extends Component {
  state = {
    active: false
  }

  actions = [
    { label: "Cancel", onClick: this.handleToggle }
  ]

  handleToggle = () => {
    this.setState({active: !this.state.active})
  }

  addToCart = () => {
    this.props.addToCart({
      id: uuid.v4(),
      productId: this.props.id,
      varianceParentId: this.props.variances[0].id,
      varianceId: this.props.variances[0].attributes[0].id,
      price: this.props.variances[0].attributes[0].price,
      quantity: 1
    })
  }

  render() {
    let {
      rating = 3,
      productImg = 'https://unsplash.it/480/480',
      name = 'Product Name',
      price = '10000',
      handleShowDetails,
      variances,
      id,
      vendor,
      addProductCard
    } = this.props

    price = Math.round(price)

    if(variances && variances[0].images[0]){
      productImg = variances[0].images[0].image
    }

    if (vendor && addProductCard) {
      return (
        <Card className="ProductCard ProductCard--addProduct" onClick={ () => handleShowDetails(id) }>
          <CardMedia aspectRatio="square"/>
          <div className="ProductCard-details ProductCard--addProduct-details">
            <div className="ProductCard--addProduct-details-icon">
              <img className="addicon" src={addProductIcon} alt="Add icon"/>
            </div>
            <h3 className="ProductCard-details-name ProductCard--addProduct-details-content">
              Add A New Product / Service
            </h3>
            <h3 className="ProductCard-details-name ProductCard--addProduct-details-name">
              Add Products
            </h3>
            <div className="ProductCard--addProduct-rating">
              <Stars rating={ 0 } />
            </div>
          </div>
          <Button className="ProductCard--addProduct-button" raised label="Add Products" />
        </Card>
      )
    }

    return (
      <Card className="ProductCard" onClick={ vendor ? () => handleShowDetails(id) : null }>
        <div onClick={this.handleToggle}>
          <CardMedia aspectRatio="square"
                     image={ productImg } />
          <div className="ProductCard-price">
            {/*<img className="price-tag" src={PriceTag} alt="Price Tag" width="50" height="50"/>*/}
            <div className="price-tag"  >
              <h2 className="product-price">
                &#2547; { price }
              </h2>
            </div>
          </div>
          <div className="ProductCard-details">
            <h3 className="ProductCard-details-name">{ name }</h3>
            <div className="ProductCard-details-stars">
              <Stars rating={ rating } />
              {/*<h3 className="ProductCard-details-quantity"> Quantity: 3</h3>*/}
            </div>
          </div>
        </div>
        {/*<Button className="ProductCard-button" raised label={ vendor ? 'Edit Product' : 'Add to Cart' } />*/}
        { vendor ? <Button className='ProductCard-button-vendor' raised label='Edit Product' />
          :
          <Button className='ProductCard-button' raised label='Add to Cart' onClick={this.addToCart}/>
        }
        <Dialog
          className="ProductCard-dialog-main"
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          <ProductDetails/>
        </Dialog>
      </Card>
    )
  }
}

export default connect(null, actionsToState)(ProductCard)
