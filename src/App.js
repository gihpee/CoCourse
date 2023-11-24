import React, { useState } from 'react';
import Profile from './Components/Profile/Profile';
import Create from './Components/Create/Create';
import Feed from './Components/Feed/Feed';
import NavBar from './Components/Navbar/Navbar';
import Course from './Components/Course/Course'
import {Route, Routes} from "react-router-dom"
import "./App.css";

function App() {

  return (
    <div className='App'>
        <Routes>
          <Route index element={<Feed />}/>
          <Route path={'create'} element={<Create />}/>
          <Route path={'profile'} element={<Profile />}/>
          <Route path={'course'} element={<Course />}/>
        </Routes>
        <NavBar />
    </div>
  );
}

export default App;





