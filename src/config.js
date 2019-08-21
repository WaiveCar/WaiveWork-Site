export default (() => {
  return process.env.NODE_ENV !== 'production'
    ? {
        apiUrl: 'http://127.0.0.1:3080',
        mapsKey: 'bc7b4da77e971c12cb0e069bffcf2771',
        realkey: '8698d318586c58a1f8ca1e88ecfac299',
      }
    : {
        apiUrl: 'https://api.waivecar.com',
        mapsKey: 'bc7b4da77e971c12cb0e069bffcf2771',
        realkey: '8698d318586c58a1f8ca1e88ecfac299',
      };
})();
