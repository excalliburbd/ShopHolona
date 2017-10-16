let config = {
  api: 'localhost:8000/api',
  demostore: 22,
  demouser: 'vendor@shophobe.com',
  demopass: '123',
  home: 'localhost:3001',
  vendor: 'localhost:3000',
  nodeAPI: 'http://202.4.96.117:3210',
}

if (process.env.REACT_APP_ENV === 'production') {
  config = {
    ...config,
    demostore: 22,
    api: 'https://backend.shophobe.com/api',
    vendor: 'https://mystore.shophobe.com',
  }
}

if (process.env.REACT_APP_ENV === 'development') {
  config = {
    ...config,
    demostore: 21,
    api: 'https://backenddev.shophobe.com/api',
  }
}

export default config;
