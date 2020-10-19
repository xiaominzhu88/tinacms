import React from 'react';
import { TinaProvider, TinaCMS } from 'tinacms';
import './App.css';
import PageContent from './PageContent';

function App() {
  const cms = new TinaCMS({
    sidebar: true,
  });
  return (
    <TinaProvider cms={cms}>
      <div className="App">
        <PageContent />
      </div>
    </TinaProvider>
  );
}

export default App;
