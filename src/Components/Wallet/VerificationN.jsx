import React from "react";
import verif from '../assets/profile/verification.png'
import { useNavigate } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';

function VerificationN() { 
    const navigate = useNavigate();

    return <>
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="prev" style={{backgroundImage: `url(${verif})`, marginTop: '-56px'}}>
              <p style={{marginTop: '312px'}}>Пройдите верификацию</p>
            </div>
        <div className="getContact_container"></div>

        <div className="column">
            <span>Зачем это нужно?</span>
            <div className="pricecourse_container" style={{marginLeft: 'auto', marginRight: 'auto', height: '60px'}}>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Пройди верификацию, чтобы создавать объявления и начать зарабатывать на своих знаниях</span>
            </div>

            <span style={{textTransform: 'none', marginTop: '8px'}}>Необходимо только продавцам!</span>

            <MainButton text="ПРОДОЛЖИТЬ" onClick={() => navigate('/verification-form')} />
        </div>
    </>
}

export default VerificationN;