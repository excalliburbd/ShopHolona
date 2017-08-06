import React, { Component } from 'react';

import Uploader from '../../assets/reactSVG/uploader'

class ProductUpload extends Component {
  componentDidMount() {
    this.props.makeProduct(
      this.props.product,
      this.props.token
    );
  }

  render() {
    const {
      progress,
      product,
      shop,
      token,
      saveProduct,
      demostore,
    } = this.props;

    if(progress.primary && progress.secondary) {
       saveProduct(product, shop, token, false, shop === demostore)
    }

    return (
      <div className="product-upload" style={{textAlign: 'center', marginTop: '3rem'}}>
        {Uploader}
        <h2>
          Please wait . . .
        </h2>
      </div>
    )
  }
}

export default ProductUpload;
