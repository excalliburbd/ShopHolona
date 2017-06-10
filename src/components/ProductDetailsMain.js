import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import { CirclePicker } from 'react-color';

import './ProductDetailsMain.css'

class ProductDetailsMain extends Component {
  state = {
    quantity: 0,
    background: '#fff',
  };

  render() {

    const {
      selected,
      select,
    } = this.props;

    const colorsArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"];

    return (
      <div className="details-main-container">
        <div className="details-main-desc">
          <h4 className="details-main-subtitle">Description</h4>
          <p>European minnow priapumfish mosshead warbonnet shrimpfish bigscale. Cutlassfish porbeagle shark ricefish walking catfish glassfish Black swallower.</p>
        </div>

        <div className="details-main-size">
          <h4 className="details-main-subtitle">Size</h4>
          <ul className="details-sizes">
            <li className="size">XS</li>
            <li className="size">S</li>
            <li className="size">M</li>
            <li className="size">L</li>
            <li className="size">XL</li>

          </ul>
        </div>

        <div className="details-main-color">
          <h4 className="details-main-subtitle">Color</h4>
          <CirclePicker
            colors={ colorsArray }
            width= "80%"
            color={ colorsArray[selected] }
            onChangeComplete={ (color) => {
              let id = colorsArray.indexOf(color);

              if (id === -1) {
                id = 0;
              }

              select(id);
            } }
          />

        </div>

        <div className="details-action">
          <Button className="details-action-cart" label='Add to cart' raised primary />
        </div>

      </div>
    );
  }
}

export default ProductDetailsMain;
