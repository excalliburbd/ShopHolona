import { handleActions } from 'redux-actions';

import { imageUploaderActions } from '../actions/';

export const imageUploaderUIReducer = handleActions({
    [imageUploaderActions.imageUploader.show.uploader]: (state, action) => {
      return {
        ...state,
        active: true,
        type: action.payload,
      }
    },
    [imageUploaderActions.imageUploader.hide]: (state, action) => {
      return {
        ...state,
        active: false,
        dropped: false,
        image: null,
        slider: 1
      }
    },
    [imageUploaderActions.imageUploader.show.editor]: (state, action) => {
        return {
          ...state,
          dropped: true,
          image: action.payload[0],
        }
    },
    // [imageUploaderActions.imageUploader.show.uploaderEditor]: (state, action) => {
    //     return {
    //       ...state,
    //       active: true,
    //       dropped: true,
    //       image: action.payload.file,
    //       type: 'PRODUCT',
    //       productID: action.payload.id,
    //   }
    // },
    [imageUploaderActions.imageUploader.updateSlider]: (state, action) => {
        return {
          ...state,
          slider: action.payload,
        }
    },
     [imageUploaderActions.imageUploader.upload.count]: (state, action) => {
      return {
        ...state,
        uploadCount: state.uploadCount + action.payload,
      }
    },
    [imageUploaderActions.imageUploader.upload.inc]: (state, action) => {
        return {
          ...state,
          doneUploadCount: state.doneUploadCount + 1,
        }
    },
    [imageUploaderActions.imageUploader.upload.dec]: (state, action) => {
        return {
          ...state,
          uploadCount: ((state.uploadCount - 1) < 0) ? 0 : (state.uploadCount - 1),
          doneUploadCount: ((state.doneUploadCount - 1) < 0) ? 0 : (state.doneUploadCount - 1)
        }
  },
}, {
  active: false,
  dropped: false,
  image: null,
  slider: 1,
  type: null,
  productImage: false,
  productID: null,
  uploadCount: 0,
  doneUploadCount: 0,
});
