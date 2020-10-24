import React from 'react';
import { TinaProvider, TinaCMS } from 'tinacms';
import './App.css';
import PageContent from './PageContent';
import Plugins from './Plugins';

function App() {
  const cms = new TinaCMS({
    sidebar: true,
    toolbar: true,
  });
  return (
    <TinaProvider cms={cms}>
      <div className="App">
        <Plugins />
        <PageContent />
      </div>
    </TinaProvider>
  );
}

export default App;
