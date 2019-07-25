export default function() {
  return process.env.NODE_ENV !== 'production' ? {
    apiUrl: 'http://staging.waivecar.com:3080'
  } : {
    api:Url: 'https://api.waivecar.com'
  };
}
