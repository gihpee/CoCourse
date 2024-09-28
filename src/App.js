import React from 'react';
import Profile from './Components/Profile/Profile';
import Create from './Components/Create/Create';
import CreateCourse from './Components/Create/CreateCourse';
import ConnectBot from './Components/Create/ConnectBot';
import Feed from './Components/Feed/Feed';
import NavBar from './Components/Navbar/Navbar';
import Course from './Components/Course/Course'
import SendFeedback from './Components/Feedback/SendFeedback'
import EditProfile from './Components/Profile/EditProfile'
import Bio from './Components/Profile/Bio'
import Subj from './Components/Profile/Subj'
import Univ from './Components/Profile/Univ'
import Wallet from './Components/Wallet/Wallet'
import ECourse from './Components/Profile/ECourse'
import {Route, Routes} from "react-router-dom"
import "./App.css";
import EditCourse from './Components/Create/EditCourse';
import FeedbackCourse from './Components/Feedback/FeedbackCourse'
import FeedbackUser from './Components/Feedback/FeedbackUser';
import User from './Components/Profile/User';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Registration from './Components/Profile/Registration';


function App() {
  let tg = window.Telegram;
  tg.WebApp.expand();
  tg.WebApp.enableClosingConfirmation()

  return (
    <TonConnectUIProvider manifestUrl="https://cosmic-axolotl-6ea6bd.netlify.app/tonconnect-manifest.json">
    <div className='App'>
      <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
        <Routes>
          <Route index element={<Feed />}/>
          <Route path={'create'} element={<><Create /> <NavBar /> </>}/>
          <Route path={'profile'} element={<Profile />}/>
          <Route path={'course/:cid'} element={<Course />}/>
          <Route path={'create-course/:cid'} element={<CreateCourse />}/>
          <Route path={'send-feedback/:id'} element={<SendFeedback />}/>
          <Route path={'edit-profile/:id'} element={<EditProfile />}/>
          <Route path={'edit-bio/:id'} element={<Bio />}/>
          <Route path={'edit-ecourse/:id'} element={<ECourse />}/>
          <Route path={'edit-subj/:id'} element={<Subj />}/>
          <Route path={'edit-univ/:id'} element={<Univ />}/>
          <Route path={'edit-course/:cid'} element={<EditCourse />}/>
          <Route path={'course-feedback/:id'} element={<FeedbackCourse />}/>
          <Route path={'user-feedback/:id'} element={<FeedbackUser />}/>
          <Route path={'user/:id'} element={<User />}/>
          <Route path={'wallet'} element={<Wallet />}/>
          <Route path={'connect-bot'} element={<ConnectBot />}/>
          <Route path={'registration'} element={<Registration />}/>
        </Routes>
    </div>
    </TonConnectUIProvider>
  );
}

export default App;





