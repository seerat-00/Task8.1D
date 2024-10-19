import React from 'react';
import './App.css';
import Radioexample  from './Radio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './Find';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Radioexample />} />
        <Route path='/find' element={<List />} /> 
        <Route path='/radio' element={<Radioexample />} />
      </Routes>
    </Router>
  )
}

export default App;
