import React, { useEffect } from "react";
import plus from '../assets/create/plus.svg'
import "./Create.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTonAddress } from '@tonconnect/ui-react';


function Create() {
  window.scrollTo(0, 0)
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  const [coursesData, setCoursesData] = useState([]);
  const userFriendlyAddress = useTonAddress();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/usercourse?id=${id}`);
        const result = await response.json();

        setCoursesData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
  }, [id])

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

  function formatDate(dateString) {
    const parts = dateString.split('-');
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2].slice(2);
    return `${day}.${month}.${year}`;
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

  return <div style={{minHeight: '100vh'}}>
      <div className="create_button" onClick={checkWallet}>
        <div className="billet_cb">
          <img src={plus} alt='' />
          <p>Создать курс</p>
        </div>
      </div>
      <div className="column">
      {modalOpen && (
            <div className="modal" style={{height: '140px', marginTop: '-120px'}}>
                <div className="modal-content">
                    <p>Для создания курса необходимо подключить кошелек</p>
                    <button className='modal_btn' onClick={handleOkBtnClick}>Ок</button>
                </div>
            </div>
        )}
      {userCourses}
      </div>
      </div>;
}

export default Create;