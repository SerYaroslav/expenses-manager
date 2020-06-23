import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import FixerService from './fixer-service';
import { ServiceProvider } from "./components/service-context";

import App from './components/app';

import ErrorBoundry from './components/error-boundry';

const fixerService = new FixerService()

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ServiceProvider value={fixerService}>
        <App />
      </ServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
