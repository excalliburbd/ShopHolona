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
    // case 'SET_API_SUB_SUB_CATEGORIES':
    //   const categories = [];

    //   action.payload.forEach(
    //     category => {
    //       if(state.indexOf(category.id) === -1) {
    //         categories.push(category.id)
    //       }
    //     }
    //   )

    //   return [
    //     ...state,
    //     ...categories,
    //   ]
    default:
      return state;
  }
}

export const CategoriesEntityReducer = (
  state = {

  },
  action
) => {
  switch (action.type) {


    default:
      return state;
  }
}

export const CategoriesUIReducer = (
  state = {
    categoryID: null,
    subCategoryID: null,
    subSubCategoryID: null,
    categories: {},
    subCategories: {},
    subSubCategories: {},
    attributes: {
      primary: [],
      secondary: {},
      selected: -1,
    },
    temporaryAttribute: {
      key: '',
      value: ''
    },
    uploadProgress: {
      primary: false,
      secondary: false,

    },
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
          primary.push({ ...attribute, selected: false, files: [], custom: false });
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
          secondary.push({ ...attribute, selected: false, stock: 0, custom: false });
        }
      )

      const nestedAttr = {};

      state.attributes.primary.map(
            obj => ({
              id: obj.id,
              custom: false,
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
    case 'UNSET_UI_PRIMARY_ATTR':
      return {
          ...state,
          attributes: {
            ...state.attributes,
            primary: state.attributes.primary.map(
              (obj, key) => ({
                ...obj,
                selected: (action.payload.id === obj.id) ? false : state.attributes.primary[key].selected
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
    case 'ADD_UI_PRIMARY_ATTRIBUTE':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary: [
            ...state.attributes.primary,
            {
              id: `custom${state.attributes.primary.length + 1}`,
              name: `Custom Variance ${state.attributes.primary.length + 1}`,
              value: (action.payload === 'Clothing') ?
                      `Color ${state.attributes.primary.length + 1}` :
                      `Custom Variance ${state.attributes.primary.length + 1}`,
              selected: false,
              custom: true,
              files: []
            }
          ],
          secondary: {
            ...state.attributes.secondary,
            [`custom${state.attributes.primary.length + 1}`]: {
              id: `custom${state.attributes.primary.length + 1}`,
              custom: true,
              attributes: []
            }
          }
        }
      }
    case 'SET_UI_TEMP_ATTRIBUTE':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [action.payload]: {
              ...state.attributes.secondary[action.payload],
              attributes: [
                ...state.attributes.secondary[action.payload].attributes,
                {
                  id: `custom${state.attributes.secondary[action.payload].attributes.length}`,
                  name: state.temporaryAttribute.key,
                  value: state.temporaryAttribute.value,
                  selected: true,
                  stock: state.temporaryAttribute.stock,
                  custom: true,
                }
              ]
            }
          }
        },
        temporaryAttribute: {
          key: '',
          value: '',
          stock: 0,
        }
      }
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        categoryID: null,
        subCategoryID: null,
        subSubCategoryID: null,
        categories: {},
        subCategories: {},
        subSubCategories: {},
        attributes: {
          primary: [],
          secondary: {},
          selected: -1,
        },
        temporaryAttribute: {
          key: '',
          value: ''
        },
        uploadProgress: {
          primary: false,
          secondary: false,

        },
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
    case 'SET_CUSTOM_ATTRIBUT_ID_PRIMAY':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary: state.attributes.primary.map(
            (obj, key) => {
              if(obj.id === action.payload.oldID ) {
                return {
                  ...obj,
                  id: action.payload.newID,
                  custom: false,
                }
              }
              return obj;
            }
          ),
          secondary: {
            ...state.attributes.secondary,
            [action.payload.newID]: {
              ...state.attributes.secondary[action.payload.oldID],
              id: action.payload.newID,
              custom: false,
            },
            [action.payload.oldID]: {
              ...state.attributes.secondary[action.payload.oldID],
              depricated: true,
              redirect: action.payload.newID,
            }
          }
        }
      }
    case 'SET_CUSTOM_ATTRIBUT_ID_SECONDARY':

      const id = (state.attributes.secondary[action.payload.primaryID].depricated) ?
                  state.attributes.secondary[action.payload.primaryID].redirect :
                  action.payload.primaryID;
      return {
        ...state,
        attributes: {
          ...state.attributes,
          secondary: {
            ...state.attributes.secondary,
            [id]: {
              ...state.attributes.secondary[id],
              attributes: state.attributes.secondary[id].attributes.map(
                obj => {
                  if(obj.id === action.payload.oldID) {
                    return {
                      ...obj,
                      id: action.payload.newID,
                      custom: false,
                    }
                  }

                  return obj;
                }
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
    case 'DONE_API_PRODUCT_IMGAE_POST':
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
    case 'ERROR_API_PRODUCT_IMGAE_POST':
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
    case 'SET_UI_TEMP_ATTRIBUTE_KEY':
      return {
        ...state,
        temporaryAttribute: {
          ...state.temporaryAttribute,
          key: action.payload
        }
      }
    case 'SET_UI_TEMP_ATTRIBUTE_VALUE':
      return {
        ...state,
        temporaryAttribute: {
          ...state.temporaryAttribute,
          value: action.payload
        }
      }
    case 'SET_UI_TEMP_ATTRIBUTE_STOCK':
      return {
        ...state,
        temporaryAttribute: {
          ...state.temporaryAttribute,
          stock: action.payload
        }
      }
    case 'SET_CATEGORIES':
      const categories = {};

      action.payload.forEach(
        category => {
          categories[category.id] = category;
        }
      )

      return {
        ...state,
        categories
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
        subCategories,
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
        subSubCategories,
      }
    case 'REMOVE_SUB_SUB_CATEGORIES':
      return {
        ...state,
        subSubCategories: {}
      }
    // case 'SET_API_SUB_SUB_CATEGORIES':
    //   const apiSubSubCategories = {};

    //   action.payload.sub_categories.forEach(
    //     category => {
    //       apiSubSubCategories[category.id] = category;
    //     }
    //   )

    //   return {
    //     ...state,
    //     subSubCategories : {
    //       ...state.subSubCategories,
    //       ...apiSubSubCategories
    //     }
    //   }
    case 'RESET_UI_SUB_SUB_CATEGORIES':
      return {
        ...state,
        subSubCategoryID: null,
        attributes: {
          primary: [],
          secondary: {},
          selected: -1,
        },
        temporaryAttribute: {
          key: '',
          value: ''
        },
        uploadProgress: {
          primary: false,
          secondary: false,

        },
      }
    case 'RESET_UI_SUB_CATEGORIES':
      return {
        ...state,
        subCategoryID: null,
        subSubCategoryID: null,
        subSubCategories: {},
        attributes: {
          primary: [],
          secondary: {},
          selected: -1,
        },
        temporaryAttribute: {
          key: '',
          value: ''
        },
        uploadProgress: {
          primary: false,
          secondary: false,

        },
      }
    case 'RESET_UI_CATEGORIES':
      return {
        ...state,
        categoryID: null,
        subCategoryID: null,
        subSubCategoryID: null,
        subCategories: {},
        subSubCategories: {},
        attributes: {
          primary: [],
          secondary: {},
          selected: -1,
        },
        temporaryAttribute: {
          key: '',
          value: ''
        },
        uploadProgress: {
          primary: false,
          secondary: false,

        },
      }
    case 'DONE_SET_CUSTOM_ATTRIBUTE_PRIMARY':
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          primary: true,
        },
      }
    case 'DONE_SET_CUSTOM_ATTRIBUTE_SECONDARY':
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          secondary: true,
        },
      }
    default:
      return state;
  }
}
