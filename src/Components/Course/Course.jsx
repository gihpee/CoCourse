import React from "react";
import calend from '../assets/course/calender.svg'
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
    const [userData, setUserData] = useState([]);

    const [userCourses, setUserCourses] = useState([]);
    const [coursesData, setCoursesData] = useState([]);

    const [exchangeRate, setExchangeRate] = useState(null);

    const userFriendlyAddress = useTonAddress(false);
    
    const navigate = useNavigate();

    var currentDate = new Date();

    const [tonConnectUI, setOptions] = useTonConnectUI();
    setOptions({ language: 'ru' });
    /*const { Telegram } = useTelegram();

    useEffect(() => {
        if (paid) {
          Telegram.MainButton.setParams({
            text: 'К УЧЕБЕ',
            is_visible: true,
            is_active: true,
            onClick: () => window.location.href = data[0].channel_url
          });
        } else if (!owned) {
          Telegram.MainButton.setParams({
            text: 'КУПИТЬ',
            is_visible: true,
            is_active: true,
            onClick: handlePay
          });
        }
        
        return () => {
          Telegram.MainButton.hide();
          Telegram.MainButton.offClick();
        };
      }, [paid, owned, data, handlePay, Telegram.MainButton]);*/

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`https://commoncourse.io/getcourse?id=${cid}`)
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
    }, [cid]);

    useEffect(() => {
        const fetchUserCoursesData = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/user-paid-courses?id=${id}`);
            const result = await response.json();
    
            setUserCourses(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchUserCoursesData();
    }, [id]);
    
    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/user-made-courses?id=${id}`);
            const result = await response.json();
    
            setCoursesData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCourses();
    }, [id])

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

    var paid = userCourses.some(course => course.course_id === Number(cid));
    var owned = coursesData.some(course => course.id === Number(cid));

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 60 sec
        messages: [
            {
                address: data[0].address,
                amount: String(Math.floor((data[0].price / exchangeRate) * 1000000000)),
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

    const topics = data[0].topics.map((item, index) => {
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

    if (data[0].feedback.length > 0) {
        for (var i = 0; i < data[0].feedback.length; i++) {
            totalRate += parseFloat(data[0].feedback[i].rate);
        }

        averageRate = totalRate / data[0].feedback.length;
        averageRate = Math.round(averageRate * 100) / 100;
    }


    if (cid === '79') {
        userData[0].username = 'HowToCommonCourse';
        data[0].price = 0;
        paid = true;
    }

    return <>
            <div className="top_panel">
                <div className="top_panel_back_btn" onClick={() => navigate(`/`)}></div>
                    <div className="status_container" style={{padding: '8px', height: '32px', alignItems: 'center', borderRadius: '24px', background: 'rgba(16,16,16, 0.7)', backdropFilter: 'blur(10px)', right: '8px'}}>
                        <div className="student_amount" style={{borderRadius: '16px'}}>{data[0].amount}</div>
                        {paid && <div className="course_status" style={{borderRadius: '16px'}}>Куплено</div>}
                        {owned && <div className="course_status" style={{borderRadius: '16px'}}>Мой</div>}
                    </div>
            </div>
            <div className="prev" style={{backgroundImage: `url(${data[0].image})`, marginTop: '-56px'}}>
                <p>{ data[0].name }</p>
                <div className="prev_date"><img src={calend} alt='' />{ data[0].date }</div>
            </div>
            <div className="getContact_container">
                <span>ЦЕНА</span>
                <div className="pricecourse_container">
                    <div className="course_price">{data[0].price}<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> RUB</span></div>
                    <span style={{margin: '0px', width: '100%'}}>Оплата через TON кошелек.</span>
                </div>
            </div>
            <span>Отзывы</span>
            <div className="select_col">
                <Link to={`/course-feedback/${cid}`} className="nfeedback">
                <p>{averageRate.toFixed(1)}</p>
                    <div className="nrow_grad_l">
                        <div className="ngrad_l" style={{width: `calc((100% / 5) * ${averageRate})`, background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`}}></div>
                    </div>
                    <img src={nf} alt=''/>
                </Link>
            </div>

            <span>Описание</span>
            <div className="select_col">
            <div className="select" style={{height: 'auto', whiteSpace: 'pre-line'}}>
                <p>{data[0].description}</p>
            </div>
            </div>

            <span>Университет</span>
            <div className="select_col">
                <div className="select">
                {data[0].university.length > 0 ? (<div className="selected_row"> {data[0].university} </div>) : (<p>Не указано</p>)}
                </div>
            </div>
            
            <span>Курс</span>
            <div className="select_col">
                <div className="select">
                {data[0].course.length > 0 ? (<div className="selected_row"> {data[0].course} </div>) : (<p>Не указано</p>)}
                </div>
            </div>

            <span>Предмет</span>
            <div className="select_col">
                <div className="select">
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
            
            {/*{paid ? 
            <a href={data[0].channel_url} className="user_course_action">
                <button href={data[0].channel_url} className='user_course_action_btn'>К УЧЕБЕ</button>
              </a>
            : !owned && 
            <div className="user_course_action">
                <button onClick={handlePay} className='user_course_action_btn'>
                    КУПИТЬ
                </button>
            </div>}*/}

            {paid ? 
            <MainButton text="К УЧЕБЕ" onClick={() => window.location.href = data[0].channel_url} />
            : !owned && 
            <MainButton text="КУПИТЬ" onClick={handlePay} />}
        </>
}

export default Course;