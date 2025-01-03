import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Feedback.css";

function FeedbackUser() {
    window.scrollTo(0, 0)

    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch(`https://comncourse.ru/api/get-user/?id=${id}`);
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

    const cards = feedbacks.map((item, index) => {
        return (<div className="course_card" id={index} style={{paddingTop: '0px'}}>
                  <div className="card_mentor">
                      <div className="card_wp" style={{backgroundColor: 'black', width: 'calc(100% - 16px)'}}>
                          <div style={{width: '40px', height: '40px', marginLeft: '8px', borderRadius: '8px', backgroundImage: `url(https://comncourse.ru${item.user.photo_url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                          <div className="points_user">
                              <div className="point_user" style={{fontFamily: 'NeueMachina', fontSize: '16px', color: 'white'}}><b>{item.user.first_name + ' ' + item.user.last_name}</b></div>
                              <div className="point_user">{item.user.university}</div>
                          </div>
                      </div>
                  </div>
                  <div className="card_info" style={{paddingTop: '0px'}}>
                    <div className="row_grad_l">
                      <div className="grad_l" style={{width: `calc((100% / 5) * ${item.rate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${item.rate}))`}}></div>
                    </div>
                    <div style={{width: 'calc(100% - 16px)', backgroundColor: 'black', height: '16px', borderRadius: '16px', zIndex: '-10', marginTop: '-16px'}}></div>
                  </div>
                  <p style={{marginTop: '8px', width: 'calc(100% - 16px)', marginBottom: '8px'}}>{item.review}</p>
              </div>)
    })

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                </div>
                <span style={{marginBottom: '8px'}}>Отзывы</span>
                {cards.length > 0 ? cards : <p>Пока нет ни одного отзыва</p>}
            </div>;
}
export default FeedbackUser;