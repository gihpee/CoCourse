import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Profile.css";

function User() {
    window.scrollTo(0, 0)
    const { id } = useParams();

    const [userData, setUserData] = useState({});
    const [coursesData, setCoursesData] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    function formatDate(dateString) {
      const parts = dateString.split('-');
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2].slice(2);
      return `${day}.${month}.${year}`;
    }

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
            <div className="price">2,888 RUB</div>
            <div className="status_container">
              <div className="student_amount">10</div>
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
          <div className="prev" style={{backgroundImage: `url(${userData.photo_url})`, marginTop: '-56px'}}>
            <p style={{marginTop: '312px'}}>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
          <div className="getContact_container">
          <span>Отзывы</span>
          <Link to={`/user-feedback/${userData.id}`} className="feedback" style={{width: '100%'}}>
                    <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
                    <div className="row_grad_l">
                        <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
            </Link>
            </div>

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
                {userCourses.length > 0 ? userCourses : <p>Пользователь пока не опубликовал ни один курс</p>}
            </div>

            <a href={`https://t.me/${userData.username}`} className="user_course_action">
                <button href={`https://t.me/${userData.username}`} className='user_course_action_btn'>НАПИСАТЬ В ТЕЛЕГРАМ</button>
              </a>
        </>;
}

export default User;