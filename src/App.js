import React, { useState } from 'react';
import Profile from './Components/Profile/Profile';
import Create from './Components/Create/Create';
import CreateCourse from './Components/Create/CreateCourse';
import Feed from './Components/Feed/Feed';
import NavBar from './Components/Navbar/Navbar';
import Course from './Components/Course/Course'
import SendFeedback from './Components/Feedback/SendFeedback'
import {Route, Routes} from "react-router-dom"
import "./App.css";

function App() {

  return (
    <div className='App'>
        <Routes>
          <Route index element={<><Feed /> <NavBar /> </>}/>
          <Route path={'create'} element={<><Create /> <NavBar /> </>}/>
          <Route path={'profile'} element={<><Profile /> <NavBar /> </>}/>
          <Route path={'course/:index'} element={<Course />}/>
          <Route path={'create-course'} element={<CreateCourse />}/>
          <Route path={'send-feedback/:id'} element={<SendFeedback />}/>
        </Routes>
    </div>
  );
}

export default App;





