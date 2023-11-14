import React, { useState } from 'react';
import Profile from './Components/Profile/Profile';
import Create from './Components/Create/Create';
import Feed from './Components/Feed/Feed';
import "./App.css";

function App() {
  const [selectedSection, setSelectedSection] = useState('profile');

  const handleButtonClick = (section) => {
    if (section !== selectedSection) {
      setSelectedSection(section);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'profile':
        return <Profile />;
      case 'create':
        return <Create />;
      case 'feed':
        return <Feed />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>{renderSection()}</div>
      <div className="bottom-navigation">
        <button onClick={() => handleButtonClick('profile')}>Про</button>
        <button onClick={() => handleButtonClick('create')}>Создать</button>
        <button onClick={() => handleButtonClick('feed')}>Лента</button>
      </div>
    </div>
  );
}

export default App;





