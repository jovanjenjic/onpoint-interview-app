import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@base/App';
import './index.css';
import Styleguide from '@components/StyleGuide/StyleGuide';
import CacheProvider from '@context/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CacheProvider>
      <Styleguide />
      <App />
    </CacheProvider>
  </React.StrictMode>,
);
