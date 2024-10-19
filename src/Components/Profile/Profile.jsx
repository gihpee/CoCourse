import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import MainButton from '@twa-dev/mainbutton';
import { useTonAddress } from '@tonconnect/ui-react';
import nf from '../assets/course/nfeedarrow.svg';

function Home() {
  window.scrollTo(0, 0)
  const { id, first_name, last_name, username } = window.Telegram.WebApp.initDataUnsafe.user;
  const userFriendlyAddress = useTonAddress(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalLink, setModalLink] = useState("");
  const [modalButton, setModalButton] = useState("");

  const navigate = useNavigate();

  var usrname = id;
  if (username) {
    usrname = username;
  }

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
        const response = await fetch(`https://commoncourse.io/api/user-data/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при запросе к серверу');
        }

        const data = await response.json();

        if (data) {
          setUserData(data);
          setFeedbacks(data.feedback)
          setCoursesData(data.created_courses)
        }

      } catch (error) {
        console.error('Ошибка при запросе к серверу:', error);
      }
    };

    fetchData();
  }, [id, first_name, last_name, username, usrname]);

  const checkWallet = () => {
    if (!userFriendlyAddress && !userData.verifyed) {
      setModalText("Для создания курса необходимо пройти верификацию и подключить выплаты");
      setModalLink("/connect-wallet")
      setModalButton("Пройти")
      setModalOpen(true);
    }
    else if (!userFriendlyAddress) {
      setModalText("Для создания курса необходимо подключить выплаты");
      setModalLink("/connect-wallet")
      setModalButton("Подключить")
      setModalOpen(true);
    }
    else if (!userData.verifyed) {
      setModalText("Для создания курса необходимо пройти верификацию");
      setModalLink("/verification")
      setModalButton("Пройти")
      setModalOpen(true);
    }
    else {
      navigate('/connect-bot')
    }
  };

  const handleOkBtnClick = () => {
    setModalOpen(false);
  }

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
              {!item.is_draft && <div className="student_amount">{item.amount_of_students}</div>}
              {item.is_draft ? <div className="course_status">Черновик</div> : item.on_moderation && <div className="course_status">На модерации</div>}
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

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  if (isEmptyObject(userData)) {
    return <div className="loading"></div>;
  }

  console.log(userData)

  return <>
          <div className="top_panel">
                <div className="top_panel_back_btn" onClick={() => navigate(`/`)}></div>
                <Link to={`/edit-profile/${userData.id}`} className="edit_btn"></Link>
            </div>
          <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${userData.photo_url})`, marginTop: '-56px'}}>
            <p style={{marginTop: '312px'}}>{ first_name + ' ' + last_name }</p>
          </div>
            {/*<Link to={`/edit-profile/${userData.id}`} className="edit_container">
              <div className="billet">
                <img src={pencil} alt='' />
                <p>Редактор</p>
              </div>
              </Link>*/}
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

            {modalOpen && (
            <div className="modal" style={{height: '140px', marginTop: '-140px'}}>
                <div className="modal-content">
                    <p>{modalText}</p>
                    <button className='modal_btn' onClick={handleOkBtnClick}>Позже</button>
                    <button className='modal_btn' onClick={() => navigate(modalLink)}>{modalButton}</button>
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
