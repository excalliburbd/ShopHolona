import React from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor'

import Dialog from 'react-toolbox/lib/dialog/Dialog';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import Slider from 'react-toolbox/lib/slider/Slider';

import './ImageUploader.css';

const ImageUploader = ({
  handleDone,
  handleClose,
  active,
  handleImageDropped,
  dropped,
  droppedImage,
  sliderValue,
  handleSliderValue,
  shop,
  formData,
  token,
  type,
  productID,
  responsive,
  tourInterruptStep,
  handleContinueTour,
  tourCurrentStep,
}) => {

  let editorRef = null;
  let border = 12.5;
  let radius = 0;
  let width= 250;
  let height= 250;

  if (type === 'PROFILE') {
    radius = 250;
  }

  if ( type === 'COVER') {
    width = 828;
    height = 192;
  }

  if (type === 'PRODUCT') {
    border = 0;
  }

  if (type === 'TIN') {
    width = 828;
    height = 192;
  }

  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {

        var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++ ) {
        arr[i] = binStr.charCodeAt(i);
        }

        callback( new Blob( [arr], {type: type || 'image/png'} ) );
      }
    });
  }

  const doneFunc = (predicate, action, step) => {
    handleDone( type , editorRef ? editorRef.getImageScaledToCanvas() : null, shop, token, formData, productID, droppedImage, predicate, action, step);
  }

  return (
    <Dialog className="ImageUploader-dialog"
            actions={[
              {
                label: 'close',
                onClick: () => {
                  handleClose();
                  (tourCurrentStep === 3 || tourCurrentStep === 5) && handleContinueTour(tourCurrentStep);
                }
              },
              {
                label: 'done',
                onClick: () => {
                  doneFunc(tourCurrentStep === 3 || tourCurrentStep === 5, handleContinueTour, tourCurrentStep);
                }
              },
            ]}
            active={ active }
            onEscKeyDown={ handleClose }
            onOverlayClick={ handleClose }
            title='Upload Image'
          >
      <div className="ImageUploader-content">
        {
          dropped ?
            <div className="ImageUploader-content--editor">
              <AvatarEditor image={ droppedImage.preview }
                            ref={ editorContent => { editorRef = editorContent }}
                            border={ border }
                            borderRadius={ radius }
                            width={ width}
                            height={ height }
                            color={[0,0,0,.54]}
                            scale={ sliderValue }
                            rotate={0}
                          />
              <Slider min={ 1 }
                      max={ 10 }
                      editable
                      value={ sliderValue }
                      onChange={ value => handleSliderValue(value) } />
            </div> :
            <Dropzone className="ImageUploader-dropzone"
                      multiple={ false }
                      onDrop={ file => handleImageDropped(file) }>
              <FontIcon value='add' className="ImageUploader-add-icon"/>
            </Dropzone>
        }
      </div>
    </Dialog>
  );
}

export default ImageUploader;
