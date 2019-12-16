import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScrollToTop from './components/ScrollToTop';
import App from './components/App';
import store from './store';
import './bootstrap/custom.scss';
import config from './config';
// This sets the base url for axios
import axios from 'axios';
axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
