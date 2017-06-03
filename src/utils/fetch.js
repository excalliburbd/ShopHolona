/**
 * Authentication token
 * @returns {null}
 */
export const getAccessToken = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('accessToken');
  } else {
    return '';
  }
}

/**
 * All API calls should be wrapped/handled/called by this in method order
 * for any common additional stuff to be done (e.g. adding Authorization headers)
 */
export const wrapHeader = (authToken = false) => {
  var headers = new Headers();
  headers.append("Content-type", "application/json")

  if (authToken && getAccessToken()){
    headers.append("Authorization", `JWT ${getAccessToken()}`)
  }

  return headers;
}

/**
 * Response serializer
 * @param response
 * @returns {*}
 * @private
 */
export const responseSerialize = fetch => (
  fetch.then(response => {
    if (response.ok) {
      if (response.status === 204) return null
      return response.json()
    }

    return response.json().then(error => {
      throw error
    })
  })
)

export const formDataSerializer = payload => {
  let formData  = new FormData();
  for(let name in payload) {
    formData.append(name, payload[name]);
  }

  return formData;
}
