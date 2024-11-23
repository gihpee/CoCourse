import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import MainButton from '@twa-dev/mainbutton';

function ReturnForm() { 
    const navigate = useNavigate();

    const location = useLocation();
    const { data } = location.state || {};

    const [message, setMessage] = useState(null);

    const [modalFillOpen, setModalFillOpen] = useState(false);

    const handleOkBtnClick = () => {
        setModalFillOpen(false);
    }

    const handlePublish = async () => {
        if (!message) {
            setModalFillOpen(true);
        } else {
            let reason = message;
            let tid = data.id;

            await fetch('https://commoncourse.io/api/create-return-request/', {
                method: 'POST',
                headers: {
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
                body: JSON.stringify({tid, reason}),
            });
    
            navigate('/profile');
        }
    };
    

    const handleChange = (e) => {
        const { value } = e.target;
        setMessage(value)
    };

    return <>
        {modalFillOpen && (
          <div className="blackout">
            <div className="modal" style={{height: '120px', marginTop: '-240px'}}>
                <div className="modal-content">
                    <p>Заполните все обязательные поля</p>
                    <button className='modal_btn' onClick={handleOkBtnClick}>Ок</button>
                </div>
            </div>
            </div>
        )}
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="column">
        
        <span style={{'marginTop': '8px'}}>Опишите причину возврата</span>
            <div className="fieldt" style={{minHeight: '48px'}}>
                    <textarea
                        type='text'
                        placeholder={`Причина`}
                        name={`Reason`}
                        value={message}
                        onChange={handleChange}
                    />
            </div>

        </div>
    <MainButton text="ОТПРАВИТЬ" onClick={handlePublish} />
    </>
}

export default ReturnForm;