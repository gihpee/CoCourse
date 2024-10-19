import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import cwallet from '../assets/profile/cwallet.png'
import MainButton from '@twa-dev/mainbutton';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonConnectModal } from '@tonconnect/ui-react';

function ConnectWallet() { 
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const { state } = useTonConnectModal();

    const navigate = useNavigate();
    setOptions({ language: 'ru' });

    useEffect(() => {
        if (state.status === 'closed' && state.closeReason === 'wallet-selected') {
            navigate('/verification')
        }
    }, [state, navigate])

    return <>
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

            <Link to={`/verification`} style={{textAlign: 'center', textDecoration: 'underline', position: 'absolute', bottom: '1%', margin: 'auto', textDecorationColor: 'initial', color: 'inherit'}}>
                <span style={{textTransform: 'none'}}>Пропустить этот шаг</span>
            </Link>

            <MainButton text="Продолжить" onClick={() => tonConnectUI.openModal()} />
        </div>
    </>
}

export default ConnectWallet;