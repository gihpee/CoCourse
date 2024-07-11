import React from "react";
import photo_url from '../assets/profile/avatar.png'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import MainButton from '@twa-dev/mainbutton';
import { useTonAddress } from '@tonconnect/ui-react';

function Home() {
  window.scrollTo(0, 0)
  const { id, first_name, last_name, username } = window.Telegram.WebApp.initDataUnsafe.user;
  console.log(window.Telegram.WebApp.initDataUnsafe.user)
  const userFriendlyAddress = useTonAddress(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  var usrname = id;
  if (username) {
    usrname = username;
  }

  const checkWallet = () => {
    if (!userFriendlyAddress) {
      setModalOpen(true);
    }
    else {
      navigate('/create-course')
    }
  };

  const handleOkBtnClick = () => {
    setModalOpen(false);
  }

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
        const response = await fetch(`https://commoncourse.io/usercoursewd?id=${id}`);
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

      if (item.feedback) {

        if (item.feedback.length > 0) {
          for (var i = 0; i < item.feedback.length; i++) {
            totalRate += parseFloat(item.feedback[i].rate);
          }

        averageRate = totalRate / item.feedback.length;
        averageRate = Math.round(averageRate * 100) / 100;
        }
      } else {
        averageRate = 0;
      } 

      return (
        <Link to={`/edit-course/${item.id}`} key={index} className="course_card">
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
            <div className="price">{item.price} RUB</div>
            <div className="status_container">
              {!item.is_draft && <div className="student_amount">{item.amount}</div>}
              {item.is_draft ? <div className="course_status">Черновик</div> : <div className="course_status">Мой</div>}
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
          <div className="top_panel">
                <div className="top_panel_back_btn" onClick={() => navigate(`/`)}></div>
                <Link to={`/edit-profile/${userData.id}`} className="edit_btn"></Link>
            </div>
          <div className="prev" style={{backgroundImage: `url(${userData.photo_url})`, marginTop: '-56px'}}>
            <p style={{marginTop: '312px'}}>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
            {/*<Link to={`/edit-profile/${userData.id}`} className="edit_container">
              <div className="billet">
                <img src={pencil} alt='' />
                <p>Редактор</p>
              </div>
              </Link>*/}
          <div className="edit_container">
            <span>Отзывы</span>
            <Link to={`/user-feedback/${userData.id}`} className="feedback" style={{width: '100%'}}>
                      <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
                      <div className="row_grad_l">
                          <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                      </div>
                  </Link>
            </div>

            {modalOpen && (
            <div className="modal" style={{height: '140px', marginTop: '-140px'}}>
                <div className="modal-content">
                    <p>Для создания курса необходимо подключить кошелек</p>
                    <button className='modal_btn' onClick={handleOkBtnClick}>Ок</button>
                </div>
            </div>
            )}

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
            
            <span>Курс</span>
            <div className="select_col">
                <div className="select">
                {userData.course ? (<div className="selected_row"> {userData.course} </div>) : (<p>Не указано</p>)}
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
                {userCourses.length > 0 ? userCourses : <p>Вы пока не опубликовали ни один курс</p>}
            </div>

            <MainButton text="CОЗДАТЬ КУРС" onClick={checkWallet} />
        </>;
}

export default Home;
