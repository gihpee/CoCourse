import React from "react";
import hash from '../assets/profile/hash.svg'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Edit.css";

function Subj() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [boxIsVisible, setBoxIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const options = ['биба', 'боба', 'пизда', 'ахуй', 'все', 'чек', 'чек', 'xsd', 'dsds'];

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
        if (data[0].subjects) {
          setSelectedOptions(data[0].subjects);
        }
      } catch (error) {
        console.error('Ошибка при запросе к серверу:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setBoxIsVisible(true);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInputValue('');
    setBoxIsVisible(false);
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter((option) => option !== optionToRemove);
    setSelectedOptions(updatedOptions);
  };

  const handlePublish = () => {
    fetch('https://commoncourse.io/update-subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, selectedOptions }),
    }).then(() => navigate(`/edit-profile/${id}`));
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const vars = filteredOptions.map((item, index) => (
    <div className="billet_add" key={index} onClick={() => handleOptionClick(item)}>
      <img src={hash} alt="" />
      <p>{item}</p>
    </div>
  ));

  return (
    <div className="column">
      <div className="feedback_top">
        <div className="fback_btn" onClick={() => window.history.back()}></div>
        <div className="subj_billet">Предмет</div>
      </div>
      {selectedOptions.length > 0 ? (
        selectedOptions.map((option) => (
          <div
            className="billet_del"
            key={option}
            onClick={() => handleRemoveOption(option)}
          >
            <img src={hash} alt="" />
            <p>{option}</p>
          </div>
        ))
      ) : (
        <></>
      )}

      <span>выберите Предмет:</span>
      <input
        className="billet_subject"
        onChange={handleSelectChange}
        onFocus={() => setBoxIsVisible(true)}
        value={inputValue}
        style={{ width: '80%' }}
      />
      {boxIsVisible ? (
        <div className="vars_box">{vars}</div>
      ) : (
        <></>
      )}

      <div className="publish" style={{ marginTop: '25px' }}>
        <button className="sf_btn" onClick={handlePublish}>
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
}

export default Subj;