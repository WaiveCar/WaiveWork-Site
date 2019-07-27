export default (() => {
  return process.env.NODE_ENV !== 'production'
    ? {
        apiUrl: 'http://staging.waivecar.com:3080',
      }
    : {
        apiUrl: 'https://api.waivecar.com',
      };
})();
