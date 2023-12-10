import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Front from './Front';
import Login from './Login';
import Signup from './Signup'; 

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <Router>
      <Routes>
        <Route path="/main" element={<Front />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    
      </Routes>
    </Router>
      
    
  )
}

export default App
