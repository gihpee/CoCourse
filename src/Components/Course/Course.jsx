import React from "react";
import hash from '../assets/course/hash.svg'
import calend from '../assets/course/calender.svg'
import star from '../assets/course/star.svg'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./Course.css";


function Course() {
    window.scrollTo(0, 0)
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
        return <div className="loading"></div>; // или что-то другое, пока данные загружаются
    }

    const topics = data[0].topics.map((item, index) => {
        return (
            <>
                <input type="checkbox" name="acor" id={index} />
                <label for={index}><img src={hash} alt="" />{item.topic}</label>
                <div className="acor-body">
                    <span>{item.desc}</span>
                </div>
            </>
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


    if (id === '79') {
        userData[0].username = 'HowToCommonCourse';
    }

    return <>
            <div className="top_panel">
                <div className="top_panel_back_btn" onClick={() => navigate(`/`)}></div>
                    <div className="status_container" style={{padding: '8px', height: '32px', alignItems: 'center', borderRadius: '24px', background: 'rgba(16,16,16, 0.7)', backdropFilter: 'blur(10px)', right: '8px'}}>
                        <div className="student_amount" style={{borderRadius: '16px'}}>10</div>
                        <div className="course_status" style={{borderRadius: '16px'}}>Куплено</div>
                    </div>
            </div>
            <div className="prev" style={{backgroundImage: `url(${data[0].image})`, marginTop: '-56px'}}>
                <p>{ data[0].name }</p>
                <div className="prev_date"><img src={calend} alt='' />{ data[0].date }</div>
            </div>
            <div className="getContact_container">
                <span>ЦЕНА</span>
                <div className="pricecourse_container">
                    <div className="course_price">2888 <span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}>RUB</span></div>
                    <span style={{margin: '0px', width: '100%'}}>Оплата через TON кошелек.</span>
                </div>
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

            <span>Описание</span>
            <div className="select_col">
            <div className="select_bio" style={{height: 'auto', whiteSpace: 'pre-line'}}>
                <p>{data[0].description}</p>
            </div>
            </div>

            <span>Университет</span>
            <div className="select_col">
                <div className="select_univ">
                {data[0].university.length > 0 ? (<div className="selected_row"> {data[0].university} </div>) : (<p>Не указано</p>)}
                </div>
            </div>
            
            <span>Курс</span>
            <div className="select_col">
                <div className="select_course">
                {data[0].course.length > 0 ? (<div className="selected_row"> {data[0].course} </div>) : (<p>Не указано</p>)}
                </div>
            </div>

            <span>Предмет</span>
            <div className="select_col">
                <div className="select_subject">
                {data[0].subjects.length > 0 ? (data[0].subjects.map((option) => (
                <div className="selected_row" key={option}>{option}</div> ))) : (<p>Не указано</p>)}
                </div>
            </div>

            <span style={{marginBottom: '0px'}}>Содержание</span>
            {topics.length > 0 ? (<div className="acor-container">{ topics }</div>) : (<p style={{alignSelf: 'center'}}>Не указано</p>)}
 
            <span style={{marginTop: '8px'}}>Ментор</span>
            <div className="card_mentor">
                <Link to={`/user/${userData[0].id}`} className="card_wp">
                    <div style={{width: '40px', height: '40px', marginLeft: '8px', borderRadius: '8px', backgroundImage: `url(${userData[0].photo_url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                    <div className="points_user">
                        <div className="point_user" style={{fontFamily: 'NeueMachina', fontSize: '16px', color: 'white'}}><b>{userData[0].first_name + ' ' + userData[0].last_name}</b></div>
                        <div className="point_user">{userData[0].university}</div>
                    </div>
                </Link>
            </div>

            <a href={`/`} className="user_course_action">
                <button href={`/`} className='user_course_action_btn'>К УЧЕБЕ</button>
              </a>
        </>
}

export default Course;