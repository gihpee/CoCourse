import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonAddress } from '@tonconnect/ui-react';
//import { beginCell, toNano, Address } from '@ton/ton'
import TonWeb from "tonweb";
import { mnemonicToSeed } from 'tonweb-mnemonic';
import MainButton from '@twa-dev/mainbutton';
import nf from '../assets/course/nfeedarrow.svg';
import "./Course.css";


function Course() {
    window.scrollTo(0, 0)
    const { cid } = useParams();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;

    const [data, setData] = useState([]);

    const [userCourses, setUserCourses] = useState([]);
    const [coursesData, setCoursesData] = useState([]);

    const [exchangeRate, setExchangeRate] = useState(null);

    const userFriendlyAddress = useTonAddress(false);
    
    const navigate = useNavigate();

    var currentDate = new Date();

    const [tonConnectUI, setOptions] = useTonConnectUI();
    setOptions({ language: 'ru' });

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
                    setCoursesData(data.created_courses);
                    setUserCourses(data.bought_courses);
                }
        
              } catch (error) {
                console.error('Ошибка при запросе к серверу:', error);
              }
        };
    
        fetchUserData();
    }, [id]);

    useEffect(() => {
        // Функция для получения данных с API
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

    if (data.length === 0) {
        return <div className="loading"></div>; // или что-то другое, пока данные загружаются
    }

    var paid = userCourses.some(course => course.id === Number(cid));
    var owned = coursesData.some(course => course.id === Number(cid));

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 60 sec
        messages: [
            {
                address: data.address,
                amount: String(Math.floor((data.price / exchangeRate) * 1000000000)),
                // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            }
        ]
    }

    const sendJettons = async (WALLET2_ADDRESS) => {
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: 'e23336de32c099c638e61fd08702fb31aa00c8e5a9bd83483bac536b26654367'}));

        const words = ['arrange', 'deal', 'lava', 'man', 'detail', 'lend', 'describe', 'shoulder', 'mule', 'chuckle', 'route', 'dress', 'lift', 'leg', 'pull', 'ski', 'syrup', 'asset', 'jazz', 'actual', 'state', 'issue', 'shuffle', 'power'];

        const seed = await mnemonicToSeed(words);
        const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(seed);

        const WalletClass = tonweb.wallet.all['v4R2'];
        const wallet = new WalletClass(tonweb.provider, {
            publicKey: keyPair.publicKey,
            wc: 0
        });

        const walletAddress = await wallet.getAddress();
        console.log('wallet address=', walletAddress.toString(true, true, true));
    

        const JETTON_WALLET_ADDRESS = 'EQBQQLR2Are9JDYK-3OtbxgmCN6k9gxR7fhBwUdmF4bw-ShM';
        console.log('jettonWalletAddress=', JETTON_WALLET_ADDRESS);

        const {JettonMinter, JettonWallet} = TonWeb.token.jetton;

        console.log(JettonMinter);

        const jettonWallet = new JettonWallet(tonweb.provider, {
            address: JETTON_WALLET_ADDRESS
        });

        const seqno = (await wallet.methods.seqno().call()) || 0;
        console.log({seqno})

        const transfer = async () => {
            console.log(
                await wallet.methods.transfer({
                    secretKey: keyPair.secretKey,
                    toAddress: JETTON_WALLET_ADDRESS,
                    amount: TonWeb.utils.toNano('0.05'),
                    seqno: seqno,
                    payload: await jettonWallet.createTransferBody({
                        jettonAmount: TonWeb.utils.toNano('100'),
                        toAddress: new TonWeb.utils.Address(WALLET2_ADDRESS),
                        forwardAmount: TonWeb.utils.toNano('0.01'),
                        forwardPayload: new TextEncoder().encode('gift'),
                        responseAddress: walletAddress
                    }),
                    sendMode: 3,
                }).send()
            );
        }

        await transfer();
    }

    const handlePay = async () => {
        try {
            await tonConnectUI.sendTransaction(myTransaction);
        } catch(e) {
            console.log(e);
            return 0;
        }

        await sendJettons(userFriendlyAddress);
        await sendJettons(data[0].address);

        paid = true;
        let amount = data[0].amount + 1

        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        let date = day + '-' + month + '-' + year
        let seller_id = data[0].user
  
        await fetch('https://commoncourse.io/success-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
  
            body: JSON.stringify({id, cid, amount, date, seller_id}),
        })
          
      };

    const topics = data.topics.map((item, index) => {
        return (
            <>
                <input type="checkbox" name="acor" id={index} />
                <label for={index}>{item.topic}</label>
                <div className="acor-body">
                    <span>{item.desc}</span>
                </div>
            </>
        )
    })

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
                        {owned && <div className="course_status" style={{borderRadius: '16px'}}>Мой</div>}
                    </div>
            </div>
            <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${data.channel.photo})`, marginTop: '-56px'}}>
                <p>{ data.channel.name }</p>
            </div>
            <div className="getContact_container">
                <span>ЦЕНА</span>
                <div className="pricecourse_container">
                    <div className="course_price">{data.price}<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> RUB</span></div>
                    <span style={{margin: '0px', width: '100%'}}>Оплата через TON кошелек.</span>
                </div>
            </div>
            <span>Отзывы</span>
                <Link to={`/course-feedback/${cid}`} className="nfeedback" style={{width: 'calc(100% - 24px)', marginBottom: '8px', marginLeft: '8px'}}>
                <p>{averageRate.toFixed(1)}</p>
                    <div className="nrow_grad_l" style={{width: 'calc(100% - 120px)'}}>
                        <div className="ngrad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
                    <img src={nf} alt=''/>
                </Link>

            <span>Описание</span>
            <div className="select_col">
            <div className="select" style={{height: 'auto', whiteSpace: 'pre-line'}}>
                <p>{data.description}</p>
            </div>
            </div>

            <span>Университет</span>
            <div className="select_col">
                <div className="select">
                {data.university.length > 0 ? (<div className="selected_row"> {data.university} </div>) : (<p>Не указано</p>)}
                </div>
            </div>

            <span>Предмет</span>
            <div className="select_col">
                <div className="select">
                {data.subject ?
                <div className="selected_row">{data.subject}</div> : (<p>Не указано</p>)}
                </div>
            </div>

            <span style={{marginBottom: '0px'}}>Содержание</span>
            {topics.length > 0 ? (<div className="acor-container">{ topics }</div>) : (<p style={{alignSelf: 'center'}}>Не указано</p>)}
 
            <span style={{marginTop: '8px', marginBottom: '0px'}}>Ментор</span>
            <div className="card_mentor">
                <Link to={`/user/${data.user.user_id}`} className="card_wp">
                    <div style={{width: '40px', height: '40px', marginLeft: '8px', borderRadius: '8px', backgroundImage: `url(https://commoncourse.io${data.user.photo_url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                    <div className="points_user">
                        <div className="point_user" style={{fontFamily: 'NeueMachina', fontSize: '16px', color: 'white'}}><b>{data.user.first_name + ' ' + data.user.last_name}</b></div>
                        <div className="point_user">{data.user.university}</div>
                    </div>
                </Link>
            </div>
            
            <span>Дата публикации</span>
            <div className="field">
                <p>{formatDate(data.date)}</p>
            </div>

            {paid ? 
            <MainButton text="К УЧЕБЕ" onClick={() => window.location.href = data.channel.url} />
            : !owned && 
            <MainButton text="КУПИТЬ" onClick={handlePay} />}
        </>
}

export default Course;