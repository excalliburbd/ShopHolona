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
}) => {
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
                                              onDrop={ files => handleFiles(obj.id, obj.files, files, productName, shop, token) }>
                                      <FontIcon value='add' />
                                    </Dropzone>
                                    {
                                      obj.files.map(
                                        (file, key) => <div onClick={ () => handleRemoveImg(obj.id, key) }
                                                            key={ key }
                                                            style={{
                                                              background: `url(${ file.preview }) no-repeat center center`,
                                                              height: '6em',
                                                              width: '4em',
                                                              margin: '.5em',
                                                            }} />
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
                              handleShowRoute('UPLOADING');
                            }
                          } />
                </div>
             </div>
  )
}

export default AddProductImages;
