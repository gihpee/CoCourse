import React from "react";
import cam from "../assets/feed/camera.svg"
import photo_url from '../assets/profile/avatar.png'
import calendarS from '../assets/feedback/calendarS.svg'
import hashS from "../assets/feed/hash.svg"
import nbS from "../assets/feed/notebook.svg"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Profile.css";

function Home() {
  window.scrollTo(0, 0)
  const { id, first_name, last_name, username } = window.Telegram.WebApp.initDataUnsafe.user;
  console.log(window.Telegram.WebApp.initDataUnsafe.user)

  var usrname = id;
  if (username) {
    usrname = username;
  }


  const [userData, setUserData] = useState({});
  const [coursesData, setCoursesData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/user?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при запросе к серверу');
        }

        const data = await response.json();

        if (data.length > 0) {
          setUserData(data[0]);
          setFeedbacks(data[0].feedback)
        }
        else {
          setUserData({id: id, first_name: first_name, last_name: last_name, photo_url: photo_url, university: '', course: '', description: '', subjects: []})

          await fetch('https://commoncourse.io/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({id, first_name, last_name, username: usrname, photo_url, course: '', description: '', university: '', subjects: [], feedback: []}),
            })
            .then(response => {
              return response.text();
          })
        }

      } catch (error) {
        console.error('Ошибка при запросе к серверу:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/usercourse?id=${id}`);
        const result = await response.json();

        setCoursesData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchCourses();
  }, [id, first_name, last_name, username, usrname]);

  var userCourses;

  if (coursesData) {
    userCourses = coursesData.map((item, index) => {

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
          <div className="course_img" style={{backgroundImage: `url(${item.image})`}}></div>
            <div className="card_info">
            <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
            <div className="row_grad_l">
              <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
            </div>
            <div style={{width: 'calc(100% - 16px)', backgroundColor: 'black', height: '32px', borderRadius: '16px', zIndex: '-10', marginTop: '-32px'}}></div>
                <div className="points">
                    <div className="point"><img src={cam} alt='' style={{ marginRight: '10px' }}/><b>{item.name}</b></div>
                    <div className="point"><img src={nbS} alt='' style={{ marginRight: '10px' }}/>{item.university}</div>
                    <div className="point"><img src={hashS} alt='' style={{ marginRight: '10px' }}/>{(item.subjects).join(', ')}</div>
                    <div className="point"><img src={calendarS} alt='' style={{ marginRight: '10px' }}/>{item.date}</div>
                </div>
            </div>
        </Link>
      )
    })
  }

  var totalRate = 0;
  var averageRate = 0;

  if (feedbacks) {
    if (feedbacks.length > 0) {
      for (var i = 0; i < feedbacks.length; i++) {
           totalRate += parseFloat(feedbacks[i].rate);
      }

      averageRate = totalRate / feedbacks.length;
      averageRate = Math.round(averageRate * 100) / 100;
    }
  }

  return <>
          <Link to={`/edit-profile/${userData.id}`} className="edit_btn"></Link>
          <div className="prev" style={{backgroundImage: `url(${userData.photo_url})`, marginTop: '-56px'}}>
            <p style={{marginTop: '312px'}}>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
            {/*<Link to={`/edit-profile/${userData.id}`} className="edit_container">
              <div className="billet">
                <img src={pencil} alt='' />
                <p>Редактор</p>
              </div>
              </Link>*/}
          <span>Отзывы</span>
          <Link to={`/user-feedback/${userData.id}`}>
                <div className="feedback">
                    <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
                    <div className="row_grad_l">
                        <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
                </div>
            </Link>

            <span>Биография</span>
            <div className="select_col">
            <div className="select_bio" style={{height: 'auto', whiteSpace: 'pre-line'}}>
                <p>{userData.description ? userData.description : "Не указано"}</p>
            </div>
            </div>

            <span>Университет</span>
            <div className="select_col">
                <div className="select_univ">
                {userData.university ? (<div className="selected_row"> {userData.university} </div>) : (<p>Не указано</p>)}
                </div>
            </div>
            
            <span>Курс</span>
            <div className="select_col">
                <div className="select_course">
                {userData.course ? (<div className="selected_row"> {userData.course} </div>) : (<p>Не указано</p>)}
                </div>
            </div>

            <span>Предметы</span>
            <div className="select_col">
                <div className="select_subject">
                {userData.subjects ? (userData.subjects.map((option) => (
                <div className="selected_row" key={option}>{option}</div> ))) : (<p>Не указано</p>)}
                </div>
            </div>

            <div className="about">
                <span>Курсы</span>
                {userCourses.length > 0 ? userCourses : <p>Вы пока не опубликовали ни один курс</p>}
            </div>
        </>;
}

export default Home;
