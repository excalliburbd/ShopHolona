import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from 'reselect';

import { postShopPageProfie, postShopPageCover } from '../actions/shopActions';
import { postImage } from '../actions/productsActions';

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
        type: 'SHOW_IMAGE_EDITOR',
        payload: file,
      })
    },
    handleSliderValue: value => {
      dispatch({
        type: 'UPDATE_IMAGE_UPLOADER_SLIDER',
        payload: value
      })
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
