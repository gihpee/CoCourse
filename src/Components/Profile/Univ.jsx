import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import nb from '../assets/profile/nb.svg'
import "./Edit.css";

function Univ() {
    const { id } = useParams();
    const [uniValue, setUniValue] = useState("")
    const navigate = useNavigate();
    const [boxIsVisible, setBoxIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const options = ['биба', 'боба', 'пизда', 'ахуй', 'чатгпт наше все', 'чек', 'чек', 'xsd', 'dsds'];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://commoncourse.io/user?id=${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Ошибка при запросе к серверу');
            }
    
            const data = await response.json();
            setUniValue(data[0].university);

          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
        };
    
        fetchData();
    }, [id]);

    const handleUniChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setBoxIsVisible(true);
    };

    const handleOptionClick = (option) => {
      if (uniValue !== option) {
        setUniValue(option);
      }
      setInputValue('');
      setBoxIsVisible(false);
    };
  
    const handleRemoveOption = (optionToRemove) => {
      setUniValue("");
    };

    const handlePublish = () => {
        fetch('https://commoncourse.io/update-univ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({id, uniValue}),
          }).then(navigate(`/edit-profile/${id}`))
    }

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  
    const vars = filteredOptions.map((item, index) => (
      <div className="billet_add" key={index} onClick={() => handleOptionClick(item)}>
        <img src={nb} alt="" />
        <p>{item}</p>
      </div>
    ));
      

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                    <div className="univ_billet">Университет</div>
                </div>
                {uniValue.length > 0 ? (
                <div className="billet_del" onClick={() => handleRemoveOption(uniValue)}>
                  <img src={nb} alt="" />
                  <p>{uniValue}</p>
                </div>
                ) : (<></>)}

                <span>выберите университет:</span>
                <input
                  className="billet_univ"
                  onChange={handleUniChange}
                  onFocus={() => setBoxIsVisible(true)}
                  value={inputValue}
                  style={{ width: '80%' }}
                />
                {boxIsVisible ? (<div className="vars_box">{vars}</div>) : (<></>)}

                <div className="publish" style={{marginTop: '25px'}}>
                    <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
                </div>
                
            </div>
}

export default Univ;