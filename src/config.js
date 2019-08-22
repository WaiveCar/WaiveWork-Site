export default (() => {
  return process.env.NODE_ENV !== 'production'
    ? {
        apiUrl: 'http://127.0.0.1:3080',
        mapsKey: 'AIzaSyDuTxwQN4WKCktkzkLTHZSD7EzHvCn3WHs',
      }
    : {
        apiUrl: 'https://api.waivecar.com',
        mapsKey: 'AIzaSyDuTxwQN4WKCktkzkLTHZSD7EzHvCn3WHs',
      };
})();
