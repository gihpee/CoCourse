import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainButton from '@twa-dev/mainbutton';

function VerificationForm() { 
    const navigate = useNavigate();

    const [birthDate, setBirthDate] = useState(null);
    const [passportDate, setPassportDate] = useState(null);

    const [modalFillOpen, setModalFillOpen] = useState(false);

    const handleOkBtnClick = () => {
        setModalFillOpen(false);
    }

    const [formData, setFormData] = useState({
        passportCopy: null,
        registrationCopy: null,
        Name: '',
        Surname: '',
        secondName: '',
        birthPlace: '',
        idNum: '',
        Code: '',
        Provided: '',
        registrationAddress: '',
        Inn: '',
        Phone: '',
        Email: '',
    });

    const handlePublish = async () => {
        const {passportCopy, registrationCopy, Name, Surname, secondName, birthPlace, idNum, Code, Provided, registrationAddress, Inn, Phone, Email} = formData;
    
        if (!passportCopy || !registrationCopy || !Name || !Surname || !secondName || !birthPlace || !idNum || !Code || !Provided || !registrationAddress || !Inn || !Phone || !Email || !birthDate || !passportDate) {
            setModalFillOpen(true);
        } else {
            let formDataToSend = new FormData();
        
            formDataToSend.append('passportCopy', passportCopy); 
            formDataToSend.append('registrationCopy', registrationCopy);
            formDataToSend.append('Name', Name);
            formDataToSend.append('Surname', Surname);
            formDataToSend.append('secondName', secondName);
            formDataToSend.append('birthPlace', birthPlace);
            formDataToSend.append('birthDate', birthDate);
            formDataToSend.append('passportDate', passportDate);
            formDataToSend.append('idNum', idNum);
            formDataToSend.append('Code', Code);
            formDataToSend.append('Provided', Provided);
            formDataToSend.append('registrationAddress', registrationAddress);
            formDataToSend.append('Inn', Inn);
            formDataToSend.append('Phone', Phone);
            formDataToSend.append('Email', Email);

            await fetch('https://commoncourse.io/api/create-passport-data/', {
                method: 'POST',
                headers: {
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },
                body: formDataToSend,
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
        <span style={{'marginTop': '8px'}}>КОПИЯ ПАСПОРТА (2-3) СТРАНИЦЫ</span>
        <label className="field">
            <input
                type="file"
                name="passportCopy"
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            {formData.passportCopy ? <span style={{'textTransform': 'none', 'margin': '0', 'fontSize': 'inherit', 'color': 'white'}}>{ formData.passportCopy }</span> :
            <span style={{'textTransform': 'none', 'margin': '0', 'fontSize': 'inherit', 'color': '#777'}}>{ "Прикрепить файл" }</span>}
        </label>

        <span style={{'marginTop': '8px'}}>КОПИЯ ПАСПОРТА (СТРАНИЦА РЕГИСТРАЦИИ)</span>
        <label className="field">
            <input
                type="file"
                name="registrationCopy"
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            {formData.registrationCopy ? <span style={{'textTransform': 'none', 'margin': '0', 'fontSize': 'inherit', 'color': 'white'}}>{ formData.registrationCopy }</span> :
            <span style={{'textTransform': 'none', 'margin': '0', 'fontSize': 'inherit', 'color': '#777'}}>{ "Прикрепить файл" }</span>}
        </label>

        <span style={{'marginTop': '8px'}}>ФИО</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Имя"
            name="Name"
            value={formData.Name || null}
            onChange={handleChange} />
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Фамилия"
            name="Surname"
            value={formData.Surname || null}
            onChange={handleChange} />
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Отчество"
            name="secondName"
            value={formData.secondName || null}
            onChange={handleChange} />

        <span style={{'marginTop': '8px'}}>ПАСПОРТНЫЕ ДАННЫЕ</span>
        <div className="field">
            <DatePicker
                style={{'border': 'none', 'outline': 'none'}}
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                placeholderText="Дата рождения"
                dateFormat="dd.MM.yyyy"
            />
        </div>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Место рождения"
            name="birthPlace"
            value={formData.birthPlace || null}
            onChange={handleChange} />
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Серия и номер паспорта"
            name="idNum"
            value={formData.idNum || null}
            onChange={handleChange} />
        <div className="field">
            <DatePicker
                style={{'border': 'none', 'outline': 'none'}}
                selected={passportDate}
                onChange={(date) => setPassportDate(date)}
                placeholderText="Дата выдачи паспорта"
                dateFormat="dd.MM.yyyy"
            />
        </div>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Код подразделения"
            name="Code"
            value={formData.Code || null}
            onChange={handleChange} />
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Кем выдан"
            name="Provided"
            value={formData.Provided || null}
            onChange={handleChange} />
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Адрес регистрации (как в паспорте)"
            name="registrationAddress"
            value={formData.registrationAddress || null}
            onChange={handleChange} />

        <span style={{'marginTop': '8px'}}>ИНН</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="ИНН"
            name="Inn"
            value={formData.Inn || null}
            onChange={handleChange} />

        <span style={{'marginTop': '8px'}}>КОНТАКТНАЯ ИНФОРМАЦИЯ</span>
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Номер телефона"
            name="Phone"
            value={formData.Phone || null}
            onChange={handleChange} />
        <input 
            className='field'
            style={{border: 'none', outline: 'none'}}
            type='text' 
            placeholder="Email"
            name="Email"
            value={formData.Email || null}
            onChange={handleChange} />
    </div>
    <MainButton text="ОТПРАВИТЬ" onClick={handlePublish} />
    </>
}

export default VerificationForm;