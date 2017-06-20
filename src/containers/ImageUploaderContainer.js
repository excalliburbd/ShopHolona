import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from 'reselect';

import { postShopPageProfie, postShopPageCover } from '../thunks/shopThunks';
import { postImage } from '../thunks/productThunks';

import { imageUploaderActions } from '../actions/';

import { getResponsive } from '../selectors/uiSelectors';
import ImageUploader from '../components/ImageUploader';

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
    responsive: getResponsive(state)
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
    handleDone: (type, image, shop, token, formData, id, file) => {

      if (type === 'PROFILE') {
       dispatch(postShopPageProfie(image, shop, token, formData));
      }

      if (type === 'COVER') {
       dispatch(postShopPageCover(image, shop, token, formData));
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
    }
  }
}

const ImageUploaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageUploader));

export default ImageUploaderContainer;
