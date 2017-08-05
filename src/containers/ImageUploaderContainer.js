import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from 'reselect';

import ImageUploader from '../components/ImageUploader';

import { postShopPageProfie, postShopPageCover } from '../thunks/shopThunks';
import { postImage } from '../thunks/productThunks';

import {
  imageUploaderActions,
  tourActions,
} from '../actions/';

import { getResponsive } from '../selectors/uiSelectors';
import {
  getTourIsOpen,
  getCurrentStep,
  getTourInterruptStep,
} from '../selectors/tourSelectors';

const getShop = state => state.shop;

const makeFormData = createSelector(
  [getShop],
  shop => {

    const formData = new FormData();

    Object.keys(shop).forEach(
      shopKey => {
        if (shopKey !== 'category' &&
            shopKey !== 'chip' &&
            shopKey !== 'prof_pic' &&
            shopKey !== 'cover_photo' &&
            shopKey !== 'hours_from' &&
            shopKey !== 'hours_to' &&
            shopKey !== 'thumbnail_pic' &&
            shopKey !== 'trade_license_image' ) {


          formData.append(shopKey, shop[shopKey]);
        }
      }
    )

    return formData;
  }
)

const mapStateToProps = state => {
  return {
    active: state.ui.uploader.active,
    dropped: state.ui.uploader.dropped,
    droppedImage: state.ui.uploader.image,//[0].preview
    sliderValue: state.ui.uploader.slider,
    token: state.user.token,
    shop: state.shop.id,
    formData: makeFormData(state),
    type: state.ui.uploader.type,
    productID: state.ui.uploader.productID,
    responsive: getResponsive(state),
    tourIsOpen: getTourIsOpen(state),
    tourCurrentStep: getCurrentStep(state),
    tourInterruptStep: getTourInterruptStep(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClose: () => {
      dispatch(imageUploaderActions.imageUploader.hide());
    },
    handleImageDropped: file => {
      dispatch(imageUploaderActions.imageUploader.show.editor(file));
    },
    handleSliderValue: value => {
      dispatch(imageUploaderActions.imageUploader.updateSlider(value));
    },
    handleDone: (type, image, shop, token, formData, id, file, predicate, action, step) => {

      if (type === 'PROFILE') {
       dispatch(postShopPageProfie(image, shop, token, formData, predicate, action, step));
      }

      if (type === 'COVER') {
       dispatch(postShopPageCover(image, shop, token, formData, predicate, action, step));
      }

      if (type === 'PRODUCT') {
        image.toBlob( blob => {
          dispatch(
            postImage(
              token,
              shop,
              { file: blob, tag: `${file.name.toLowerCase().split(' ').join('_')}_0` },
              id,
              0,
              'CROPED'
            )
          )
        })
      }
    },
    handleContinueTour: currentstep => {
      dispatch(tourActions.tour.set.interrupt({ state: false }));
      dispatch(imageUploaderActions.imageUploader.set.tourInterrupt(false));
      dispatch(tourActions.tour.set.open(true));
    }
  }
}

const ImageUploaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageUploader));

export default ImageUploaderContainer;
