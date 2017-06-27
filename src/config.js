let config = {
  api: 'localhost:8000/api'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    api: 'http://li1616-180.members.linode.com/api',
  }
}

if (process.env.NODE_ENV === 'development') {
  config = {
    api: 'http://li1449-144.members.linode.com/api'
  }
}

export default config;
