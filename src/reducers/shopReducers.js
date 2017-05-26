export const ShopPageReducer = (
  state = {
    shop_name: 'Loading',
    short_descr: 'Loading',
    categories: {

    },
    id: null,
    chip: 0,
  }, action
) => {
  switch (action.type) {
    case 'SET_SHOP_CATEGORY':
      const categories = {}

      action.payload.forEach(
        obj => {
          categories[obj.id] = obj
        }
      )

      return {
        ...state,
        categories: {
          ...state.categories,
          ...categories
        }
      }
    case 'UPDATE_SHOP_CHIP':
      return {
        ...state,
        chip: action.payload,
      }
    case 'SET_SHOP':
      return {
        ...state,
        ...action.payload,
      }
    case 'SET_SHOP_ID':
      return {
        ...state,
        id: action.payload,
      }
    default:
      return state;
  }
}

export const ShopPageUIReducer = (
  state = {
    details: false,
  } , action
) => {
  switch (action.type) {
    case 'TOGGLE_SHOPPAGE_UI_DETAILS':
      return {
        ...state,
        details: !state.details,
      }
    default:
      return state;
  }
}
