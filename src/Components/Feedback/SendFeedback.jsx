import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./SendFeedback.css";

function SendFeedback() {
  const { id } = useParams();
  const { username } = window.Telegram.WebApp.initDataUnsafe.user;
  const [userId, setUserId] = useState(0)
  const [courseName, setCourseName] = useState("")

  var currentDate = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/getcourse?id=${id}`);
        const data = await response.json();

        setUserId(data[0].user);
        setCourseName(data[0].name);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
}, [id])

  const [sliderValue, setSliderValue] = useState(3);
  const [revValue, setRevValue] = useState("")

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    console.log(event.target.value)
  };

  const handleRevChange = (e) => {
    const {value} = e.target;
    setRevValue(value); 
  };

  const handlePublish = () => {
    console.log(sliderValue, revValue);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    let date = day + '-' + month + '-' + year

    let feedback = [{rate: sliderValue, 
                    review: revValue, 
                    user: username, 
                    course: courseName, 
                    date: date}];
    fetch('https://commoncourse.io/sf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({id, userId, feedback}),
      }).then(navigate(`/course/${id}`))
  }

  return <div className="column">
          <div className="feedback_top">
            <div className="fback_btn" onClick={() => {window.history.back()}}></div>
            <div className="fb_billet">Отзывы</div>
          </div>
          <span>Понравилась ли работать с заказчиком?</span>
          <div className="slider-container">
            <input type="range" min="1" max="5" value={sliderValue} step="1" id="myRange" onChange={handleSliderChange} />
          </div>
          <div className="row_grad">
            <div className="grad" style={{width: `calc(48px * ${sliderValue} + (((100% - 240px) / 4) * ${sliderValue - 1}))`, 
                                  background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(100% * ${6 - sliderValue}))`}}></div>
          </div>
          <div className="fb_bg">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <textarea 
                className="fb_text" 
                placeholder="Оставить комментарий. Это очень поможет развитию нашего сервиса."
                name="fb_text"
                onChange={handleRevChange}></textarea>
          <div className="publish" style={{marginTop: '25px'}}>
            <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
          </div>
          </div>;
}

export default SendFeedback;