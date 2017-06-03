import fetch from 'isomorphic-fetch';

class CartAPI {
  /**
   * @param options application settings
   * @param getAuthToken Method that returns the Authorization token
   */
  constructor(baseUrl, wrapHeader, responseSerialize){
    this.baseUrl = baseUrl
    this.wrapHeader = wrapHeader
    this.responseSerialize = responseSerialize
  }

  /**
   * Get user cart
   * @returns {*}
   */
  getCart = () => (
    this.responseSerialize(
      fetch(`${this.baseUrl}/me/carts/`, {
        method: 'GET',
        mode: 'cors',
        headers: this.wrapHeader(true)
      })
    )
  );

  /*
   * Create a new cart item
   * @returns {*}
   */
  addToCart = payload => (
    this.responseSerialize(
      fetch(`${this.baseUrl}/me/carts/`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: this.wrapHeader(true)
      })
    )
  );

  /*
   * Update cart item
   * @returns {*}
   */
  updateCartItem = (id, payload) => (
    this.responseSerialize(
      fetch(`${this.baseUrl}/me/carts/${id}/`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: this.wrapHeader(true)
      })
    )
  );

  /*
   * Delete a cart item
   * @returns {*}
   */
  deleteCartItem = id => (
    this.responseSerialize(
      fetch(`${this.baseUrl}/me/carts/${id}/`, {
        method: 'DELETE',
        mode: 'cors',
        headers: this.wrapHeader(true)
      })
    )
  );
}

export default  CartAPI;
