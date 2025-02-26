import React from 'react';
import Dropzone from 'react-dropzone';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

const AddProductImages = ({
  primaryAttributes,
  handleShowRoute,
  handleFiles,
  handleRemoveImg,
  productName,
  token,
  shop,
  showDone,
  selectedProduct,
  saveProduct,
  demostore,
  product,
}) => {
  //DISCLAIMER: VERY HACKY CODE. primaryAttributes is not always primaryAttributes

  const edit = (primaryAttributes[0] === 'edit');

  if (edit) {
    const product = primaryAttributes[1];
    return (
      <div className="ProductsSidebar-img">
        <h3>Edit Product Images</h3>
          {
            product.variances
            .map(
              ({type, images}, key) => {
                const obj = type;

                return <div className="ProductsSidebar-img-variants" key={ key }>
                          <div className="ProductsSidebar-img-variants--title">
                            <IconButton style={{
                                          background: (obj.value && (obj.value.split(' ')[0] !== 'Color')) &&
                                                            (obj.value && (obj.value.split(' ')[0] !== 'Custom')) ?
                                                              obj.value.toLowerCase() : '#ccc',
                                          boxShadow: 'var(--shadow-4p)'
                                        }} />
                            <h4>{ obj.value }</h4>
                          </div>
                          <div className="ProductsSidebar-img-variants--content">
                            <Dropzone className="ProductsSidebar-img-dropzone"
                                      onDrop={
                                        files => handleFiles(
                                                    key,
                                                    images,
                                                    files,
                                                    product.name,
                                                    shop,
                                                    token,
                                                    true
                                                )
                                      } >
                              <FontIcon value='add' />
                            </Dropzone>
                            {
                              images.map(
                                ({ image }, iKey) => <div className="ProductsSidebar-img-variants--content-img"
                                                          onClick={ () => handleRemoveImg(key, iKey, true) }
                                                          key={ iKey }
                                                          style={{
                                                            backgroundImage: `url(${ image })`,
                                                          }} >
                                  <FontIcon className="ProductsSidebar-img-variants--content-del-btn" value='add_circle' />
                                </div>
                              )
                            }
                          </div>
                        </div>
              })
          }
        <div className="ProductsSidebar-add-actions">
          <Button icon="backspace"
                  label="go back"
                  onClick={
                    () => handleShowRoute('BACK_TO_EDITING', selectedProduct)
                  } />
        </div>
      </div>
    )
  }

  return (
    <div className="ProductsSidebar-img">
      <h3>Add Product Images</h3>
        {
          primaryAttributes.filter( obj => obj.selected )
          .map(
            (obj, key) => <div className="ProductsSidebar-img-variants" key={ key }>
                            <div className="ProductsSidebar-img-variants--title">
                              <IconButton style={{
                                            background: (obj.value && (obj.value.split(' ')[0] !== 'Color')) &&
                                                              (obj.value && (obj.value.split(' ')[0] !== 'Custom')) ?
                                                                obj.value.toLowerCase() : '#ccc',
                                            boxShadow: 'var(--shadow-4p)'
                                          }} />
                              <h4>{ obj.value }</h4>
                            </div>
                            <div className="ProductsSidebar-img-variants--content">
                              <Dropzone className="ProductsSidebar-img-dropzone"
                                        onDrop={
                                          files => handleFiles(
                                                      obj.id,
                                                      obj.files,
                                                      files,
                                                      productName,
                                                      shop,
                                                      token,
                                                      false
                                                  )
                                        } >
                                <FontIcon value='add' />
                              </Dropzone>
                              {
                                obj.files.map(
                                  (file, key) => <div className="ProductsSidebar-img-variants--content-img"
                                                      onClick={ () => handleRemoveImg(obj.id, key) }
                                                      key={ key }
                                                      style={{
                                                        backgroundImage: `url(${ file.preview })`,
                                                      }} >
                                    <FontIcon className="ProductsSidebar-img-variants--content-del-btn" value='add_circle' />
                                  </div>
                                )
                              }
                            </div>
                          </div>
            )
        }
      <div className="ProductsSidebar-add-actions">
        <Button icon="backspace"
                label="go back"
                onClick={
                  () => handleShowRoute('ADD_PRODUCTS')
                } />
        <Button icon="done"
                label="done"
                disabled={ !showDone }
                onClick={
                  () => {
                    saveProduct(product, shop, token, false, demostore);
                  }
                } />
      </div>
      <div style={{ height: '3em'}}/>
    </div>
  )
}

export default AddProductImages;
