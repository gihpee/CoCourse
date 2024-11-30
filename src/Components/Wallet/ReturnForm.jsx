import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import MainButton from '@twa-dev/mainbutton';

function ReturnForm() { 
    const navigate = useNavigate();

    const location = useLocation();
    const { data } = location.state || {};

    const [formData, setFormData] = useState({
        Message: null,
        Email: null,
        Receipt: null,
    });

    const [modalFillOpen, setModalFillOpen] = useState(false);

    const handleOkBtnClick = () => {
        setModalFillOpen(false);
    }

    const handlePublish = async () => {
        if (!formData.Message || !formData.Email || !formData.Receipt) {
            setModalFillOpen(true);
        } else {
            let reason = formData.Message;
            let email = formData.Email;
            let receipt = formData.Receipt;
            let tid = data.id;

            await fetch('https://comncourse.ru/api/create-return-request/', {
                method: 'POST',
                headers: {
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`,
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({tid, reason, email, receipt}),
            });
    
            navigate('/profile');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
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
                        name={`Message`}
                        value={formData.Message || null}
                        onChange={handleChange}
                    />
            </div>
        <span style={{'marginTop': '8px'}}>Ваш email</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="example@mail.ru"
            name="Email"
            value={formData.Email || null}
            onChange={handleChange} />
        <span style={{'marginTop': '8px'}}>Ссылка на чек</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="ofd.ru"
            name="Receipt"
            value={formData.Receipt || null}
            onChange={handleChange} />

        </div>
    <MainButton text="ОТПРАВИТЬ" onClick={handlePublish} />
    </>
}

export default ReturnForm;