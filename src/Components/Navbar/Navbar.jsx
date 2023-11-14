import React, { useState } from "react";
import "./Navbar.css";

const NavBar = () => {
    const [selectedSection, setSelectedSection] = useState(null);
  
    const handleButtonClick = (section) => {
      setSelectedSection(section);
    };

  
    return (
      <div className="bottom-navigation">
        <button onClick={() => handleButtonClick('profile')}>Про</button>
        <button onClick={() => handleButtonClick('create')}>Создать</button>
        <button onClick={() => handleButtonClick('feed')}>Лента</button>
      </div>
    );
  }
  
  export default NavBar;

