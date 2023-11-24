import React, { useState } from "react";
import feed from '../assets/navbar/feed.svg'
import plus from '../assets/navbar/plus.svg'
import boy from '../assets/navbar/boy.svg'
import "./Navbar.css";

const NavBar = () => {
    const [selectedSection, setSelectedSection] = useState(null);
  
    const handleButtonClick = (section) => {
      setSelectedSection(section);
    };

  
    return (
      <div className="navbar">
        <div className="feed"><a href="/"><img src={feed} alt="" />Лента</a></div>
        <div className="create"><a href="/create"><img src={plus} alt="" />Создать</a></div>
        <div className="profile"><a href="/profile"><img src={boy} alt="" />Про</a></div>
      </div>
    );
  }
  
  export default NavBar;

