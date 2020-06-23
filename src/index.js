import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import FixerService from './fixer-service';
import { ServiceProvider } from "./components/service-context";

import App from './components/app';

const fixerService = new FixerService()

ReactDOM.render(
  <Provider store={store}>
    <ServiceProvider value={fixerService}>
      <App />
    </ServiceProvider>
  </Provider>,
  document.getElementById("root")
);
