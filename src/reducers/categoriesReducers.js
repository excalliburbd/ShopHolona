import { handleActions } from 'redux-actions';
import uuid from 'uuid';

import {
  categoryActions,
  productActions,
  sidebarActions
} from '../actions/';

const getDecrement = stock => {
  const decrement = parseInt(stock, 10) - 1;

  if (decrement < 0) {
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

});

const initialCategoriesUiState = {
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
    all: [],
    doneAll: false,
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

      action.payload.primary.forEach(
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

      action.payload.secondary.forEach(
        attribute => {
          secondary.push({
            ...attribute,
            selected: false,
            stock: 0,
            custom: false
          });
        }
      )

      const nestedAttr = {};

      state.attributes.primary.map(
            obj => ({
              id: obj.id,
              custom: false,
              attributes: secondary,
              hasInitial: secondary.length > 0,
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
      const customID = `custom.${state.attributes.primary.length + 1}.${uuid.v4()}`;
      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary: [
            ...state.attributes.primary,
            {
              id: customID,
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
            [customID]: {
              id: customID,
              custom: true,
              attributes: []
            }
          },
          selected: state.attributes.primary.length,
          doneAll: false,
        }
      }
  },
  [categoryActions.categories.ui.set.attr.fromList.primary]: (state, action) => {
      const secondaryAttributes = {
        ...state.attributes.secondary
      }

      if (state.attributes.secondary.hasOwnProperty(action.payload.id.id)) {
        const key = state.attributes.primary.findIndex(
                      attr => attr.id === action.payload.id.id
                    )

        delete secondaryAttributes[action.payload.id.primary];
        return {
          ...state,
          attributes: {
            ...state.attributes,
            primary: state.attributes.primary.filter( attr => attr.id !== action.payload.id.primary),
            secondary: secondaryAttributes,
            selected: key
          }
        }
      }

      const attribute = action.payload.attributes.find(
                      obj => (obj.id === action.payload.id.id)
                    );

      delete secondaryAttributes[action.payload.id.primary];

      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary: state.attributes.primary.map(
            attr => {
              if (attr.id === action.payload.id.primary) {
                return {
                  ...attr,
                  ...attribute,
                  id: action.payload.id.id,
                  custom: false,
                }
              }
              return attr;
            }
          ),
          secondary: {
            ...secondaryAttributes,
            [action.payload.id.id]: {
              id: action.payload.id.id,
              custom: true,
              attributes: []
            }
          },
          doneAll: false,
        }
      }
  },
  [categoryActions.categories.ui.set.attr.fromList.secondary]: (state, action) => {
      // const attr = action.payload.attributes.find(
      //                 obj => (obj.id === action.payload.id.id)
      //               );

      // const secondaryAttributes = {
      //   ...state.attributes.secondary
      // }

      // delete secondaryAttributes[action.payload.id.primary];

      // return {
      //   ...state,
      //   attributes: {
      //     ...state.attributes,
      //     primary: state.attributes.primary.map(
      //       attr => {
      //         if (attr.id === action.payload.id.primary) {
      //           return {
      //             ...attr,
      //             custom: false
      //           }
      //         }
      //         return attr;
      //       }
      //     ),
      //     secondary: {
      //       ...secondaryAttributes,
      //       [action.payload.id.id]: {
      //         id: action.payload.id.id,
      //         custom: false,
      //         attributes: []
      //       }
      //     }
      //   }
      // }
  },
  [categoryActions.categories.ui.set.attr.custom]: (state, action) => {
    if (action.payload.value === '') {
      const customID = `custom.${state.attributes.primary.length + 1}.${uuid.v4()}`;

      delete state.attributes.secondary[action.payload.primary];
      return {
        ...state,
        attributes: {
          ...state.attributes,
          primary: state.attributes.primary.map(
            attr => {
              if (attr.id === action.payload.primary) {
                return {
                  ...attr,
                  id: customID,
                  name: `Custom Variance ${state.attributes.primary.length + 1}`,
                  custom: true,
                  value: action.payload.value,
                }
              }
              return attr;
            }
          ),
          secondary: {
            ...state.attributes.secondary,
            [customID]: {
              id: customID,
              custom: true,
              attributes: []
            }
          },
          doneAll: false,
        }
      }
    }

    return {
      ...state,
      attributes: {
        ...state.attributes,
        primary: state.attributes.primary.map(
          attr => {
            if (attr.id === action.payload.primary) {
              return {
                ...attr,
                value: action.payload.value,
              }
            }
            return attr;
          }
        )
      }
    }
  },
  [categoryActions.categories.ui.set.attr.temp.attribute]: (state, action) => {
      const customID = `custom.${state.attributes.secondary[action.payload].attributes.length}.${uuid.v4()}`;
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
                  id: customID,
                  name: state.temporaryAttribute.key,
                  value: state.temporaryAttribute.value,
                  selected: true,
                  stock: state.temporaryAttribute.stock,
                  custom: true,
                }
              ]
            }
          },
          doneAll: false,
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
        ...initialCategoriesUiState,
  }),
  [categoryActions.categories.ui.update.name]: (state, action) => {
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
                                  name: (key === action.payload.key ) ? action.payload.value : attribute.name,
                                })
                              )
            }
          }
        }
      }
  },
  [categoryActions.categories.ui.update.value]: (state, action) => {
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
                                  value: (key === action.payload.key ) ? action.payload.value : attribute.value,
                                })
                              )
            }
          }
        }
      }
  },
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
                                  stock: (key === action.payload.key ) ? action.payload.value : attribute.stock,
                                  selected: (key === action.payload.key ) ? (action.payload.value > 0) : attribute.selected,
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
                                  stock: (attribute.stock < 0 ) ? 0 : attribute.stock,
                                  selected: (attribute.stock < 0 ) ? false : attribute.selected,
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
                                  stock: (key === action.payload.key ) ? (parseInt(attribute.stock, 10) + 1) : attribute.stock,
                                  selected: (key === action.payload.key ) ? ((parseInt(attribute.stock, 10) + 1) > 0) : attribute.selected,
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
                                  stock: (key === action.payload.key ) ? getDecrement(attribute.stock) : attribute.stock,
                                  selected: (key === action.payload.key ) ? (getDecrement(attribute.stock) > 0) : attribute.selected,
                                })
                              )
            }
          }
        }
      }
  },
  [categoryActions.categories.done.post.customAttr.idPrimary]: (state, action) => {
    const newAttributes = { ...state.attributes };
    const newSecondary = {
      ...newAttributes.secondary[action.payload.oldID],
      id: action.payload.newID,
      custom: false,
    }

    delete newAttributes.secondary[action.payload.oldID];
    return {
      ...state,
      attributes: {
        ...newAttributes,
        primary: newAttributes.primary.map(
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
          ...newAttributes.secondary,
          [action.payload.newID]: newSecondary
        }
      }
    }
  },
  [categoryActions.categories.done.post.customAttr.idSecondary]: (state, action) => {
      const id = action.payload.primaryID;
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
    next(state, action) {
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
    throw(state, action) {
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
  [productActions.products.ui.reset.subSubCategories]: (state, action) => {
      return {
        ...initialCategoriesUiState,
        categoryID: state.categoryID,
        subCategoryID: state.subCategoryID,
        categories: state.categories,
        subCategories: state.subCategories,
        subSubCategories: state.subSubCategories,
      }
  },
  [productActions.products.ui.reset.subCategories]: (state, action) => {
      return {
        ...initialCategoriesUiState,
        categoryID: state.categoryID,
        categories: state.categories,
        subCategories: state.subCategories,
      }
  },
  [productActions.products.ui.reset.categories]: (state, action) => {
      return {
        ...initialCategoriesUiState,
        categories: state.categories,
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
  },
  [productActions.products.done.get.attributes]: (state, action) => {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        all: action.payload,
      }
    }
  },
  [categoryActions.categories.done.post.customAttr.all]: (state, action) => {
    return {
      ...state,
      attributes: {
        doneAll: true,
      }
    }
  }
}, initialCategoriesUiState )
