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
            const response = await fetch(`https://comncourse.ru/api/get-last-channel/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
              });
            const result = await response.json();
    
            if (result.chat_id) {
                setChannelId(result.chat_id)
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        const intervalId = setInterval(fetchChannel, 1000);

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
        <MainButton text="ПОДКЛЮЧИТЬ КАНАЛ" onClick={handleButtonClick} />
    </>
}

export default ConnectBot;