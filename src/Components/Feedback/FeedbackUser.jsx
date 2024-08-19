import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import boyS from '../assets/feedback/boyS.svg'
import calendarS from '../assets/feedback/calendarS.svg'
import starS from '../assets/feedback/sstar.svg'
import "./Feedback.css";

function FeedbackUser() {
    window.scrollTo(0, 0)

    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/api/get-user/?id=${id}`);
            const data = await response.json();
            
            if (data.feedback) {
                setFeedbacks(data.feedback);
            }
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCourses();
    }, [id])

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();
    
      return `${day}.${month}.${year}`;
    };

    const cards = feedbacks.map((item, index) => {
        return (<div className="card_feedback" id={index}>
                    <div className="points" style={{paddingTop: '8px', paddingBottom: '8px', paddingLeft: '8px'}}>
                        <div className="point"><img src={starS} alt='' style={{ marginRight: '10px' }}/><b>{item.review}</b></div>
                        <div className="point"><img src={boyS} alt='' style={{ marginRight: '10px' }}/>{item.user.username}</div>
                        <div className="point"><img src={calendarS} alt='' style={{ marginRight: '10px' }}/>{formatDate(item.date)}</div>
                    </div>
                </div>)
    })

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                </div>
                <span>Отзывы</span>
                {cards.length > 0 ? cards : <p>Пока нет ни одного отзыва</p>}
            </div>;
}
export default FeedbackUser;