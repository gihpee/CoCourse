import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import boyS from '../assets/feedback/boyS.svg'
import thumbS from '../assets/feedback/thumbS.svg'
import calendarS from '../assets/feedback/calendarS.svg'
import hashS from '../assets/feedback/hashS.svg'
import "./Feedback.css";

function FeedbackUser() {

    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/user?id=${id}`);
            const data = await response.json();
            
            if (data[0].feedback) {
                setFeedbacks(data[0].feedback);
            }
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCourses();
    }, [id])

    var totalRate = 0;
    var averageRate = 0;

    if (feedbacks.length > 0) {
        for (var i = 0; i < feedbacks.length; i++) {
            totalRate += parseFloat(feedbacks[i].rate);
        }

        averageRate = totalRate / feedbacks.length;
        averageRate = Math.round(averageRate * 100) / 100;
    }

    const cards = feedbacks.map((item, index) => {
        return (<div className="card_feedback" id={index}>
                    <div className="points">
                        <div className="point"><img src={boyS} alt='' style={{ marginRight: '10px' }}/>{item.user}</div>
                        <div className="point"><img src={thumbS} alt='' style={{ marginRight: '10px' }}/><b>{item.review}</b></div>
                        <div className="point"><img src={hashS} alt='' style={{ marginRight: '10px' }}/>{item.course}</div>
                        <div className="point"><img src={calendarS} alt='' style={{ marginRight: '10px' }}/>{item.date}</div>
                    </div>
                </div>)
    })

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                    <div className="fb_billet">Отзывы</div>
                </div>
                <span>Отзывы</span>
                <div className="feedback" style={{width: '100%'}}>
                    <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
                    <div className="row_grad_l">
                        <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
                </div>
                {cards.length > 0 ? cards : <p>Пока нет ни одного отзыва</p>}
            </div>;
}
export default FeedbackUser;