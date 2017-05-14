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
          primary.push({ ...attribute, selected: false });
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

    case 'SET_UI_PRIMARY_ATTR':
      let primaryArr = [];

      if(action.payload.obj.selected === true) {
        primaryArr = state.attributes.primary.map(
                  attribute => ((attribute.id === action.payload.obj.id)? ({
                    ...action.payload.obj,
                    selected: !action.payload.obj.selected
                  }): attribute)
                )

        return {
            ...state,
            attributes: {
              ...state.attributes,
              primary: [
                ...primaryArr
              ]
            }
          }
      } else {
        primaryArr = state.attributes.primary.filter(
                  attribute => (attribute.id !== action.payload.obj.id)
                )

        return {
            ...state,
            attributes: {
              ...state.attributes,
              primary: [
                {
                  ...action.payload.obj,
                  selected: true,
                },
                ...primaryArr
              ]
            }
          }
      }
    case 'SET_UI_SECONDARY_ATTR':
      console.log(action)
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
                                  stock: (key === action.payload.key ) ? ( parseInt(attribute.stock, 10) - 1) : attribute.stock
                                })
                              )
            }
          }
        }
      }
    default:
      return state;
  }
}
