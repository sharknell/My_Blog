import React from 'react';
import { createRoot } from 'react-dom/client'; // 수정된 부분
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root')); // 수정된 부분
root.render( // 수정된 부분
  <Provider store={store}>
    <App />
  </Provider>
);
