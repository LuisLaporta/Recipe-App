import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RecipesProvider from './Context/RecipesProvider';
import './index.css';
import App from './App';

ReactDOM.render(
  <RecipesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipesProvider>,
  document.getElementById('root'),
);
