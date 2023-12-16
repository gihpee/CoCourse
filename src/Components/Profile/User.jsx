import React from "react";
import nb from '../assets/profile/nb.svg'
import chart from '../assets/profile/chart.svg'
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
          <div className="back_btn" onClick={() => {window.history.back()}}></div>
          <div className="getContact_container">
            <a href={`t.me/${userData[0].username}`}><div className="billet">
                    <img src={chat} alt='' />
                    <p>Get contact</p>
                </div></a>
            </div>
          <span>Отзывы</span>
          <Link to={`/user-feedback/${userData.id}`}>
                <div className="feedback">
                    <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
                    <div className="row_grad_l">
                        <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
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
                {userCourses}
            </div>
        </>;
}

export default User;