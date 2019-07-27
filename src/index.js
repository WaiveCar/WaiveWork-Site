import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import './bootstrap/custom.scss';
import config from './config';
// This sets the base url for axios
import axios from 'axios';
axios.defaults.baseUrl = config.apiUrl;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
