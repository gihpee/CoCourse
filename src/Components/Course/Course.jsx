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
import { useParams } from 'react-router-dom';
import "./Course.css";


const user = {
    name: 'name name',
    univ: 'HSE',
    subjects: 'Economics, Math',
    course: '1 курс, 1 семестр',
    rate: '4.4'
}


function Course() {
    const { index } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://80.90.189.96:3001/');
            const result = await response.json();

            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    if (data.length === 0) {
        return <p>Loading...</p>; // или что-то другое, пока данные загружаются
    }

    const topics = data[index].topics.map((item, index) => {
        return (
            <>
                <input type="radio" name="acor" id={index} />
                <label for={index}><img src={hash} alt="" />{item.topic}</label>
                <div className="acor-body">
                    <p>{item.desc}</p>
                </div>
            </>
        )
    })

    return <>
            <div className="prev" style={{backgroundImage: `url(${data[index].image})`}}>
                <p>{ data[index].name }</p>
                <div className="prev_date"><img src={calend} alt='' />{ data[index].date }</div>
            </div>
            <div className="getContact_container">
                <div className="billet">
                    <img src={chat} alt='' />
                    <p>Get contact</p>
                </div>
            </div>
            <span>Отзывы</span>
            <div className="feedback">
                <div className="rate">
                    <img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '38%'}}/>
                    {data[index].rate}
                </div>
                <Link to={`/send-feedback/${data[index].id}`}>
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
                    <p>{data[index].university}</p>
                </div>
                <span>Курс</span>
                <div className="billet">
                    <img src={circle} alt='' />
                    <p>{data[index].course}</p>
                </div>
                <span>Описание</span>
                <div className="description">
                    <p>{data[index].description}</p>
                </div>
                <span>Предмет</span>
                <div className="billet">
                    <img src={hash} alt='' />
                    <p>{data[index].subjects}</p>
                </div>
            </div>
            <span style={{marginBottom: '0px'}}>Содержание</span>
            <div className="acor-container">
                { topics }
            </div>
            <span style={{marginTop: '8px'}}>Ментор</span>
            <div className="card_mentor">
                <div className="rate"><img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '38%'}}/>{user.rate}</div>
                <div className="points">
                    <div className="point"><img src={boyS} alt='' style={{ marginRight: '10px' }}/><b>{user.name}</b></div>
                    <div className="point"><img src={nbS} alt='' style={{ marginRight: '10px' }}/>{user.univ}</div>
                    <div className="point"><img src={hashS} alt='' style={{ marginRight: '10px' }}/>{user.subjects}</div>
                    <div className="point"><img src={chartS} alt='' style={{ marginRight: '10px' }}/>{user.course}</div>
                </div>
            </div>
        </>
}

export default Course;