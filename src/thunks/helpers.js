import fetch from 'isomorphic-fetch';

export const baseURL = 'http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api';
export const altURL = 'localhost:3001/api';

export const getConfig = ( token = null, body = null, method = 'get', mode = 'cors') => {
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

const parseJSON = response => {
  return new Promise((resolve) => {
    response.text().then(
      text => {
        if (text) {
          try {
            resolve({
              status: response.status,
              ok: response.ok,
              json: JSON.parse(text),
            })
          } catch (err) {
            resolve({
              empty: true,
              status: response.status,
            })
          }
        } else {
          resolve({
            empty: true,
            status: response.status,
          })
        }
      }
    )

  });
}

export const request = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(baseURL+url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.empty) {
          return resolve(response);
        }

        if (response.ok) {
          return resolve(response.json);
        } else {
          return reject(response.json);
        }
      })
  });
}
