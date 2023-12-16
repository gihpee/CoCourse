import React from "react";
import star from '../assets/profile/star.svg'
import nb from '../assets/profile/nb.svg'
import chart from '../assets/profile/chart.svg'
import starF from '../assets/feed/star.svg'
import hash from '../assets/profile/hash.svg'
import cam from "../assets/feed/camera.svg"
import chat from '../assets/course/chat.svg'
import calendarS from '../assets/feedback/calendarS.svg'
import hashS from "../assets/feed/hash.svg"
import nbS from "../assets/feed/notebook.svg"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Profile.css";

function User() {
    const { id } = useParams();

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

            setUserData(data[0]);
            setFeedbacks(data[0].feedback)

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
    }, [id]);

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
            <p>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
          <div className="back_btn" onClick={() => {window.history.back()}}></div>
          <div className="getContact_container">
                <div className="billet">
                    <img src={chat} alt='' />
                    <p>Get contact</p>
                </div>
            </div>
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
                <span>Предметы</span>
                {userSubjects}
                <span>Курсы</span>
                {userCourses}
            </div>
        </>;
}

export default User;