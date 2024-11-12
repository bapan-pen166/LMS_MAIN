import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import Context, { Datacontext } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Context>
      <Router />
    </Context>
  // </React.StrictMode>
);

reportWebVitals();
