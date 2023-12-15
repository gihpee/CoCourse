import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Edit.css";

function Univ() {
    const { id } = useParams();
    const [uniValue, setUniValue] = useState("")
    const navigate = useNavigate();

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

    const handleUniChange = (e) => {
        const {value} = e.target;
        setUniValue(value); 
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
      

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                    <div className="univ_billet">Университет</div>
                </div>
                <span>Выберите Университет:</span>
                <select className="billet_univ"
                    name="Univ"
                    value={uniValue}
                    onChange={handleUniChange}>
                    <option>Пункт 1</option>
                    <option>Пункт 2</option>
                </select>
                <div className="publish" style={{marginTop: '25px'}}>
                    <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
                </div>
            </div>
}

export default Univ;