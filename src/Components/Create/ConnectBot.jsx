import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';

function ConnectBot() {
    const navigate = useNavigate();

    const { id } = window.Telegram.WebApp.initDataUnsafe.user;

    const [channelId, setChannelId] = useState('');

    let tg = window.Telegram;

    useEffect(() => {
        const fetchChannel = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/api/get-last-channel/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
              });
            const result = await response.json();
    
            console.log(result)
            if (result) {
                let date = new Date(result.date);
                const moscowDate = new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' });
                const currentDate = new Date(moscowDate);
                const differenceInMs = Math.abs(currentDate - date);
                const differenceInMinutes = differenceInMs / (1000 * 60);

                if (differenceInMinutes <= 3) {
                    setChannelId(result.chat_id)
                }
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        const intervalId = setInterval(fetchChannel, 5000);

        return () => clearInterval(intervalId);
    }, [id])

    useEffect(() => {
        if (channelId !== '') {
            navigate(`/create-course/${channelId}`)
        }
    }, [channelId, navigate]);

    const handleButtonClick = () => {
        const botUsername = "CoCourseBot";
        const link = `https://t.me/${botUsername}?startchannel`;
        tg.WebApp.openTelegramLink(link);
    };

    return <> 
         <div className="back_btn" onClick={() => navigate(`/profile`)}></div>
        <div className="column">
            <div className="connectbot"><p>ПОДКЛЮЧИТЬ БОТА</p>
            <div className="ctext">Добавьте @CoCourseBot в качестве администратора в ваш канал и предоставьте разрешения.<br /><br />Бот не будет ничего публиковать или удалять без вашего согласия.</div>
            </div>
        </div>
        <MainButton text="Подключить канал" onClick={handleButtonClick} />
    </>
}

export default ConnectBot;