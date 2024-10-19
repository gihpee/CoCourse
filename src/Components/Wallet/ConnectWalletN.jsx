import React from "react";
import cwallet from '../assets/profile/cwallet.png'
import MainButton from '@twa-dev/mainbutton';
import { useTonConnectUI } from '@tonconnect/ui-react';

function ConnectWalletN() { 
    const [tonConnectUI, setOptions] = useTonConnectUI();

    setOptions({ language: 'ru' });

    return <>
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="prev" style={{backgroundImage: `url(${cwallet})`, marginTop: '-56px'}}>
              <p style={{marginTop: '312px'}}>Подключите кошелек</p>
            </div>
        <div className="getContact_container"></div>

        <div className="column">
            <span>Зачем это нужно?</span>
            <div className="pricecourse_container" style={{marginLeft: 'auto', marginRight: 'auto', height: '60px'}}>
                <div className="course_price">+100<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> COMN</span></div>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Подключи кошелек, чтобы получать вознаграждение криптой за продажи курсов</span>
            </div>

            <span style={{textTransform: 'none', marginTop: '8px'}}>Необходимо только продавцам!</span>

            <MainButton text="Продолжить" onClick={() => tonConnectUI.openModal()} />
        </div>
    </>
}

export default ConnectWalletN;