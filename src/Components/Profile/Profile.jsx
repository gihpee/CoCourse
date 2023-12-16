import React from "react";
import pencil from '../assets/profile/pencil.svg'
import star from '../assets/profile/star.svg'
import nb from '../assets/profile/nb.svg'
import chart from '../assets/profile/chart.svg'
import hash from '../assets/profile/hash.svg'
import cam from "../assets/feed/camera.svg"
import photo_url from '../assets/profile/avatar.png'
import starF from '../assets/feed/star.svg'
import calendarS from '../assets/feedback/calendarS.svg'
import hashS from "../assets/feed/hash.svg"
import nbS from "../assets/feed/notebook.svg"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Profile.css";

function Home() {
  const { id, first_name, last_name, username } = window.Telegram.WebApp.initDataUnsafe.user;
  console.log(window.Telegram.WebApp.initDataUnsafe.user)


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
          setUserData({id: id, first_name: first_name, last_name: last_name, photo_url: photo_url, university: '', course: '', description: ''})

          await fetch('https://commoncourse.io/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({id, first_name, last_name, username, photo_url}),
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
  }, [id, first_name, last_name, username]);

  if (userData.length === 0 || coursesData.length === 0) {
    return <p>Loading...</p>; // или что-то другое, пока данные загружаются
  }

  var userSubjects;
  var userCourses;

  if (userData.subjects){
    userSubjects = userData.subjects.map((item, index) => {
      return (
        <div className="billet">
          <img src={hash} alt='' />
          <p>{item}</p>
        </div>
      )
    })
  }

  if (coursesData) {
    userCourses = coursesData.map((item, index) => {
      return (
        <Link to={`/course/${item.id}`} key={index} className="course_card">
          <div className="course_img" style={{backgroundImage: `url(${item.image})`}}></div>
            <div className="card_info">
                <div className="rate"><img src={starF} alt='' style={{ marginLeft: '2.5%', marginRight: '42.5%'}}/>{averageRate}</div>
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
          <div className="prev" style={{backgroundImage: `url(${userData.photo_url})`}}>
            <p style={{marginTop: '312px'}}>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
            <Link to={`/edit-profile/${userData.id}`} className="edit_container">
              <div className="billet">
                <img src={pencil} alt='' />
                <p>Редактор</p>
              </div>
            </Link>
          <span>Отзывы</span>
          <Link to={`/user-feedback/${userData.id}`}>
              <div className="feedback">
                <div className="rate">
                  <img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '38%'}}/>{averageRate}
                </div>
              </div> 
            </Link>
            <div className="about">
                <span>Университет</span>
                <div className="billet">
                    <img src={nb} alt='' />
                    <p>{userData.university ? userData.university : "Не указано"}</p>
                </div>
                <span>Курс</span>
                <div className="billet">
                    <img src={chart} alt='' />
                    <p>{userData.course ? userData.course : "Не указано"}</p>
                </div>
                <span>Биография</span>
                <div className="description">
                    <p>{userData.description ? userData.description : "Не указано"}</p>
                </div>
                <span>Предметы</span>
                {userSubjects ? userSubjects : <p>Не указано</p>}
                <span>Курсы</span>
                {userCourses ? userCourses : <p>Вы пока не опубликовали ни один курс</p>}
            </div>
        </>;
}

export default Home;
