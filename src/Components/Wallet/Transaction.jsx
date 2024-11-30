import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainButton from '@twa-dev/mainbutton';
import "./Wallet.css";

function Transaction() {
    const navigate = useNavigate();
    const { tid } = useParams();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://comncourse.ru/api/get-transaction/?id=${tid}`)
            const result = await response.json();
            
            setData(result)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [tid]);

    var totalRate = 0;
    var averageRate = 0;

    if (data?.course.feedback.length > 0) {
        for (var i = 0; i < data.course.feedback.length; i++) {
            totalRate += parseFloat(data.course.feedback[i].rate);
        }

        averageRate = totalRate / data.course.feedback.length;
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
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="column" style={{minHeight: '100vh'}}>
            <span style={{marginTop: '20px'}}>Объявление</span>
            
            <div className="course_card">
                <div className="course_img" style={{backgroundImage: `url(https://comncourse.ru${data?.course.channel.photo})`}}></div>
                <div className="card_info">
                <div className="row_grad_l">
                    <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                </div>
                <div style={{width: 'calc(100% - 16px)', backgroundColor: 'black', height: '16px', borderRadius: '16px', zIndex: '-10', marginTop: '-16px'}}></div>
                <div className="points">
                    <div className="point" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px'}}><b>{data?.course.channel.name}</b></div>
                    <div className="point" style={{color: '#AAAAAA', fontSize: '14px'}}>{data?.course.university}</div>
                    <div className="point"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px'}}>{formatDate(data?.course.date)}</div>
                </div>
                <div className="price_container">
                    <div className="price">{data?.course.price} RUB</div>
                    <div className="status_container">
                    <div className="student_amount">{data?.course.amount_of_students}</div>
                    </div>
                </div>
                </div>
            </div>

            <span style={{marginTop: '8px'}}>Тип транзакции</span>
            <div className="field" style={{marginTop: '0'}}>
                {data?.return_status === 0 && (data?.buyer === id ? <p>Покупка</p> : <p>Продажа</p>)}
                {data?.return_status === 1 && (<p>Возврат на рассмотрении</p>)}
                {data?.return_status === 2 && (data?.buyer === id ? <p>Возврат (в вашу пользу)</p> : <p>Возврат (не в вашу пользу)</p>)}
            </div>

            <span style={{marginTop: '8px'}}>Способ оплаты</span>
            <div className="field" style={{marginTop: '0'}}>
                <p>{data?.method}</p>
                {/*<div className="discount_amount">-10%</div>*/}
            </div>

            <span style={{marginTop: '8px'}}>Итог</span>
            <div className="pricecourse_container">
                <div className="course_price">{data?.price}<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> RUB</span></div>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Вознаграждение продавца</span>
            </div>

            <span style={{marginTop: '8px'}}>Дата транзакции</span>
            <div className="field" style={{marginTop: '0'}}>
                <p>{formatDate(data?.date)}</p>
            </div>
        </div>
        {data?.buyer === id && new Date() - new Date(data?.date) <= 7 * 24 * 60 * 60 * 1000 && data?.method === 'Card' && data?.return_status === 0 && <MainButton text="ОФОРМИТЬ ВОЗВРАТ" onClick={() => navigate('/return-form', { state: { data: data } })} />}
    </>
}

export default Transaction;