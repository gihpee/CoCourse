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
  const [feedbacks, setFeedbacks] = useState([])

  var currentDate = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/getcourse?id=${id}`);
        const data = await response.json();

        setUserId(data[0].user);
        setCourseName(data[0].name);
        setFeedbacks(data[0].feedback);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
}, [id])

  const userFeedback = feedbacks.find(item => item.user === username)

  const [sliderValue, setSliderValue] = useState(3);
  const [revValue, setRevValue] = useState("")

  if (userFeedback) {
    setSliderValue(userFeedback.rate)
    setRevValue(userFeedback.review)
  }

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    console.log(event.target.value)
  };

  const handleRevChange = (e) => {
    const {value, type} = e.target;

    if (type === 'textarea') {
        if (e.target.scrollHeight === 32) {
          e.target.style.height = '24px';
        } else {
          e.target.style.height = '24px';
          e.target.style.height = e.target.scrollHeight + 'px';
        }
      }

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

    let updatedFeedbacks = []

    if (userFeedback) {
      updatedFeedbacks = feedbacks.map(item => item.user === username ? feedback : item);
    } else {
      updatedFeedbacks = feedbacks.concat(feedback);
    }

    fetch('https://commoncourse.io/sf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({id, userId, updatedFeedbacks, feedback}),
      }).then(navigate(`/course/${id}`))
  }

  return <div className="column">
          <div className="feedback_top">
            <div className="fback_btn" onClick={() => navigate(`/course/${id}`)}></div>
            <div className="fb_billet">Отзывы</div>
          </div>
          <span>ОЦЕНКА*</span>
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

          <span style={{marginTop: '12px'}}>КОММЕНТАРИЙ*</span>
          <div className="select_col">
              <div className="select_fb">
                <textarea className='bio_textarea' type='text' placeholder="Поделись своим мнением..." name="fb_text" value={revValue} onChange={handleRevChange} />
              </div>
          </div>

          <div className="publish" style={{marginTop: '25px'}}>
            <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
          </div>
          </div>;
}

export default SendFeedback;