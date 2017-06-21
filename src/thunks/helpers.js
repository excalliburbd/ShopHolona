import fetch from 'isomorphic-fetch';

export const baseURL = 'http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api';

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

const parseJSON = response => {
  return new Promise((resolve) => {
    response.text().then(
      text => {
        if (text) {
          resolve({
            status: response.status,
            ok: response.ok,
            json: JSON.parse(text),
          })
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

const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const request = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(baseURL+url, options)
      .then(handleErrors)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }

        if (response.empty) {
          return resolve(response);
        }
      }).catch(
        err => reject( err )
      );
  });
}
