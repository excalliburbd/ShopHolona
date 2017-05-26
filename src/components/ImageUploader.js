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
}) => {

  let editorRef = null;

  const doneFunc = () => {
    handleDone( type , editorRef ? editorRef.getImage() : null, shop, token, formData);
  }

  let border = 12.5;
  let radius = 0;
  let width= 250;
  let height= 250;

  if (type === 'PROFILE') {
    radius = 250;
  }

  if ( type === 'COVER') {
    width = 500;
  }

  return (
    <Dialog
      actions={[
        { label: 'close', onClick: handleClose },
        { label: 'done', onClick: doneFunc },
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
              <AvatarEditor image={ droppedImage }
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
