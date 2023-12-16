import React from "react";
import feed from '../assets/navbar/feed.svg'
import plus from '../assets/navbar/plus.svg'
import boy from '../assets/navbar/boy.svg'
import feedN from '../assets/navbar/feedN.svg'
import plusN from '../assets/navbar/plusN.svg'
import boyN from '../assets/navbar/boyN.svg'
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const NavBar = () => {
    const location = useLocation();

    const isActive = (pathname) => {
      return location.pathname === pathname;
    };

    return (
      <div className="navbar">
        <div className="feed"><Link to='/'>{isActive('/') ? <img src={feed} alt="" /> : <img src={feedN} alt="" />}Лента</Link></div>
        <div className="create"><Link to='/create'>{isActive('/create') ? <img src={plus} alt="" /> : <img src={plusN} alt="" />}Создать</Link></div>
        <div className="profile"><Link to='/profile'>{isActive('/profile') ? <img src={boy} alt="" /> : <img src={boyN} alt="" />}Про</Link></div>
      </div>
    );
  }
  
  export default NavBar;

