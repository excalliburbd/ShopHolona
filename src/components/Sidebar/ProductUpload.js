import React, { Component } from 'react';

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
    } = this.props;

    if(progress.primary && progress.secondary) {
       saveProduct(product, shop, token)
    }

    return <div>
        <h2>
          Uploading... don't close sidebar
        </h2>
      </div>
  }
}

export default ProductUpload;
