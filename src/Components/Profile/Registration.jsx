import React from "react";
import { useLocation } from "react-router-dom";
import { optionsUniv } from '../optionsUniv';
import { optionsSubject } from '../optionsSubject';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sun from '../assets/profile/sun.svg'
import bulb from '../assets/profile/bulb.svg'
import chat from '../assets/profile/chat.svg'
import magic from '../assets/profile/magic.svg'
import bell from '../assets/profile/bell.svg'
import lminus from '../assets/create-course/lminus.png'
import { Link } from 'react-router-dom';
import MainButton from '@twa-dev/mainbutton';

function Registration() { 
    const navigate = useNavigate();

    const location = useLocation();
    const { data } = location.state || {};

    const [imageSrc, setImageSrc] = useState("");
    const [isNotify, setIsNotify] = useState(true);
    const [bioValue, setBioValue] = useState("");
    const [uniValue, setUniValue] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

    setImageSrc(data.photo_url)

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
          <div className="billet_add" key={index} onClick={() => handleOptionClickSubject(item)}>
              <p>{item}</p>
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
        <div className="billet_add" key={index} onClick={() => handleOptionClickUniv(item)}>
          <p>{item}</p>
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
        }).then(navigate(`/feed`))
      }

    return <>
            <div className="upload-container" style={{marginTop: '-56px'}}>
                <div className="preview-container" id="previewContainer" style={{backgroundImage: `url(https://commoncourse.io${imageSrc})`}}></div>
            </div>
            <div className="prop_container">

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
              <div className="billet" style={{paddingRight: '8px'}}>
                <img src={bell} alt='' />
                <p style={{textAlign: 'left', marginLeft: '12px'}}>Уведомления</p>
                <div class="toggle-switch">
                  <input type="checkbox" id="toggle" checked={isNotify} onChange={handleNotify}/>
                  <label for="toggle"></label>
                </div>
              </div>

              <span>НАЖИМАЯ "ПРОДОЛЖИТЬ" ВЫ СОГЛАШАЕТЕСЬ:</span>
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
              
              <MainButton text="Сохранить" onClick={() => handleSave()} />
            </div>
           </>

}

export default Registration;