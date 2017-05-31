import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';

import Stars from './Stars'
import './ProductDetails.css'

class CartProduct extends Component {
  state = {
    quantity: 0
  }

  render() {
    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]

    return (
      <div>
        <ul className="color--attribute--group">
          <li className="round"></li>
          <li className="round"></li>
          <li className="round"></li>
          <li className="round"></li>
          <li className="round"></li>
          <li className="round"></li>
          <li className="round"></li>
        </ul>

        <div className="cart--image--slider">
          <ImageGallery
            items={images}
            slideInterval={2000}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
          />
        </div>

        <div>
          <h4>Product Name</h4>
          <p>2000</p>
          <Stars rating={ 3 } />
        </div>
        <div>
          <p>European minnow priapumfish mosshead warbonnet shrimpfish bigscale. Cutlassfish porbeagle shark ricefish walking catfish glassfish Black swallower.</p>
          <Button label='See details' raised primary />
        </div>
        <div>
          <ul className="color--attribute--group">
            <li className="round">S</li>
            <li className="round">M</li>
            <li className="round">L</li>
            <li className="round">L</li>
            <li className="round">L</li>
            <li className="round">S</li>
            <li className="round">M</li>
            <li className="round">L</li>
            <li className="round">L</li>
            <li className="round">L</li>
          </ul>
        </div>

        <div className="quantity--input--group">
          <Button label="-"/>
          <Input type='text' name='quantity' value={this.state.quantity} className="quantity--input"/>
          <Button label="+"/>

        </div>

        <div className="fixed--bar--footer">
          <div>
            <span>Total: 2000</span>
            <span>x3</span>
          </div>
          <div>
            <Button label='Add to cart' raised primary />
            <Button label='Buy now' raised primary />
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
