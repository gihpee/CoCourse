import React from "react";
import verif from '../assets/profile/verification.png'
import MainButton from '@twa-dev/mainbutton';

function VerificationN() { 

    return <>
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="prev" style={{backgroundImage: `url(${verif})`, marginTop: '-56px'}}>
              <p style={{marginTop: '312px'}}>Пройдите верификацию</p>
            </div>
        <div className="getContact_container"></div>

        <div className="column">
            <span>Зачем это нужно?</span>
            <div className="pricecourse_container" style={{marginLeft: 'auto', marginRight: 'auto', height: '60px'}}>
                <div className="course_price">+100<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> COMN</span></div>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Пройди верификацию, чтобы создавать объявления и начать зарабатывать на своих знаниях</span>
            </div>

            <span style={{textTransform: 'none', marginTop: '8px'}}>Необходимо только продавцам!</span>

            <MainButton text="ПРОДОЛЖИТЬ" onClick={() => {window.location.href = 'https://in.sumsub.com/websdk/p/sbx_uni_4sfigzWEmKeJ6r7A'}} />
        </div>
    </>
}

export default VerificationN;