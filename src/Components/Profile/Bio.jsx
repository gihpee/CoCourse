import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Edit.css";

function Bio() {
    const { id } = useParams();
    const [bioValue, setBioValue] = useState("")
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
            setBioValue(data[0].description);

          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
        };
    
        fetchData();
      }, [id]);

    const handleBioChange = (e) => {
        const {value} = e.target;
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        setBioValue(value); 
    };

    const handlePublish = () => {
        fetch('https://commoncourse.io/update-bio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({id, bioValue}),
          }).then(navigate(`/edit-profile/${id}`))
      }

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                    <div className="bio_billet">Биография</div>
                </div>
                <span>Биография</span>
                <textarea className="bio_text" 
                          placeholder="Расскажи о себе и своих достижениях..."
                          name="bio_text"
                          value={bioValue}
                          onChange={handleBioChange}>
                </textarea>
                <div className="publish" style={{marginTop: '25px'}}>
                    <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
                </div>
           </div>
}

export default Bio;