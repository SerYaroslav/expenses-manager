import React from 'react';

import CommandField from '../command-field';
import OutputArea from "../output-area";

const App = () => {
  return (
    <main className="container-sm text-center">
      <div className="mx-auto">
        <CommandField className="mx-auto" />
          <OutputArea />
      </div>
    </main>
  );
}

export default App;