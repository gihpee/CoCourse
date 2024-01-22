import React, { useEffect } from "react";
import cam from "../assets/feed/camera.svg"
import hash from "../assets/feed/hash.svg"
import calendarS from '../assets/feedback/calendarS.svg'
import nb from "../assets/feed/notebook.svg"
import plus from '../assets/create/plus.svg'
import "./Create.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Create() {
  window.scrollTo(0, 0)
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  const [coursesData, setCoursesData] = useState([]);

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
        <Link to={`/edit-course/${item.id}`} key={index} className="course_card">
          <div className="course_img" style={{backgroundImage: `url(${item.image})`}}></div>
            <div className="card_info">
            <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
            <div className="row_grad_l">
              <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
            </div>
            <div style={{width: 'calc(100% - 16px)', backgroundColor: 'black', height: '32px', borderRadius: '16px', zIndex: '-10', marginTop: '-32px'}}></div>
              <div className="points">
                <div className="point"><img src={cam} alt='' style={{ marginRight: '10px' }}/><b>{item.name}</b></div>
                <div className="point"><img src={nb} alt='' style={{ marginRight: '10px' }}/>{item.university}</div>
                <div className="point"><img src={hash} alt='' style={{ marginRight: '10px' }}/>{(item.subjects).join(', ')}</div>
                <div className="point"><img src={calendarS} alt='' style={{ marginRight: '10px' }}/>{item.date}</div>
              </div>
            </div>
        </Link>
      )
    })
  }

  return <div style={{minHeight: '100vh'}}>
      <div className="create_button"><a href='create-course'>
        <div className="billet" style={{background: 'rgba(16,16,16, 0.7)', backdropFilter: 'blur(10px)'}}>
          <img src={plus} alt='' />
          <p>Создать курс</p>
        </div>
      </a></div>
      <div className="column">
      {userCourses}
      </div>
      </div>;
}

export default Create;