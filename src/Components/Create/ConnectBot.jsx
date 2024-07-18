import React from "react";
import { useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';

function ConnectBot() {
    const navigate = useNavigate();

    return <> 
         <div className="back_btn" onClick={() => navigate(`/course/`)}></div>
        <div className="column">
            <div className="connectbot"><p>ПОДКЛЮЧИТЬ БОТА</p>
            <div className="ctext">Добавьте @CoCourseBot в качестве администратора в ваш канал и предоставьте разрешения.<br /><br />Бот не будет ничего публиковать или удалять без вашего согласия.</div>
            </div>
        </div>
        <MainButton text="Подключить канал" onClick={() => window.location.href = `https://t.me/CoCourseBot?startchannel=1`} />
    </>
}

export default ConnectBot;