import React, { useEffect } from "react";
import cam from "../assets/feed/camera.svg"
import chart from "../assets/feed/chart.svg"
import hash from "../assets/feed/hash.svg"
import nb from "../assets/feed/notebook.svg"
import star from '../assets/feed/star.svg'
import plus from '../assets/create/plus.svg'
import "./Create.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Create() {
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

  const appCourses = coursesData.map((item) => {
    return (
      <Link to={`/edit-course/${item.id}`} key={item.id} className="course_card">
        <div className="course_img"></div>
        <div className="card_info">
          <div className="rate"><img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '42.5%'}}/>{item.rate}</div>
          <div className="points">
            <div className="point"><img src={cam} alt='' style={{ marginRight: '10px' }}/><b>{item.name}</b></div>
            <div className="point"><img src={chart} alt='' style={{ marginRight: '10px' }}/>{item.university}</div>
            <div className="point"><img src={hash} alt='' style={{ marginRight: '10px' }}/>{item.tags}</div>
            <div className="point"><img src={nb} alt='' style={{ marginRight: '10px' }}/>{item.course}</div>
          </div>
        </div>
      </Link>
    )
  })

  return <>
      <div className="create_button"><a href='create-course'>
        <div className="billet">
          <img src={plus} alt='' />
          <p>Создать курс</p>
        </div>
      </a></div>
      <div>
      {appCourses}
      </div>
      </>;
}

export default Create;