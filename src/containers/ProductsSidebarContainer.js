import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

import { getSubCategory, getSubSubCategory } from '../actions/productsActions';

import ProductsSidebar from '../components/ProductsSidebar';

const getCategoriesObj = state => state.entities.categoryEntities.categories;
const getSubCategoriesObj = state => state.entities.categoryEntities.subCategories;
const getSubSubCategoriesObj = state => state.entities.categoryEntities.subSubCategories;

const getFusedCategories = createSelector(
  [getCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

const getFusedSubCategories = createSelector(
  [getSubCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

const getFusedSubSubCategories = createSelector(
  [getSubSubCategoriesObj],
  (categoriesObj) => {

    const categories = [];

    Object.keys(categoriesObj).forEach(
      id => categories.push(categoriesObj[id])
    )

    return new Fuse(categories, { keys: ['name'] })
  }
);

const mapStateToProps = state => {
  return {
    type: state.ui.sidebar.type,
    categories: getFusedCategories(state),
    subCategories: getFusedSubCategories(state),
    subSubCategories: getFusedSubSubCategories(state),
    categoryID: state.ui.categories.categoryID,
    subCategoryID: state.ui.categories.subCategoryID,
    primaryAttributes: state.ui.categories.attributes.primary,
    secondaryAttributes: state.ui.categories.attributes.secondary,
    radioValue: state.ui.sidebar.radio,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFieldSelect: (type, id, subID) => {
      switch(type) {
        case 'CATEGORY':
          dispatch({
            type: 'SET_UI_CATEGORY',
            id
          })
          dispatch(getSubCategory(id));
          break;
        case 'SUB_CATEGORY':
          dispatch({
            type: 'SET_UI_SUB_CATEGORY',
            id
          })
          dispatch(getSubSubCategory(id, subID));
          break;
        case 'SUB_SUB_CATEGORY':
          dispatch({
            type: 'SET_UI_SUB_SUB_CATEGORY',
            id
          });
          break;
        default:
      }
    },
    handleCategoryObj: obj => {
      dispatch({
        type: 'SET_PRIMARY_ATTR',
        payload: {
          attributes: obj.primary_attr,
        }
      });
      dispatch({
        type: 'SET_SECONDARY_ATTR',
        payload: {
          attributes: obj.secondary_attr,
        }
      });
    },
    handleSelect: obj => {
        dispatch({
          type: 'SET_UI_PRIMARY_ATTR',
          payload: { obj }
        })
    },
    handleAttributeSelect: (selected, id) => {
      dispatch({
        type: 'SET_UI_SECONDARY_ATTR',
        payload: { selected, id }
      });
    },
    handleRadio: value => {
      dispatch({
        type: 'SET_SIDEBAR_UI_RADIO_VALUE',
        payload: value,
      })
    },
    handleStockUpdate: (type, value, id, key) => {
      switch(type){
        case 'VALUE':
          dispatch({
            type: 'UPDATE_UI_CATEGORY_STOCK',
            payload: {
              value,
              id,
              key,
            }
          })
          break;
        case 'INC':
          dispatch({
            type: 'UPDATE_UI_CATEGORY_STOCK_INC',
            payload: {
              id,
              key,
            }
          })
          break;
        case 'DEC':
          dispatch({
            type: 'UPDATE_UI_CATEGORY_STOCK_DEC',
            payload: {
              id,
              key,
            }
          })
          break;
        default:
          break;
      }
    }
  }
}

const ProductsSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsSidebar);

export default ProductsSidebarContainer;
