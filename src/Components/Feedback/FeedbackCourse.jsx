import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import boyS from '../assets/feedback/boyS.svg'
import calendarS from '../assets/feedback/calendarS.svg'
import hashS from '../assets/feedback/hashS.svg'
import starS from '../assets/feedback/sstar.svg'
import { useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';
import "./Feedback.css";

function FeedbackCourse() {
    window.scrollTo(0, 0)

    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/getcourse?id=${id}`);
            const data = await response.json();
    
            setFeedbacks(data[0].feedback);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCourses();
    }, [id])

    const cards = feedbacks.map((item, index) => {
        return (<div className="card_feedback" id={index}>
                    <div className="points" style={{paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px'}}>
                        <div className="point"><img src={starS} alt='' style={{ marginRight: '10px' }}/><b>{item.review}</b></div>
                        <div className="point"><img src={boyS} alt='' style={{ marginRight: '10px' }}/>{item.user}</div>
                        <div className="point"><img src={hashS} alt='' style={{ marginRight: '10px' }}/>{item.course}</div>
                        <div className="point"><img src={calendarS} alt='' style={{ marginRight: '10px' }}/>{item.date}</div>
                    </div>
                </div>)
    })

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => navigate(`/course/${id}`)}></div>
                </div>
                <span>Отзывы</span>
                {cards.length > 0 ? cards : <p>Пока нет ни одного отзыва</p>}
                <MainButton text="Оставить отзыв" onClick={() => window.location.href = `/send-feedback/${id}`} />
            </div>;
}
export default FeedbackCourse;