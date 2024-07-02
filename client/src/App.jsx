import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/home/Home.jsx';
import Login from './Pages/login/Login.jsx';
import SignUp from './Pages/signUp/SignUp.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;