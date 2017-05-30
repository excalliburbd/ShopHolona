import fetch from 'isomorphic-fetch';

export const getShopCategories = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP_CATEGORY',
    payload: {shop}
  })

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/shops/${shop}/categories/`, {
    mode: 'cors',
    headers: {
      "Accept": "application/json",
      'Content-type': 'application/json; charset=utf-8',
    },
  }).then(
    res => res.json()
  ).then(
    res => {
      dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

      dispatch({
        type: 'DONE_API_GET_SHOP_CATEGORY',
      })

      if(res.length > 0) {
        dispatch({
          type: 'SET_SHOP_CATEGORY',
          payload: res,
        })
      }
    }
  );
}

export const getShopAddress = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP_ADDRESS',
    payload: {shop}
  })

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/shops/${shop}/address/`, {
    mode: 'cors',
    headers: {
      "Accept": "application/json",
      'Content-type': 'application/json; charset=utf-8',
    },
  }).then(
    res => res.json()
  ).then(
    res => {
      dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

      dispatch({
        type: 'DONE_API_GET_SHOP_ADDRESS',
      })

      if(res.length > 0) {
        dispatch({
          type: 'SET_SHOP_ADDRESS',
          payload: res,
        })
      }
    }
  );
}


export const getShop = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP',
    payload: {shop}
  })

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/shops/${shop}/`, {
            mode: 'cors',
            headers: {
              "Accept": "application/json",
              'Content-type': 'application/json; charset=utf-8',
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_GET_SHOP',
              })

              if(res.id) {
                dispatch({
                  type: 'SET_SHOP',
                  payload: res,
                })
              }
            }
          );
}


export const postShopPageProfie = (image, shop, token, formData)  => dispatch => {

  dispatch({
    type: 'PUT_API_SHOP_PROFILE',
  });

  image.toBlob( blob => {

    formData.append('prof_pic', blob );

    fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/`, {
          method: 'put',
          mode: 'cors',
          body: formData,
          headers: {
            'Authorization': `JWT ${token}`,
          },
        }).then(
          res => res.json()
        ).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

            if(res.id) {
              dispatch({
                type: 'DONE_API_SHOP_PROFILE_PUT',
                payload: res,
              });

              dispatch({
                type: 'HIDE_IMAGE_UPLOADER',
              });

              dispatch(getShop(shop));
            }
          }
        );

  });
}

export const postShopPageCover = (image, shop, token, formData)  => dispatch => {

  dispatch({
    type: 'PUT_API_SHOP_COVER',
  });

  image.toBlob( blob => {

    formData.append('cover_photo', blob );

    fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/`, {
          method: 'put',
          mode: 'cors',
          body: formData,
          headers: {
            'Authorization': `JWT ${token}`,
          },
        }).then(
          res => res.json()
        ).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

            if(res.id) {
              dispatch({
                type: 'DONE_API_SHOP_COVER_PUT',
                payload: res,
              });

              dispatch({
                type: 'HIDE_IMAGE_UPLOADER',
              });

              dispatch(getShop(shop));
            }
          }
        );

  });
}
