import React from "react";
import "./Feedback.css";

function Feedback() {

    const appCourses = data.map((item, index) => {

        return (
            <div className="card_mentor" key={index}>
                <div className="rate"><img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '38%'}}/>{user.rate}</div>
                <div className="points">
                    <div className="point"><img src={boyS} alt='' style={{ marginRight: '10px' }}/><b>{user.name}</b></div>
                    <div className="point"><img src={nbS} alt='' style={{ marginRight: '10px' }}/>{user.univ}</div>
                    <div className="point"><img src={hashS} alt='' style={{ marginRight: '10px' }}/>{user.subjects}</div>
                    <div className="point"><img src={chartS} alt='' style={{ marginRight: '10px' }}/>{user.course}</div>
                </div>
            </div>
        )
    })

    return <div className="column">
            <div className="feedback_top">
                <div className="back_btn" onClick={() => {window.history.back()}}></div>
                <div className="fb_billet">Отзывы</div>
            </div>
            <span>Отзывы</span>
        </div>;
}
export default Feedback;