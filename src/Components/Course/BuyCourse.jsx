import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useLocation } from "react-router-dom";
import { useTonAddress } from '@tonconnect/ui-react';
import MainButton from '@twa-dev/mainbutton';
import redWallet from '../assets/course/red-wallet.svg'
import blueWallet from '../assets/course/blue-wallet.svg'
import "./Course.css";


function BuyCourse() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;

    const data = location.state

    const [exchangeRate, setExchangeRate] = useState(null);
    const [paymentLink, setPaymentLink] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Card');

    const address = useTonAddress();

    /*useEffect(() => {
        if (address) {setPaymentMethod('Wallet')} else {setPaymentMethod('Card')}
    }, [address])*/

    const [tonConnectUI, setOptions] = useTonConnectUI();
    setOptions({ language: 'ru' });

    useEffect(() => {
        const fetchLink = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/api/get-payment-link/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },
              body: JSON.stringify({course_id: data.id, user_id: id}),
            });
    
            if (!response.ok) {
              throw new Error('Ошибка при запросе к серверу');
            }
    
            const resp = await response.json();
    
            if (resp) {
              setPaymentLink(resp.link)
            }
    
          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
        };
    
        fetchLink();
      }, [id, data]);

    useEffect(() => {
        const fetchExchangeRate = async () => {
          try {
            const response = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=rub');
            const data = await response.json();
            const rate = data.rates.TON.prices.RUB;
            setExchangeRate(rate);
          } catch (error) {
            console.error('Ошибка при получении данных с API:', error);
          }
        };
    
        fetchExchangeRate();
    }, []);

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 60 sec
        messages: [
            {
                address: data?.ton_address,
                amount: String(Math.floor((data?.price * 0.9 / exchangeRate) * 1000000000)),
                // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            }
        ]
    }

    const handlePay = async () => {
        if (paymentMethod === 'Wallet') {
            try {
                await tonConnectUI.sendTransaction(myTransaction);
            } catch(e) {
                console.log(e);
                return 0;
            }

            let cid = data.id
            let price = data.price * 0.9
            let method = 'TON Wallet'
            let baddress = address
            let saddress = data.ton_address
    
            await fetch('https://commoncourse.io/api/success-payment/', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `tma ${window.Telegram.WebApp.initData}`
                    },
    
                body: JSON.stringify({cid, price, method, baddress, saddress}),
            }).then(navigate(`/course/${data.id}`))
        } else {
            window.location.href = paymentLink;
        }
          
    };

    var totalRate = 0;
    var averageRate = 0;

    if (data?.feedback.length > 0) {
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
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="column" style={{minHeight: '100vh'}}>
            <span style={{marginTop: '20px'}}>Объявление</span>
            
            <div className="course_card">
                <div className="course_img" style={{backgroundImage: `url(https://commoncourse.io${data?.channel.photo})`}}></div>
                <div className="card_info">
                <div className="row_grad_l">
                    <div className="grad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                </div>
                <div style={{width: 'calc(100% - 16px)', backgroundColor: 'black', height: '16px', borderRadius: '16px', zIndex: '-10', marginTop: '-16px'}}></div>
                <div className="points">
                    <div className="point" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px'}}><b>{data?.name}</b></div>
                    <div className="point" style={{color: '#AAAAAA', fontSize: '14px'}}>{data?.university}</div>
                    <div className="point"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px'}}>{formatDate(data?.date)}</div>
                </div>
                <div className="price_container">
                    <div className="price">{data?.price} RUB</div>
                    <div className="status_container">
                    <div className="student_amount">{data?.amount_of_students}</div>
                    </div>
                </div>
                </div>
            </div>

            <span>Способ оплаты</span>
            {paymentMethod === 'Card' ?
            <div className="payment_method" style={{border: '1px solid #FF6117'}}>
                <img src={redWallet} alt='' />
                <p style={{flexGrow: '1'}}>Оплата картой</p>
            </div> : 
            <div className="payment_method" onClick={() => {setPaymentMethod('Card')}}>
                <img src={redWallet} alt='' />
                <p style={{flexGrow: '1'}}>Оплата картой</p>
            </div>}

            {address && (
                <>
            {paymentMethod === 'Wallet' ? 
            <div className="payment_method" style={{border: '1px solid #FF6117'}}>
                <img src={blueWallet} alt='' />
                <p style={{flexGrow: '1'}}>Оплата криптой</p>
                <div className="discount_amount">-10%</div>
            </div> : 
            <div className="payment_method" onClick={() => {setPaymentMethod('Wallet')}}>
                <img src={blueWallet} alt='' />
                <p style={{flexGrow: '1'}}>Оплата криптой</p>
                <div className="discount_amount">-10%</div>
            </div>}
            <span style={{textTransform: 'none'}}>При оплате через Кошелек комиссия платформы не взимается, 
                однако мы не предоставляем никаких гарантий возврата денежных средств.</span>
                </>)}

            <div className="pricecourse_container">
                <div className="course_price">{paymentMethod === 'Wallet' ? data?.price * 0.9 : data?.price}<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> RUB</span></div>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Вознаграждение продавца</span>
            </div>

            <MainButton text="ОПЛАТИТЬ" onClick={handlePay} />
        </div>
    </>
}

export default BuyCourse;