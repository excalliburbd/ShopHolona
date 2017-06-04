import { handleActions } from 'redux-actions';

import { categoryActions } from '../actions/';
import { productActions } from '../actions/';
import { sidebarActions } from '../actions/';

const getDecrement = stock => {
  const decrement = parseInt(stock, 10) - 1;

  if(decrement < 0) {
    return 0;
  }

  return decrement;
}

export const categoriesReducer = handleActions({
  [categoryActions.categories.done.get.shopCategory]: (state, action) => {
      const categories = [];

      action.payload.forEach(
        category => categories.push(category.id)
      );

      return categories
  }
}, [

])

export const CategoriesEntityReducer = handleActions({
  [categoryActions.categories.done.get.shopCategory]: (state, action) => {
      const categories = {}

      action.payload.forEach(
        obj => {
          categories[obj.id] = obj
        }
      )

      return {
          ...categories
        }
  }
}, {

})

export const CategoriesUIReducer = handleActions({
  [categoryActions.categories.ui.set.category]: (state, action) => {
      return {
        ...state,
        categoryID: action.payload
      }
  },
  [categoryActions.categories.ui.set.subCategory]: (state, action) => {
      return {
        ...state,
        subCategoryID: action.payload
      }
  },
  [categoryActions.categories.ui.set.subSubCategory]: (state, action) => {
      return {
        ...state,
        subSubCategoryID: action.payload
      }
  },
  [categoryActions.categories.ui.set.attr.primary]: (state, action) => {
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
  },
  [categoryActions.categories.ui.set.attr.secondary]: (state, action) => {
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
  },
  [categoryActions.categories.ui.set.attr.selected]: (state, action) => {
      return {
          ...state,
          attributes: {
            ...state.attributes,
            selected: action.payload.id
          }
        }
  },
  [categoryActions.categories.ui.set.attr.selectPrimary]: (state, action) => {
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
  },
  [categoryActions.categories.ui.unsetPrimaryAttr]: (state, action) => {
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
  },
  [categoryActions.categories.ui.set.attr.selectSecondary]: (state, action) => {
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
  },
  [categoryActions.categories.ui.addPrimaryAttribute]: (state, action) => {
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
  },
  [categoryActions.categories.ui.set.attr.temp.attribute]: (state, action) => {
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
  },
  [sidebarActions.sidebar.hide]: (state, action) => ({
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
  }),
  [categoryActions.categories.ui.update.stock]: (state, action) => {
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
  },
  [categoryActions.categories.ui.validateStock]: (state, action) => {
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
  },
  [categoryActions.categories.ui.update.stockInc]: (state, action) => {
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
  },
  [categoryActions.categories.ui.update.stockDec]: (state, action) => {
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
  },
  [categoryActions.categories.done.post.customAttr.idPrimary]: (state, action) => {
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
  },
  [categoryActions.categories.done.post.customAttr.idSecondary]: (state, action) => {
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
  },
  [categoryActions.categories.ui.set.productImages]: (state, action) => {
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
  },
  [categoryActions.categories.remove.productImage]: (state, action) => {
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
  },
  [categoryActions.categories.done.post.productImage]: {
    next (state, action) {
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
        },
    throw (state, action) {
      return {
            ...state,
            attributes: {
              ...state.attributes,
              primary: state.attributes.primary.map(
                (obj, key) => {
                  if(obj.id === action.meta.id ) {
                    return {
                      ...obj,
                      files: obj.files.map(
                        (file, key) => {
                          if(key === action.meta.key) {
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
    }
  },
  [categoryActions.categories.ui.set.attr.temp.key]: (state, action) => {
      return {
        ...state,
        temporaryAttribute: {
          ...state.temporaryAttribute,
          key: action.payload
        }
      }
  },
  [categoryActions.categories.ui.set.attr.temp.value]: (state, action) => {
      return {
        ...state,
        temporaryAttribute: {
          ...state.temporaryAttribute,
          value: action.payload
        }
      }
  },
  [categoryActions.categories.ui.set.attr.temp.stock]: (state, action) => {
      return {
        ...state,
        temporaryAttribute: {
          ...state.temporaryAttribute,
          stock: action.payload
        }
      }
  },
  [categoryActions.categories.done.get.category]: (state, action) => {
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
  },
  [categoryActions.categories.done.get.subCategory]: (state, action) => {
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
  },
  [categoryActions.categories.done.get.subSubCategory]: (state, action) => {
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
  },
  // [categoryActions.categories]: (state, action) => {
  //   // case 'REMOVE_SUB_SUB_CATEGORIES':
  //     return {
  //       ...state,
  //       subSubCategories: {}
  //     }
  // },
  // [categoryActions.categories]: (state, action) => {
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
  // },
  [productActions.products.ui.reset.subSubCategories]: (state, action) => {
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
  },
  [productActions.products.ui.reset.subCategories]: (state, action) => {
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
  },
  [productActions.products.ui.reset.categories]: (state, action) => {
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
  },
  [categoryActions.categories.done.post.customAttr.primary]: (state, action) => {
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          primary: true,
        },
      }
  },
  [categoryActions.categories.done.post.customAttr.secondary]: (state, action) => {
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          secondary: true,
        },
      }
  }
}, {
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
})
