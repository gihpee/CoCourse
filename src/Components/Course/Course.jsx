import React from "react";
import hash from '../assets/course/hash.svg'
import calend from '../assets/course/calender.svg'
import chat from '../assets/course/chat.svg'
import star from '../assets/course/star.svg'
import circle from '../assets/course/circle.svg'
import nb from '../assets/course/notebook.svg'
import boyS from '../assets/course/boy-small.svg'
import nbS from '../assets/course/nb-small.svg'
import hashS from '../assets/course/hash-small.svg'
import chartS from '../assets/course/chart-small.svg'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./Course.css";


function Course() {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://commoncourse.io/getcourse?id=${id}`)
            const result = await response.json();

            const response_user = await fetch(`https://commoncourse.io/user?id=${result[0].user}`)
            const result_user = await response_user.json();
            
            setData(result);
            setUserData(result_user);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [id]);

    if (data.length === 0) {
        return <p>Loading...</p>; // или что-то другое, пока данные загружаются
    }

    const topics = data[0].topics.map((item, index) => {
        return (
            <>
                <input type="radio" name="acor" id={index} />
                <label for={index}><img src={hash} alt="" />{item.topic}</label>
                <div className="acor-body">
                    <span>{item.desc}</span>
                </div>
            </>
        )
    })

    const subjects = data[0].subjects.map((item, index) => {
        return (
            <div className="billet" key={index}>
                <img src={hash} alt='' />
                <p>{item}</p>
            </div>
        )
    })

    var totalRate = 0;
    var averageRate = 0;

    if (data[0].feedback.length > 0) {
        for (var i = 0; i < data[0].feedback.length; i++) {
            totalRate += parseFloat(data[0].feedback[i].rate);
        }

        averageRate = totalRate / data[0].feedback.length;
        averageRate = Math.round(averageRate * 100) / 100;
    }

    var total_user_Rate = 0;
    var average_user_Rate = 0;

    if (userData[0].feedback)
    {
        if (userData[0].feedback.length > 0) {
            for (var j = 0; j < userData[0].feedback.length; j++) {
                total_user_Rate += parseFloat(userData[0].feedback[j].rate);
            }

            average_user_Rate = total_user_Rate / userData[0].feedback.length;
            average_user_Rate = Math.round(average_user_Rate * 100) / 100;
        }
    }

    return <>
            <div className="prev" style={{backgroundImage: `url(${data[0].image})`}}>
                <p>{ data[0].name }</p>
                <div className="prev_date"><img src={calend} alt='' />{ data[0].date }</div>
            </div>
            <div className="back_btn" onClick={() => navigate(`/`)}></div>
            <div className="getContact_container">
                <a href={`https://t.me/${userData[0].username}`} className="billet">
                    <img src={chat} alt='' />
                    <p>Get contact</p>
                </a>
            </div>
            <span>Отзывы</span>
            <div className="feedback">
                <Link to={`/course-feedback/${id}`}>
                <div className="rate">{20 * averageRate > 50 ? <p>{averageRate}</p> : <p style={{color: 'white'}}>{averageRate}</p>}</div>
                <div className="row_grad_l">
                    <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                </div>
                </Link>
                <Link to={`/send-feedback/${id}`}>
                    <div className="billet">
                        <img src={star} alt='' />
                        <p>Оставить отзыв</p>
                    </div>
                </Link>
            </div>
            <div className="about">
                <span>Университет</span>
                <div className="billet">
                    <img src={nb} alt='' />
                    <p>{data[0].university}</p>
                </div>
                <span>Курс</span>
                <div className="billet">
                    <img src={circle} alt='' />
                    <p>{data[0].course}</p>
                </div>
                <span>Описание</span>
                <div className="description">
                    <p>{data[0].description}</p>
                </div>
                <span>Предметы</span>
                {subjects}
            </div>
            <span style={{marginBottom: '0px'}}>Содержание</span>
            <div className="acor-container">
                { topics }
            </div>
            <span style={{marginTop: '8px'}}>Ментор</span>
            <div className="card_mentor">
            <div className="rate">{20 * average_user_Rate > 50 ? <p>{average_user_Rate}</p> : <p style={{color: 'white'}}>{average_user_Rate}</p>}</div>
            <div className="row_grad_l">
                <div className="grad_l" style={{width: `calc((100% / 5) * ${average_user_Rate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${average_user_Rate}))`}}></div>
            </div>
                <Link to={`/user/${userData[0].id}`} className="card_wp">
                    <div style={{width: '78px', height: '78px', marginLeft: '8px', borderRadius: '32px', border: '1px solid black', backgroundImage: `url(${userData[0].photo_url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                    <div className="points_user">
                        <div className="point_user"><img src={boyS} alt='' style={{ marginRight: '10px' }}/><b>{userData[0].username}</b></div>
                        <div className="point_user"><img src={nbS} alt='' style={{ marginRight: '10px' }}/>{userData[0].university}</div>
                        <div className="point_user"><img src={hashS} alt='' style={{ marginRight: '10px' }}/>{(userData[0].subjects).join(', ')}</div>
                        <div className="point_user"><img src={chartS} alt='' style={{ marginRight: '10px' }}/>{userData[0].course}</div>
                    </div>
                </Link>
            </div>
        </>
}

export default Course;