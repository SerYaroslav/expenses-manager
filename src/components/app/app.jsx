import React from 'react';

import CommandField from '../command-field';
import OutputArea from "../output-area";

import ErrorBoundry from '../error-boundry';

const App = () => {
  return (
    <main className="container-sm text-center">
      <div className="mx-auto">
        <CommandField className="mx-auto" />
          <ErrorBoundry>
          <OutputArea />
        </ErrorBoundry>
      </div>
    </main>
  );
}

export default App;