import CartAPI from './cart';
import config from '../config/client';
import { wrapHeader, responseSerialize  } from '../utils/fetch'

/**
 * Main API wrapper that provides access to all the available resources
 */
class API {
  constructor(baseUrl, wrapHeader, responseSerialize) {
    this.cart = new CartAPI(baseUrl, wrapHeader, responseSerialize);
  }
}

/**
 * Initialized API with configuration
 */
export default new API(config.baseUrl, wrapHeader, responseSerialize);
