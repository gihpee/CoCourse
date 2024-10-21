import React from "react";
import { Link } from 'react-router-dom';
import sun from '../assets/profile/sun.svg'
import bulb from '../assets/profile/bulb.svg'
import chat from '../assets/profile/chat.svg'
import magic from '../assets/profile/magic.svg'
import bell from '../assets/profile/bell.svg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { optionsUniv } from '../optionsUniv';
import { optionsSubject } from '../optionsSubject';
import { useNavigate } from 'react-router-dom';
import lminus from '../assets/create-course/lminus.png'
import "./EditProfile.css";
import plus from '../assets/course/plus.svg'
import MainButton from '@twa-dev/mainbutton';

function EditProfile() {
    const { id } = useParams();

    const [imageSrc, setImageSrc] = useState("");
    const [isNotify, setIsNotify] = useState(true);
    const [bioValue, setBioValue] = useState("");
    const [uniValue, setUniValue] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/api/user-data/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },
            });
    
            if (!response.ok) {
              throw new Error('Ошибка при запросе к серверу');
            }
    
            const data = await response.json();
            setImageSrc(data.photo_url);
            setIsNotify(data.notify);
            setBioValue(data.description);
            setUniValue(data.university);
            setSelectedOptions(data.subjects);
            setFirstName(data.first_name);
            setLastName(data.last_name);

          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
          const textarea = document.querySelector('.bio_textarea');
            if (textarea.scrollHeight > 40)
            {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        };
    
        fetchData();
      }, [id]);

      useEffect(() => {
        const textarea = document.querySelector('.bio_textarea');
        if (textarea && bioValue) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, [bioValue]);

      const handleNotify = () => {
        setIsNotify(!isNotify);
      };

      const handleSave = async () => {
        fetch('https://commoncourse.io/api/update-user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },
    
          body: JSON.stringify({isNotify, selectedOptions, uniValue, bioValue}),
        }).then(navigate(`/profile`))
      }

    const [boxIsVisibleSubject, setBoxIsVisibleSubject] = useState(false);
    const [inputValueSubject, setInputValueSubject] = useState('');

    const handleSelectChangeSubject = (event) => {
        const value = event.target.value;
        setInputValueSubject(value);
        setBoxIsVisibleSubject(true);
    };
    
    const handleOptionClickSubject = (option) => {
        if (!selectedOptions.includes(option)) {
          setSelectedOptions([...selectedOptions, option]);
        }
        setInputValueSubject('');
        setBoxIsVisibleSubject(false);
    };
    
    const handleRemoveOptionSubject = (optionToRemove) => {
      const updatedOptions = selectedOptions.filter((option) => option !== optionToRemove);
      setSelectedOptions(updatedOptions);
    };

    const filteredOptionsSubject = optionsSubject.filter((option) =>
        option.toLowerCase().includes(inputValueSubject.toLowerCase())
    );

    const varsSubject = filteredOptionsSubject.map((item, index) => (
      <div className="field" key={index} onClick={() => handleOptionClickSubject(item)}>
        <p>{item}</p>
        <img src={plus} alt='' />
      </div>
    ));

    const [boxIsVisibleUniv, setBoxIsVisibleUniv] = useState(false);
    const [inputValueUniv, setInputValueUniv] = useState('');

    const handleUniChange = (event) => {
        const value = event.target.value;
        setInputValueUniv(value);
        setBoxIsVisibleUniv(true);
    };

    const handleOptionClickUniv = (option) => {
      if (uniValue !== option) {
        setUniValue(option);
      }
      setInputValueUniv('');
      setBoxIsVisibleUniv(false);
    };
  
    const handleRemoveOptionUniv = (optionToRemove) => {
      setUniValue("");
    };

    const filteredOptionsUniv = optionsUniv.filter((option) =>
      option.toLowerCase().includes(inputValueUniv.toLowerCase())
    );
  
    const varsUniv = filteredOptionsUniv.map((item, index) => (
      <div className="field" key={index} onClick={() => handleOptionClickUniv(item)}>
          <p>{item}</p>
          <img src={plus} alt='' />
      </div>
    ));

      const handleBioChange = (e) => {
        const { value, type } = e.target;

        if (type === 'textarea') {
          e.target.style.height = 'auto'; // Сброс высоты
          e.target.style.height = e.target.scrollHeight - 16 + 'px';
        }
        
        setBioValue(value)
      };


    return <>
            <div className="back_btn" onClick={() => {window.history.back()}}></div>
            <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${imageSrc}})`, marginTop: '-56px'}}>
              <p style={{marginTop: '312px'}}>{ firstName + ' ' + lastName }</p>
            </div>
            <div className="getContact_container">
              <span>БИОГРАФИЯ</span>
              <div className="fieldt" style={{minHeight: '48px'}}>
                    <textarea
                        type='text'
                        placeholder={`Описание`}
                        name={`Desc`}
                        value={bioValue}
                        onChange={handleBioChange}
                    />
              </div>
              <span>УНИВЕРСИТЕТ</span>

                <div className="select_col">
                    <div className="select">
                    {uniValue ? (<div className="selected_row" onClick={() => handleRemoveOptionUniv(uniValue)}> {uniValue} </div>) : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название университета" onChange={handleUniChange} onFocus={() => {setBoxIsVisibleUniv(true); setBoxIsVisibleSubject(false)}} value={inputValueUniv} />

                    </div>
                </div>

                {boxIsVisibleUniv ? (<div className="vars_box">{varsUniv}</div>) : (<></>)}

              <span>ПРЕДМЕТЫ, КОТОРЫЕ ВЫ ИЗУЧАЕТЕ</span>

            <div className="select_col">
                <div className="select">
                {selectedOptions ? (selectedOptions.map((option) => (
                <div className="selected_row" key={option} onClick={() => handleRemoveOptionSubject(option)}>{option}<img src={lminus} alt=''/></div> ))) : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название" onChange={handleSelectChangeSubject} onFocus={() => {setBoxIsVisibleSubject(true); setBoxIsVisibleUniv(false)}} value={inputValueSubject} />

                </div>
            </div>
            {boxIsVisibleSubject ? (<div className="vars_box">{varsSubject}</div>) : (<></>)}

              <span>Оповещения о новых курсах</span>
              <div className="billet" style={{paddingRight: '8px'}}>
                <img src={bell} alt='' />
                <p style={{textAlign: 'left', marginLeft: '12px'}}>Уведомления</p>
                <div class="toggle-switch">
                  <input type="checkbox" id="toggle" checked={isNotify} onChange={handleNotify}/>
                  <label for="toggle"></label>
                </div>
              </div>
              <span>Обратная связь</span>
              <Link to="https://forms.gle/x9KbBitA1AGDPmXY8" target="_blank" className="billet" onClick={(event) => {event.preventDefault(); window.open("https://forms.gle/x9KbBitA1AGDPmXY8");}}>
                <img src={magic} alt='' />
                <p style={{textAlign: 'left', marginLeft: '12px'}}>Сообщить о баге</p>
              </Link>
              <Link to="https://forms.gle/NtaWQe2wuiRpcY2L8" target="_blank" className="billet" onClick={(event) => {event.preventDefault(); window.open("https://forms.gle/NtaWQe2wuiRpcY2L8");}}>
                <img src={chat} alt='' />
                <p style={{textAlign: 'left', marginLeft: '12px'}}>Предложить идею</p>
              </Link>
              <span>О проекте</span>
              <Link to="https://t.me/HowToCommonCourse " target="_blank" className="billet" onClick={(event) => {event.preventDefault(); window.open("https://t.me/HowToCommonCourse ");}}>
                <img src={bulb} alt='' />
                <p style={{textAlign: 'left', marginLeft: '12px'}}>Common Course FAQ</p>
              </Link>
              <a href='https://t.me/Common_Course' className="billet">
                <img src={sun} alt='' />
                <p style={{textAlign: 'left', marginLeft: '12px'}}>Что нового?</p>
              </a>
              
              <MainButton text="СОХРАНИТЬ" onClick={() => handleSave()} />
            </div>
           </>
}

export default EditProfile;