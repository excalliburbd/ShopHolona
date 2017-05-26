import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ImageUploader from '../components/ImageUploader';

const mapStateToProps = state => {
  return {
    active: state.ui.uploader.active,
    dropped: state.ui.uploader.dropped,
    droppedImage: state.ui.uploader.image,
    sliderValue: state.ui.uploader.slider,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClose: () => {
      dispatch({
        type: 'HIDE_IMAGE_UPLOADER',
      });
    },
    handleImageDropped: file => {
      dispatch({
        type: 'SHOW_IMAGE_UPLOADER_EDITOR',
        payload: file,
      })
    },
    handleSliderValue: value => {
      dispatch({
        type: 'UPDATE_IMAGE_UPLOADER_SLIDER',
        payload: value
      })
    },
    handleDone: image => {
      console.log(image)
    }
  }
}

const ImageUploaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageUploader));

export default ImageUploaderContainer;
