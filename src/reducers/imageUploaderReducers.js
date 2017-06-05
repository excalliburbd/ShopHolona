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
}, {
  active: false,
  dropped: false,
  image: null,
  slider: 1,
  type: null,
  productImage: false,
  productID: null,
});
