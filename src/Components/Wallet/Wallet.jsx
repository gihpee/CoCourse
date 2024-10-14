import React, { useEffect } from "react";
import { TonConnectButton } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Wallet.css";


function Wallet() {
    const navigate = useNavigate();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;
    //const id = 478969308;
    const [coursesPaid, setCoursesPaid] = useState([]);
    const [coursesSelled, setCoursesSelled] = useState([]);

    const [comn, setComn] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://commoncourse.io/api/user-transactions/?id=${id}`)
            const result = await response.json();
            
            setCoursesPaid(result.paid_courses);
            setCoursesSelled(result.selled_courses);
            setComn(result.comn);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [id]);

    function formatDate(dateString) {
        const parts = dateString.split('-');
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2].slice(2);
        return `${day}.${month}.${year}`;
    }
    
    const allTransactions = [...coursesPaid, ...coursesSelled]

    const transactions = allTransactions.map((item, index) => {
        var t_type = '';

        if (coursesPaid.some(transaction => transaction.id === item.id)) {
            t_type = 'Покупка';
        } else {
            t_type = 'Продажа';
        }

        return (
          <Link to={`/transaction/${item.id}`} className="transaction_card">
            <div className="points" style={{backgroundColor: 'black', borderRadius: '8px', paddingBottom: '8px'}}>
                <div className="point_t" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px'}}><b>{item.course.name}</b></div>
                <div className="point_t" style={{color: '#AAAAAA', fontSize: '14px'}}>{item.course.university}</div>
                <div className="point_t"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px'}}>{formatDate(item.course.date)}</div>
            </div>
            <div className="points" style={{marginTop: '0px'}}>
                <div className="point" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px', marginLeft: '0px'}}><b>{t_type}</b></div>
                <div className="point" style={{color: '#AAAAAA', fontSize: '14px', marginLeft: '0px'}}>{item.method}</div>
                <div className="point"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px', marginLeft: '0px'}}>{formatDate(item.date)}</div>
            </div>
            
            <div className="t_price_status" style={{marginBottom: '8px'}}>
                <div className="t_price">{item.price} RUB</div>
                <div className="course_status">Успешно</div>
            </div>
            
          </Link>
        )
      })

    return (
        <>
        <div className="back_btn" onClick={() => navigate(`/`)}></div>
        <div className="column" style={{minHeight: '100vh'}}>
            <span style={{marginTop: '20px'}}>Кошелек</span>
            <TonConnectButton style={{marginBottom: '8px'}}/>

            <div className="pricecourse_container" style={{height: 'auto', paddingTop: '8px', paddingBottom: '8px', marginBottom: '8px'}}>
                <div className="course_price">{comn}<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> COMN</span></div>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Токены COMN начисляются за продажи и покупки курсов через нашу платформу.</span>
            </div>

            {/*<button onClick={() => init()}>test</button>*/}

            <span>История транзакций</span>
            {transactions}

        </div>
        </>
    );
}

export default Wallet;