import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StatsPage from './components/StatsPage';
import RedirectPage from './components/RedirectPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:code" element={<RedirectPage />} />
    </Routes>
  </BrowserRouter>
);