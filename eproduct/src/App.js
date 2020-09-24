import React from 'react';
import './App.css';
import { Appheader } from './header/header';
import Product from './product/product';

function App() {
  return (
    <div className="App">
      <Appheader />
      <div className="container pt-5">
        <Product />
      </div>
    </div>
  );
}

export default App;
