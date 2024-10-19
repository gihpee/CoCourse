import React from "react";
import { useLocation } from "react-router-dom";
import { optionsUniv } from '../optionsUniv';
import { optionsSubject } from '../optionsSubject';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toggle from '../assets/profile/toggle.svg'
import plus from '../assets/course/plus.svg'
import lminus from '../assets/create-course/lminus.png'
import { Link } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';

function Registration() { 
    const navigate = useNavigate();

    const location = useLocation();
    const { data } = location.state || {};

    const [imageSrc, setImageSrc] = useState(data?.photo_url);
    const [isNotify, setIsNotify] = useState(true);
    const [bioValue, setBioValue] = useState("");
    const [uniValue, setUniValue] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
      const textarea = document.querySelector('.bio_textarea');
          if (textarea && bioValue) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
          }
      }, [bioValue]);

      useEffect(() => {
        if (data && data.photo_url) {
          setImageSrc(data.photo_url);
          setFirstName(data.first_name);
          setLastName(data.last_name);
        }
      }, [data]);

      const handleNotify = () => {
        setIsNotify(!isNotify);
      };

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
          if (e.target.scrollHeight === 32) {
            e.target.style.height = '24px';
          } else {
            e.target.style.height = '24px';
            e.target.style.height = e.target.scrollHeight + 'px';
          }
        }
          
        setBioValue(value)
      };

      const handleSave = async () => {
        fetch('https://commoncourse.io/api/update-user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },
    
          body: JSON.stringify({isNotify, selectedOptions, uniValue, bioValue}),
        }).then(navigate(`/connect-wallet`))
      }

    return <>
            <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${imageSrc}})`, marginTop: '-56px'}}>
              <p style={{marginTop: '312px'}}>{ firstName + ' ' + lastName }</p>
            </div>
            <div className="getContact_container">

                <span>УНИВЕРСИТЕТ</span>
                <div className="select_col">
                    <div className="select">
                    {uniValue ? (<div className="selected_row" onClick={() => handleRemoveOptionUniv(uniValue)}> {uniValue} </div>) : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название университета" onChange={handleUniChange} onFocus={() => {setBoxIsVisibleUniv(true); setBoxIsVisibleSubject(false)}} value={inputValueUniv} />

                    </div>
                </div>
                {boxIsVisibleUniv ? (<div className="vars_box">{varsUniv}</div>) : (<></>)}

                <span>ПРЕДМЕТЫ</span>
                <div className="select_col">
                    <div className="select">
                    {selectedOptions ? (selectedOptions.map((option) => (
                    <div className="selected_row" key={option} onClick={() => handleRemoveOptionSubject(option)}>{option}<img src={lminus} alt=''/></div> ))) : (<></>)}

                        <input className="select_input" placeholder="Начните вводить название" onChange={handleSelectChangeSubject} onFocus={() => {setBoxIsVisibleSubject(true); setBoxIsVisibleUniv(false)}} value={inputValueSubject} />

                    </div>
                </div>
                {boxIsVisibleSubject ? (<div className="vars_box">{varsSubject}</div>) : (<></>)}

              <span>ОПИСАНИЕ</span>
              <div className="select_col">
                <div className="select">
                  <textarea className='bio_textarea' type='text' placeholder="Расскажите о себе и своих достижениях" value={bioValue} onChange={handleBioChange} />
                </div>
              </div>

              <span>ОСНОВНЫЕ</span>
              <div className="field">
                <p>Уведомления</p>
                <div class="toggle-switch">
                  <input type="checkbox" id="toggle" checked={isNotify} onChange={handleNotify}/>
                  <label for="toggle"></label>
                </div>
              </div>

              <span>НАЖИМАЯ "ПРОДОЛЖИТЬ" ВЫ СОГЛАШАЕТЕСЬ:</span>
              <Link to="https://disk.yandex.ru/i/h6bWlwR6L5B8fg" target="_blank" className="field" onClick={(event) => {event.preventDefault(); window.open("https://disk.yandex.ru/i/h6bWlwR6L5B8fg");}}>
                <p>Правила пользования</p>
                <img src={toggle} alt='' style={{position: 'absolute', right: '16px'}} />
              </Link>
              <Link to="https://disk.yandex.ru/i/Il8aGfCCgzVbnw" target="_blank" className="field" onClick={(event) => {event.preventDefault(); window.open("https://disk.yandex.ru/i/Il8aGfCCgzVbnw");}}>
                <p>Политика конфиденциальности</p>
                <img src={toggle} alt='' style={{position: 'absolute', right: '16px'}} />
              </Link>
              <Link to="https://disk.yandex.ru/i/kupfGfO2ADm48g" target="_blank" className="field" onClick={(event) => {event.preventDefault(); window.open("https://disk.yandex.ru/i/kupfGfO2ADm48g");}}>
                <p>Согласие на обработку персональных данных</p>
                <img src={toggle} alt='' style={{position: 'absolute', right: '16px'}} />
              </Link>
              <a href='https://disk.yandex.ru/i/0HfHDg05yeroqQ' className="field">
                <p>Согласие на передачу персональных данных в банк</p>
                <img src={toggle} alt='' style={{position: 'absolute', right: '16px'}} />
              </a>
              
              <MainButton text="Продолжить" onClick={() => handleSave()} />
            </div>
           </>

}

export default Registration;