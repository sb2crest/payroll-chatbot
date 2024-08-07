import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 
import ManagerLogin from './middleware/ManagerLogin';
import ManagerHome from './middleware/ManagerHome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ManagerLogin />} />
      <Route path="/home" element={<ManagerHome />} />
    </Routes>
  );
}

export default App;
