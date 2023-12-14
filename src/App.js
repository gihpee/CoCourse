import React from 'react';
import Profile from './Components/Profile/Profile';
import Create from './Components/Create/Create';
import CreateCourse from './Components/Create/CreateCourse';
import Feed from './Components/Feed/Feed';
import NavBar from './Components/Navbar/Navbar';
import Course from './Components/Course/Course'
import SendFeedback from './Components/Feedback/SendFeedback'
import EditProfile from './Components/Profile/EditProfile'
import Bio from './Components/Profile/Bio'
import Subj from './Components/Profile/Subj'
import Univ from './Components/Profile/Univ'
import ECourse from './Components/Profile/ECourse'
import {Route, Routes} from "react-router-dom"
import "./App.css";

function App() {

  return (
    <div className='App'>
      <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
        <Routes>
          <Route index element={<><Feed /> <NavBar /> </>}/>
          <Route path={'create'} element={<><Create /> <NavBar /> </>}/>
          <Route path={'profile'} element={<><Profile /> <NavBar /> </>}/>
          <Route path={'course/:id'} element={<Course />}/>
          <Route path={'create-course'} element={<CreateCourse />}/>
          <Route path={'send-feedback/:id'} element={<SendFeedback />}/>
          <Route path={'edit-profile/:id'} element={<EditProfile />}/>
          <Route path={'edit-bio/:id'} element={<Bio />}/>
          <Route path={'edit-ecourse/:id'} element={<ECourse />}/>
          <Route path={'edit-subj/:id'} element={<Subj />}/>
          <Route path={'edit-univ/:id'} element={<Univ />}/>
        </Routes>
    </div>
  );
}

export default App;





