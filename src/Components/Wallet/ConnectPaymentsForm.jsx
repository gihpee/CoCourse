import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import MainButton from '@twa-dev/mainbutton';

function ConnectPaymentsForm() { 
    const navigate = useNavigate();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;

    const [formData, setFormData] = useState({
        number: null,
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://comncourse.ru/api/get-card-number/`, {
              method: 'POST',
              headers: {
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },
            });
    
            if (!response.ok) {
              throw new Error('Ошибка при запросе к серверу');
            }
    
            const data = await response.json();
    
            if (data) {
                setFormData(() => {
                    return {
                        number: data.number,
                    }
                });
            }
    
          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
        };
    
        fetchData();
      }, [id]);

    const [modalFillOpen, setModalFillOpen] = useState(false);

    const handleOkBtnClick = () => {
        setModalFillOpen(false);
    }

    const handlePublish = async () => {
        if (!formData.number) {
            setModalFillOpen(true);
        } else {
            let number = formData.number;

            await fetch('https://comncourse.ru/api/update-payment-info/', {
                method: 'POST',
                headers: {
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
                body: JSON.stringify({number}),
            }).then(navigate('/profile'));
    
        }
    };
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : value,
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

        <span style={{'marginTop': '8px'}}>Номер карты</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="4809388886227309"
            name="number"
            value={formData.number || null}
            onChange={handleChange} />

    </div>
    <MainButton text="СОХРАНИТЬ" onClick={handlePublish} />
    </>
}

export default ConnectPaymentsForm;