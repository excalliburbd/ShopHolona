import { handleActions } from 'redux-actions';

import { serviceActions } from '../actions/';
import { sidebarActions } from '../actions/';

export const serviceReducer = handleActions({
  [serviceActions.services.done.get.services]: (state, action) => {
      const services = state;

      action.payload.forEach(
        service => {
          if(services.indexOf(service.id) === -1) {
            services.unshift(service.id)
          }
        }
      )

      return services;
  },
  [serviceActions.services.done.delete.service]: (state, action) => {
      return state.filter( id => (id !== action.payload));
  }
}, [

]);

export const featuredservicesReducer = handleActions({
  [serviceActions.services.done.get.featuredservices]: (state, action) => {
      const services = state;

      action.payload.forEach(
        ({ service }) => {
          if(services.indexOf(service.id) === -1) {
            services.unshift(service.id)
          }
        }
      )

      return services;
    },
    [serviceActions.services.done.delete.service]: (state, action) => {
      return state.filter( id => (id !== action.payload));
    },
    [serviceActions.services.done.delete.featuredservice]: (state, action) => {
      return state.filter( id => (id !== action.payload));
    }
}, [

]);

export const servicesUIReducer = handleActions({
  [serviceActions.services.ui.set.add.category]: (state, action) => {
    return {
      ...state,
      category: action.payload,
    }
  },
  [serviceActions.services.ui.set.add.subCategory]: (state, action) => {
    return {
      ...state,
      subCategory: action.payload,
    }
  },
  [serviceActions.services.ui.set.add.subSubCategory]: (state, action) => {
    return {
      ...state,
      subSubCategory: action.payload,
    }
  },
  [serviceActions.services.ui.set.add.title]: (state, action) => {
    return {
      ...state,
      title: action.payload,
    }
  },
  [serviceActions.services.ui.set.add.fee]: (state, action) => {
    return {
      ...state,
      fee: action.payload,
    }
  },
  [serviceActions.services.ui.set.add.desc]: (state, action) => {
    return {
      ...state,
      description: action.payload,
    }
  },
  [sidebarActions.sidebar.show.addserviceDetails]: (state, action) => {
      return {
        ...state,
        selectedservice: action.payload,
      }
  },
  [serviceActions.services.ui.set.edit.title]: (state, action) => {
      return {
        ...state,
        selectedservice: {
          ...state.selectedservice,
          title: action.payload,
        }
      }
  },
  [serviceActions.services.ui.set.edit.weight]: (state, action) => {
     return {
        ...state,
        selectedservice: {
          ...state.selectedservice,
          weight: action.payload.value,
        }
      }
  },
  [serviceActions.services.ui.set.edit.fee]: (state, action) => {
      return {
        ...state,
        selectedservice: {
          ...state.selectedservice,
          fee: action.payload.value,
        }
      }
  },
  [serviceActions.services.ui.set.edit.desc]: (state, action) => {
      return {
        ...state,
        selectedservice: {
          ...state.selectedservice,
          short_desc: action.payload.value,
        }
      }
  },
  // [serviceActions.services.ui.set.add.subSubCategory]: (state, action) => {
  //   case 'SHOW_SIDEBAR_service_DETAILS_DETAILS':
  //     return {
  //       ...state,
  //       selectedservice: {
  //         ...state.selectedservice,
  //         details: action.payload.value,
  //       }
  //     }
  // },
  [serviceActions.services.ui.set.variance]: (state, action) => {
      return {
        ...state,
        selectedVariance: action.payload
      }
  },
  [serviceActions.services.ui.reset.subSubCategories]: (state, action) => {
      return {
        ...state,
        subSubCategory: '',
        title: '',
        weight: '',
        fee: '',
        description: '',
        selectedVariance: 0,
        selectedservice: {},
      }
  },
  [serviceActions.services.ui.reset.subCategories]: (state, action) => {
      return {
        ...state,
        subCategory: '',
        subSubCategory: '',
        title: '',
        weight: '',
        fee: '',
        description: '',
        selectedVariance: 0,
        selectedservice: {},
      }
  },
  [sidebarActions.sidebar.hide]: (state, action) => ({
        category: '',
        subCategory: '',
        subSubCategory: '',
        title: '',
        weight: '',
        fee: '',
        description: '',
        selectedVariance: 0,
        selectedservice: {},
  }),
  [serviceActions.services.ui.reset.categories]: (state, action) => {
      return {
        category: '',
        subCategory: '',
        subSubCategory: '',
        title: '',
        weight: '',
        fee: '',
        description: '',
        selectedVariance: 0,
        selectedservice: {},
      }
  },
}, {
  category: '',
  subCategory: '',
  subSubCategory: '',
  title: '',
  fee: '',
  description: '',
  selectedVariance: 0,
  selectedservice: {},
});

export const servicesEntityReducer = handleActions({
    [serviceActions.services.done.get.services]: (state, action) => {
      const services = {
        ...state
      }

      action.payload.forEach(
        service => {
          if (services[service.id]) {
            services[service.id] = {
              ...services[service.id],
              ...service,
            }
          } else {
            services[service.id] = {
              ...service,
              weight: service.variances[0].attributes[0].weight,
              fee: service.variances[0].attributes[0].fee
            }
          }
        }
      )

      return services;
    },
    [serviceActions.services.done.delete.servece]: (state, action) => {
      const servicesEntity = { ...state };

      delete servicesEntity[action.payload];

      return servicesEntity;
    },
    [serviceActions.services.done.get.featuredservices]: (state, action) => {
      const featuredservices = {
        ...state
      }

      action.payload.forEach(
        ({ id, service }) => {
          if (featuredservices[service.id]) {
            featuredservices[service.id] = {
              ...featuredservices[service.id],
              ...service,
              featuredID: id,
            }
          } else {
            featuredservices[service.id] = {
              ...service,
              featuredID: id,
              weight: service.variances[0].attributes[0].weight,
              fee: service.variances[0].attributes[0].fee
            }
          }
        }
      )

      return featuredservices;
    },
  [serviceActions.services.done.delete.featuredservice]: (state, action) => {
      const featuredservicesEntity = { ...state };

      delete featuredservicesEntity[action.payload];

      return featuredservicesEntity;
  },
}, {

});
