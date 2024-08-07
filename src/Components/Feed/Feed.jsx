import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Feed.css";


function Feed() {
  window.scrollTo(0, 0)
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  console.log(window.Telegram.WebApp.initData)
  //const { id } = 10;
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userCourses, setUserCourses] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const filteredData = data.filter((course) =>
      (course.name.toLowerCase().includes(inputValue.toLowerCase()) || course.username.toLowerCase().includes(inputValue.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };

  const filteredDataWithMain = filteredData.reduce((acc, obj) => {
    if (obj.id === 79) {
      acc.unshift(obj);
    } else {
      acc.push(obj);
    }
    return acc
  }, [])

  const handleUniChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://commoncourse.io/api/get-courses/');
        const result = await response.json();
        result.reverse();

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserCoursesData = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/api/user-data/`);
        const result = await response.json();

        setUserCourses(result.bought_courses);
        setCoursesData(result.created_courses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserCoursesData();
  }, [id]);

  const appCourses = filteredDataWithMain.map((item, index) => {

    var totalRate = 0;
    var averageRate = 0;

    if (item.feedback.length > 0) {
        for (var i = 0; i < item.feedback.length; i++) {
            totalRate += parseFloat(item.feedback[i].rate);
        }

        averageRate = totalRate / item.feedback.length;
        averageRate = Math.round(averageRate * 100) / 100;
    }

    return (
      <Link to={`/course/${item.id}`} key={index} className="course_card">
        <div className="course_img" style={{backgroundImage: `url(https://commoncourse.io${item.image})`}}></div>
        <div className="card_info">
          <div className="row_grad_l">
            <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
          </div>
          <div style={{width: 'calc(100% - 16px)', backgroundColor: 'black', height: '16px', borderRadius: '16px', zIndex: '-10', marginTop: '-16px'}}></div>
          <div className="points">
            <div className="point" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px'}}><b>{item.name}</b></div>
            <div className="point" style={{color: '#AAAAAA', fontSize: '14px'}}>{item.university}</div>
            <div className="point"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px'}}>{formatDate(item.date)}</div>
          </div>
          <div className="price_container">
            <div className="price">{item.price} RUB</div>
            <div className="status_container">
              <div className="student_amount">{item.amount_of_students}</div>
              {userCourses.some(course => course.course_id === item.id) && <div className="course_status">Куплено</div>}
              {coursesData.some(course => course.id === item.id) && <div className="course_status">Мой</div>}
            </div>
          </div>
        </div>
      </Link>
    )
  })

  return <div className="column" style={{minHeight: '100vh'}}>
      <div className="top_panel" style={{columnGap: '8px'}}>
          <Link to={`/profile`} className="profille_btn"></Link>
        <input
          className="billet_search"
          onChange={handleUniChange}
          placeholder="Введите название курса или ник автора"
          value={inputValue}
        />
            <Link to={`/wallet`} className="wallet_btn"></Link>
        </div>
      {appCourses}
      </div>;
}

export default Feed;
