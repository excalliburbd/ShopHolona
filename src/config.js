let config = {
  api: 'localhost:8000/api',
  demostore: 4,
  demouser: 'vendor@shophobe.com',
  demopass: '123',
  home: 'http://www.shophobe.com',
  vendor: 'localhost:3000'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    api: 'http://li1449-144.members.linode.com/api',
    vendor: 'shophobe.com'
  }
}

if (process.env.NODE_ENV === 'development') {
  config = {
    ...config,
    api: 'http://li1449-144.members.linode.com/api',
    home: 'http://www.shophobe.cf',
  }

  // window.error = false;
}

export default config;
