export default (() => {
  return process.env.NODE_ENV !== 'production'
    ? {
        apiUrl: 'http://127.0.0.1:3080',
        mapsKey: 'AIzaSyBQysUfVLDsR8aYHZBQ9epqpGAQ-LZ1bTw',
      }
    : {
        apiUrl: 'https://api.waivecar.com',
        mapsKey: 'AIzaSyBQysUfVLDsR8aYHZBQ9epqpGAQ-LZ1bTw',
      };
})();
