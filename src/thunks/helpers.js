import fetch from 'isomorphic-fetch';

import config from '../config'

export const baseURL = config.api;

export const getConfig = ( token = null, body = null, method = 'GET', mode = 'cors') => {
  let config =  {
    method,
    mode,
    headers: {
      'Accept': 'application/json',
    }
  }

  if (body) {
    if (body === Object(body) && !(body instanceof FormData ) ) {
      config = {
        ...config,
        body: JSON.stringify(body),
        headers: {
          ...config.headers,
          'Content-Type': 'application/json'
        }
      }
    } else {
      config = {
        ...config,
        body,
        headers: {
          ...config.headers,
        }
      }
    }
  }

  if (token) {
    config = {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': `JWT ${token}`
      }
    }
  }

  return config;
}

const handleErrors = response => {
  return new Promise((resolve, reject) => {
    const res = response.clone()

    if (!response.ok) {
      response.text().then(
        text => {
          reject(text)
        }
      )
    } else {
      resolve(res);
    }
  });
}

const parseJSON = response => {
  return new Promise((resolve, reject) => {
    const {
      ok,
      redirected,
      status,
      statusText,
      type,
      url,
    } = response;

    response.text().then(
      text => {
        if (text) {
          resolve({
            ok,
            redirected,
            status,
            statusText,
            type,
            url,
            json: JSON.parse(text),
          });
        } else {
          resolve({
            ok,
            redirected,
            status,
            statusText,
            type,
            url,
            empty: true,
          });
        }
      }
    ).catch(
      err => reject(err)
    );
  });
}

export const baseRequest = api =>  (route, options) => {
  return new Promise((resolve, reject) => {
    fetch(api+route, options)
      .then(handleErrors)
      .then(parseJSON)
      .then((response) => {
        if (response.empty) {
          return resolve(response);
        } else {
          return resolve(response.json);
        }
      }).catch(
        err => reject(err)
      )
  });
}

export const request = baseRequest(baseURL);

// export const requestNode = baseRequest(nodeURL);

export const fromState = getState => {
  const state = getState();
  const payments = state.shop.payments[0];
  const demostore = state.shop.id === state.shop.demostore;
  const address = state.shop.information.address[0];
  const updatedAddress = {
    ...address,
    city: state.ui.paymentsAndAddresses.cityID,
    thana: state.ui.paymentsAndAddresses.thanakID,
    district: state.ui.paymentsAndAddresses.districtID,
  };
  const bankName = payments && payments.bank && state.cachedEntities.banks[payments.bank.bank_name] && state.cachedEntities.banks[payments.bank.bank_name].name;
  const cart = {
    list: state.cart.items,
    items: state.entities.cart,
  }
  const token = state.user.token;
  const guestToken = state.ui.user.guestUser;
  const guestPassword = state.ui.user.guestUser.password;
  const shopID = state.shop.id;
  const featuredProducts = state.featuredProducts;

  return {
    demostore,
    payments,
    updatedAddress,
    bankName,
    cart,
    token,
    guestToken,
    guestPassword,
    shopID,
    featuredProducts
  }
}
