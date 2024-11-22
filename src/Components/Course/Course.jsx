import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';
import nf from '../assets/course/nfeedarrow.svg';
import toggle from '../assets/profile/toggle.svg'
import redWallet from '../assets/course/red-wallet.svg'
import blueWallet from '../assets/course/blue-wallet.svg'
import "./Course.css";


function Course() {
    window.scrollTo(0, 0)
    const { cid } = useParams();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;
    const [data, setData] = useState([]);

    const [userCourses, setUserCourses] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (cid){
                const response = await fetch(`https://commoncourse.io/api/get-courses/?id=${cid}`)
                const result = await response.json();
                
                setData(result);
                console.log(result)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [cid]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://commoncourse.io/api/user-data/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                  },
                });
        
                const data = await response.json();
        
                if (data) {
                    setUserCourses(data.bought_courses);
                }
        
              } catch (error) {
                console.error('Ошибка при запросе к серверу:', error);
              }
        };
    
        fetchUserData();
    }, [id]);

    if (data.length === 0) {
        return <div className="loading"></div>; // или что-то другое, пока данные загружаются
    }

    var paid = userCourses?.some(course => course.id === Number(cid));

    const topics = data.topics.map((item, index) => {
        return (
            <div key={index} className="accordion-item">
                <input type="checkbox" name="acor" id={`acor${index}`} className="accordion-checkbox" />
                <label htmlFor={`acor${index}`} className="accordion-label">
                    {item.topic}
                    <img src={toggle} className="icon" alt="Toggle" />
                </label>
                <div className="accordion-body">
                    <p>{item.desc}</p>
                </div>
            </div>
        );
    });

    var totalRate = 0;
    var averageRate = 0;

    if (data.feedback.length > 0) {
        for (var i = 0; i < data.feedback.length; i++) {
            totalRate += parseFloat(data.feedback[i].rate);
        }

        averageRate = totalRate / data.feedback.length;
        averageRate = Math.round(averageRate * 100) / 100;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
      };

    return <>
            <div className="top_panel">
                <div className="top_panel_back_btn" onClick={() => navigate(`/`)}></div>
                    <div className="status_container" style={{padding: '8px', height: '32px', alignItems: 'center', borderRadius: '24px', background: 'rgba(16,16,16, 0.7)', backdropFilter: 'blur(10px)', right: '8px'}}>
                        <div className="student_amount" style={{borderRadius: '16px'}}>{data.amount_of_students}</div>
                        {paid && <div className="course_status" style={{borderRadius: '16px'}}>Куплено</div>}
                    </div>
            </div>
            <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${data.channel.photo})`, marginTop: '-56px'}}>
                <p>{ data.channel.name }</p>
            </div>
            <div className="getContact_container" style={{paddingBottom: '0px'}}>
                <span>ЦЕНА</span>
                <div className="pricecourse_container">
                    <div className="course_price">{data.price}<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> RUB</span></div>
                    <span style={{margin: '0px', width: '100%'}}>AD ID: {data.id}</span>
                </div>
                <div className="payment_method" style={{marginTop: '8px', border: 'none'}}>
                    <img src={blueWallet} alt='' />
                    <p style={{flexGrow: '1'}}>Оплата криптой</p>
                    <div className="discount_amount">-10%</div>
                </div>
                <div className="payment_method" style={{border: 'none'}}>
                    <img src={redWallet} alt='' />
                    <p style={{flexGrow: '1'}}>Оплата картой</p>
                </div>
            </div>
            <span style={{marginTop: '16px'}}>Отзывы</span>
                <Link to={`/course-feedback/${cid}`} className="nfeedback" style={{width: 'calc(100% - 24px)', marginBottom: '8px', marginLeft: '8px'}}>
                <p>{averageRate.toFixed(1)}</p>
                    <div className="nrow_grad_l" style={{width: 'calc(100% - 120px)'}}>
                        <div className="ngrad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
                    <img src={nf} alt=''/>
                </Link>

            <span style={{marginTop: '8px'}}>Описание</span>
            <div className="select_col">
            <div className="select" style={{height: 'auto', whiteSpace: 'pre-line'}}>
                <p>{data.description}</p>
            </div>
            </div>

            <span style={{marginTop: '8px'}}>Университет</span>
            <div className="select_col">
                <div className="select">
                {data.university.length > 0 ? (<div className="selected_row"> {data.university} </div>) : (<p>Не указано</p>)}
                </div>
            </div>

            <span style={{marginTop: '8px'}}>Предмет</span>
            <div className="select_col">
                <div className="select">
                {data.subject ?
                <div className="selected_row">{data.subject}</div> : (<p>Не указано</p>)}
                </div>
            </div>

            <span style={{marginBottom: '8px', marginTop: '8px'}}>Содержание</span>
            {topics.length > 0 ? (<div className="accordion">{ topics }</div>) : (<p style={{alignSelf: 'center'}}>Не указано</p>)}
 
            <span style={{marginBottom: '0px'}}>Ментор</span>
            <div className="card_mentor">
                <Link to={`/user/${data.user.user_id}`} className="card_wp">
                    <div style={{width: '40px', height: '40px', marginLeft: '8px', borderRadius: '8px', backgroundImage: `url(https://commoncourse.io${data.user.photo_url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                    <div className="points_user">
                        <div className="point_user" style={{fontFamily: 'NeueMachina', fontSize: '16px', color: 'white'}}><b>{data.user.first_name + ' ' + data.user.last_name}</b></div>
                        <div className="point_user">{data.user.university}</div>
                    </div>
                </Link>
            </div>
            
            <span style={{marginTop: '8px'}}>Дата публикации</span>
            <div className="field">
                <p>{formatDate(data.date)}</p>
            </div>

            {paid ? 
            <MainButton text="К УЧЕБЕ" onClick={() => window.location.href = data.channel.url} />
            : <MainButton text="ПРИСОЕДИНИТЬСЯ" onClick={() => navigate('/buy-course', { state: data })} />}
        </>
}

export default Course;