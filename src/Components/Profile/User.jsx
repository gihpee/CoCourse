import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Profile.css";
import MainButton from '@twa-dev/mainbutton';
import nf from '../assets/course/nfeedarrow.svg';

function User() {
    window.scrollTo(0, 0)
    const { id } = useParams();

    const [userData, setUserData] = useState({});
    const [coursesData, setCoursesData] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();
    
      return `${day}.${month}.${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://commoncourse.io/api/get-user/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) {
            throw new Error('Ошибка при запросе к серверу');
            }

            const data = await response.json();

            setUserData(data);
            setCoursesData(data.created_courses);
            setFeedbacks(data.feedback)

        } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
        }
        };

        fetchData();
    }, [id]);

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
              <div className="course_status">Куплено</div>
            </div>
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
          <div className="back_btn" onClick={() => {window.history.back()}}></div>
          <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${userData.photo_url})`, marginTop: '-56px'}}>
            <p style={{marginTop: '312px'}}>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
          <div className="getContact_container">
          <span>Отзывы</span>
          <Link to={`/user-feedback/${userData.user_id}`} className="nfeedback">
                    <p>{averageRate.toFixed(1)}</p>
                    <div className="nrow_grad_l">
                        <div className="ngrad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
                    <img src={nf} alt=''/>
            </Link>
            </div>

            <span>Биография</span>
            <div className="select_col">
            <div className="select" style={{height: 'auto', whiteSpace: 'pre-line'}}>
                <p>{userData.description ? userData.description : "Не указано"}</p>
            </div>
            </div>

            <span>Университет</span>
            <div className="select_col">
                <div className="select">
                {userData.university ? (<div className="selected_row"> {userData.university} </div>) : (<p>Не указано</p>)}
                </div>
            </div>

            <span>Предметы</span>
            <div className="select_col">
                <div className="select">
                {userData.subjects ? (userData.subjects.map((option) => (
                <div className="selected_row" key={option}>{option}</div> ))) : (<p>Не указано</p>)}
                </div>
            </div>

            <div className="about">
                <span>Курсы</span>
                {userCourses.length > 0 ? userCourses : <p>Пользователь пока не опубликовал ни один курс</p>}
            </div>

            <MainButton text="НАПИСАТЬ В ТЕЛЕГРАМ" onClick={() => window.location.href = `https://t.me/${userData.username}`} />
        </>;
}

export default User;