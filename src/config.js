let config = {
  api: 'localhost:8000/api',
  demostore: 21,
  demouser: 'vendor@shophobe.com',
  demopass: '123',
  home: 'shophobe.com',
  vendor: 'localhost:3000'
}

if (process.env.REACT_APP_ENV === 'production') {
  config = {
    ...config,
    demostore: 22,
    api: 'https://backend.shophobe.com/api',
    vendor: 'shophobe.com'
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
