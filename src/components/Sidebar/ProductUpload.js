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
      demostore,
    } = this.props;

    console.log(product)
    if(progress.primary && progress.secondary) {
       saveProduct(product, shop, token, false, shop === demostore)
    }

    return <div>
        <h2>
          Uploading... don't close sidebar
        </h2>
      </div>
  }
}

export default ProductUpload;
