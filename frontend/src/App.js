import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './components/Routes'

import './App.css';

function App () {
  return (
    <div className="App">
      <div id="no-popup">
        <BrowserRouter>
          <Routes></Routes>
        </BrowserRouter>
      </div>
      <div id="modal">
      </div>
    </div>
  );
}

export default App;
