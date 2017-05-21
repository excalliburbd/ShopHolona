export const getShopCategories = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP_CATEGORY',
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
