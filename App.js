import React from 'react';
import ShortenerForm from './components/ShortenerForm';

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>URL Shortener</h1>
      <ShortenerForm />
    </div>
  );
};

export default App;