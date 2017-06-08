import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';

import './ProductDetailsMain.css'

class ProductDetailsMain extends Component {
  state = {
    quantity: 0,
  };

  render() {

    return (
      <div className="details-main-container">
        <div className="details-main-desc">
          <h4>Description</h4>
          <p>European minnow priapumfish mosshead warbonnet shrimpfish bigscale. Cutlassfish porbeagle shark ricefish walking catfish glassfish Black swallower.</p>
        </div>

        <div className="details-main-size">
          <h4>Size</h4>
          <ul className="details-sizes">
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

        <div className="details-main-color">
          <h4>Color</h4>
          <ul className="details-colors">
            <li className="round"></li>
            <li className="round"></li>
            <li className="round"></li>
            <li className="round"></li>
            <li className="round"></li>
            <li className="round"></li>
            <li className="round"></li>
          </ul>
        </div>

        <div className="details-action">
          <Button className="details-action-cart" label='Add to cart' raised primary />
        </div>

      </div>
    );
  }
}

export default ProductDetailsMain;
