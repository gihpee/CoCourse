import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';

function ConnectBot() {
    const navigate = useNavigate();

    let tg = window.Telegram;
    const [channelId, setChannelId] = useState(null);

    useEffect(() => {

        window.Telegram.WebApp.onEvent('channel_connected', (channelInfo) => {
            setChannelId(channelInfo.id);
            console.log(channelId);
        });
    }, [channelId]);

    const handleButtonClick = () => {
        const botUsername = "CoCourseBot";
        const link = `https://t.me/${botUsername}?startchannel`;
        tg.WebApp.openTelegramLink(link);
    };

    return <> 
         <div className="back_btn" onClick={() => navigate(`/course/`)}></div>
        <div className="column">
            <div className="connectbot"><p>ПОДКЛЮЧИТЬ БОТА</p>
            <div className="ctext">Добавьте @CoCourseBot в качестве администратора в ваш канал и предоставьте разрешения.<br /><br />Бот не будет ничего публиковать или удалять без вашего согласия.</div>
            </div>
        </div>
        <MainButton text="Подключить канал" onClick={handleButtonClick} />
    </>
}

export default ConnectBot;