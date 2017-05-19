const getDecrement = stock => {
  const decrement = parseInt(stock, 10) - 1;

  if(decrement < 0) {
    return 0;
  }

  return decrement;
}

export const categoriesReducer = (
  state = [

  ],
  action
) => {
  switch (action.type) {
    case 'SET_API_SUB_SUB_CATEGORIES':
      const categories = [];

      action.payload.forEach(
        category => {
          if(state.indexOf(category.id) === -1) {
            categories.push(category.id)
          }
        }
      )

      return [
        ...state,
        ...categories,
      ]
    default:
      return state;
  }
}

export const CategoriesEntityReducer = (
  state = {
    categories: {},
    subCategories: {},
    subSubCategories: {},
  },
  action
) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      const categories = {};

      action.payload.forEach(
        category => {
          categories[category.id] = category;
        }
      )

      return {
        ...state,
        categories : {
          ...state.categories,
          ...categories
        }
      }
    case 'SET_SUB_CATEGORIES':
      const subCategories = {};

      action.payload.sub_categories.forEach(
        category => {
          subCategories[category.id] = category;
        }
      )

      return {
        ...state,
        subCategories : {
          ...state.subCategories,
          ...subCategories
        }
      }
    case 'SET_SUB_SUB_CATEGORIES':
      const subSubCategories = {};

      action.payload.sub_categories.forEach(
        category => {
          subSubCategories[category.id] = category;
        }
      )

      return {
        ...state,
        subSubCategories : {
          ...state.subSubCategories,
          ...subSubCategories
        }
      }
     case 'SET_API_SUB_SUB_CATEGORIES':
      const apiSubSubCategories = {};

      action.payload.sub_categories.forEach(
        category => {
          apiSubSubCategories[category.id] = category;
        }
      )

      return {
        ...state,
        subSubCategories : {
          ...state.subSubCategories,
          ...apiSubSubCategories
        }
      }

    default:
      return state;
  }
}

export const CategoriesUIReducer = (
  state = {
    categoryID: null,
    subCategoryID: null,
    subSubCategoryID: null,
    attributes: {
      primary: [],
      secondary: {},
      selected: -1,
    }
  } , action
) => {
  switch (action.type) {
    case 'SET_UI_CATEGORY':
      return {
        ...state,
        categoryID: action.id
      }
    case 'SET_UI_SUB_CATEGORY':
      return {
        ...state,
        subCategoryID: action.id
      }
    case 'SET_UI_SUB_SUB_CATEGORY':
      return {
        ...state,
        subSubCategoryID: action.id
      }
    case 'SET_PRIMARY_ATTR':
      const primary = [];

      action.payload.attributes.forEach(
        attribute => {
          primary.push({ ...attribute, selected: false, files: [] });
        }
      )

      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary
        }
      }
    case 'SET_SECONDARY_ATTR':
      const secondary = [];

      action.payload.attributes.forEach(
        attribute => {
          secondary.push({ ...attribute, selected: false, stock: 0 });
        }
      )

      const nestedAttr = {};

      state.attributes.primary.map(
            obj => ({
              id: obj.id,
              attributes: secondary,
            })
          ).forEach(
            obj => {
              nestedAttr[obj.id] = obj
            }
          )

      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: nestedAttr,
        }
      }
    case 'SET_UI_PRIMARY_ATTR_SELECTED':
      return {
          ...state,
          attributes: {
            ...state.attributes,
            selected: action.payload.id
          }
        }
    case 'SET_UI_PRIMARY_ATTR':
      return {
          ...state,
          attributes: {
            ...state.attributes,
            primary: state.attributes.primary.map(
              (obj, key) => ({
                ...obj,
                selected: (action.payload.id === obj.id) ? true : state.attributes.primary[key].selected
              })
            )
          }
        }
    case 'SET_UI_SECONDARY_ATTR':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [action.payload.id]: {
              ...state.attributes.secondary[action.payload.id],
              attributes: state.attributes.secondary[action.payload.id].attributes.map(
                                (attribute, key) => ({
                                  ...attribute,
                                  selected: (action.payload.selected[0] === key)?
                                            !state.attributes.secondary[action.payload.id].attributes[key].selected :
                                            state.attributes.secondary[action.payload.id].attributes[key].selected
                                })
                              )
            }
          }
        }
      }
    case 'HIDE_SIDEBAR':
      return {
        categoryID: null,
        subCategoryID: null,
        subSubCategoryID: null,
        attributes: {
          primary: [],
          secondary: [],
          selected: -1,
        }
      }
    case 'UPDATE_UI_CATEGORY_STOCK':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [action.payload.id]: {
              ...state.attributes.secondary[action.payload.id],
              attributes: state.attributes.secondary[action.payload.id].attributes.map(
                                (attribute, key) => ({
                                  ...attribute,
                                  stock: (key === action.payload.key ) ? action.payload.value : attribute.stock
                                })
                              )
            }
          }
        }
      }
    case 'VALIDATE_UI_CATEGORY_STOCK':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [action.payload.id]: {
              ...state.attributes.secondary[action.payload.id],
              attributes: state.attributes.secondary[action.payload.id].attributes.map(
                                (attribute, key) => ({
                                  ...attribute,
                                  stock: (attribute.stock < 0 ) ? 0 : attribute.stock
                                })
                              )
            }
          }
        }
      }
    case 'UPDATE_UI_CATEGORY_STOCK_INC':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [action.payload.id]: {
              ...state.attributes.secondary[action.payload.id],
              attributes: state.attributes.secondary[action.payload.id].attributes.map(
                                (attribute, key) => ({
                                  ...attribute,
                                  stock: (key === action.payload.key ) ? ( parseInt(attribute.stock, 10) + 1) : attribute.stock
                                })
                              )
            }
          }
        }
      }
    case 'UPDATE_UI_CATEGORY_STOCK_DEC':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [action.payload.id]: {
              ...state.attributes.secondary[action.payload.id],
              attributes: state.attributes.secondary[action.payload.id].attributes.map(
                                (attribute, key) => ({
                                  ...attribute,
                                  stock: (key === action.payload.key ) ?
                                            getDecrement(attribute.stock)
                                          : attribute.stock
                                })
                              )
            }
          }
        }
      }
    case 'SET_CATEGORIES_PRODUCT_IMAGES':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary: state.attributes.primary.map(
            (obj, key) => {
              if(obj.id === action.payload.id ) {
                return {
                  ...obj,
                  files: [
                    ...obj.files,
                    ...action.payload.files
                  ]
                }
              }
              return obj;
            }
          )
        }
      }
    case 'REMOVE_CATEGORIES_PRODUCT_IMAGE':
      return {
          ...state,
          attributes: {
            ...state.attributes,
            primary: state.attributes.primary.map(
              (obj, key) => {
                if(obj.id === action.payload.id ) {
                  return {
                    ...obj,
                    files: obj.files.filter(
                      ( imgObj, key) => (key !== action.payload.key)
                    )
                  }
                }
                return obj;
              }
            )
          }
        }
    case 'POST_API_PRODUCT_IMGAE_DONE':
      return {
            ...state,
            attributes: {
              ...state.attributes,
              primary: state.attributes.primary.map(
                (obj, key) => {
                  if(obj.id === action.payload.id ) {
                    return {
                      ...obj,
                      files: obj.files.map(
                        (file, key) => {
                          if(key === action.payload.key) {
                            return {
                              ...file,
                              apiID: action.payload.response.id,
                              apiError: false,
                            }
                          }

                          return file;
                        }
                      )
                    }
                  }

                  return obj;
                }
              )
            }
          }
    case 'POST_API_PRODUCT_IMGAE_ERROR':
      return {
            ...state,
            attributes: {
              ...state.attributes,
              primary: state.attributes.primary.map(
                (obj, key) => {
                  if(obj.id === action.payload.id ) {
                    return {
                      ...obj,
                      files: obj.files.map(
                        (file, key) => {
                          if(key === action.payload.key) {
                            return {
                              ...file,
                              apiID: null,
                              apiError: false,
                            }
                          }

                          return file;
                        }
                      )
                    }
                  }
                  return obj;
                }
              )
            }
          }
    default:
      return state;
  }
}
