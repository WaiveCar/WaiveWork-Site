export default (() => {
  return process.env.NODE_ENV !== 'production'
    ? {
        apiUrl: 'http://127.0.0.1:3080',
      }
    : {
        apiUrl: 'https://api.waivecar.com',
      };
})();
