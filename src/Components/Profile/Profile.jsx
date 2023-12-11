import React from "react";
import pencil from '../assets/profile/pencil.svg'
import star from '../assets/profile/star.svg'
import nb from '../assets/profile/nb.svg'
import chart from '../assets/profile/chart.svg'
import hash from '../assets/profile/hash.svg'
import { Link } from 'react-router-dom';
import cam from "../assets/feed/camera.svg"
import { useState, useEffect } from 'react';
import "./Profile.css";

function Home() {
  const { id, first_name, last_name, username, photo_url } = window.Telegram.WebApp.initDataUnsafe.user;

  const [userData, setUserData] = useState({});
  const [coursesData, setCoursesData] = useState([]);

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
  }, [id, first_name, last_name, username, photo_url]);

  const userSubjects = userData.subjects.map((item, index) => {
    return (
      <div className="billet">
        <img src={hash} alt='' />
        <p>{item}</p>
      </div>
    )
  })

  const userCourses = coursesData.map((item, index) => {

    return (
      <Link to={`/course/${index}`} key={index} className="course_card">
        <div className="course_img" style={{backgroundImage: `url(${item.image})`}}></div>
        <div className="card_info">
          <div className="rate"><img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '42.5%'}}/>{item.rate}</div>
          <div className="points">
            <div className="point"><img src={cam} alt='' style={{ marginRight: '10px' }}/><b>{item.name}</b></div>
            <div className="point"><img src={chart} alt='' style={{ marginRight: '10px' }}/>{item.university}</div>
            <div className="point"><img src={hash} alt='' style={{ marginRight: '10px' }}/>{item.subjects}</div>
            <div className="point"><img src={nb} alt='' style={{ marginRight: '10px' }}/>{item.course}</div>
          </div>
        </div>
      </Link>
    )
  })

  return <>
          <div className="prev" style={{backgroundImage: `url(${userData.photo_url})`}}>
            <p>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
          <div className="edit_container">
            <div className="billet">
              <img src={pencil} alt='' />
              <p>Редактор</p>
            </div>
          </div>
          <span>Отзывы</span>
            <div className="feedback">
              <div className="rate">
                <img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '38%'}}/>
              </div>
            </div> 
            <div className="about">
                <span>Университет</span>
                <div className="billet">
                    <img src={nb} alt='' />
                    <p>{userData.university}</p>
                </div>
                <span>Курс</span>
                <div className="billet">
                    <img src={chart} alt='' />
                    <p>{userData.course}</p>
                </div>
                <span>Биография</span>
                <div className="description">
                    <p>{userData.description}</p>
                </div>
                <span>Предмет</span>
                {userSubjects}
                <span></span>
                {userCourses}
            </div>
        </>;
}

export default Home;
