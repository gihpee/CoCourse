import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import MainButton from '@twa-dev/mainbutton';

function ConnectPaymentsForm() { 
    const navigate = useNavigate();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;

    const [formData, setFormData] = useState({
        name: null,
        account_number: null,
        bik: null
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/api/user-data/`, {
              method: 'GET',
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
                        name: data.name,
                        account_number: data.account_number,
                        bik: data.bik
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
        if (!passportCopy || !registrationCopy || !Name || !Surname || !secondName || !birthPlace || !idNum || !Code || !Provided || !registrationAddress || !Inn || !Phone || !Email || !birthDate || !passportDate) {
            setModalFillOpen(true);
        } else {
            let name = formData.name;
            let accountNumber = formData.account_number;
            let bik = formData.bik;

            await fetch('https://commoncourse.io/api/update-payment-info/', {
                method: 'POST',
                headers: {
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
                body: JSON.stringify({name, accountNumber, bik}),
            });
    
            navigate('/profile');
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

        <span style={{'marginTop': '8px'}}>Наименование получателя (по реквизитам из банка)</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Иванов Иван Иванович"
            name="name"
            value={formData.name || null}
            onChange={handleChange} />

        <span>Счёт получателя (20 цифр)</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="40702810100100200858"
            name="account_number"
            value={formData.account_number || null}
            onChange={handleChange} />

        <span>БИК получателя (9 цифр)</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="044525801"
            name="bik"
            value={formData.bik || null}
            onChange={handleChange} />
        
    </div>
    <MainButton text="СОХРАНИТЬ" onClick={handlePublish} />
    </>
}

export default ConnectPaymentsForm;