import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Edit.css";

function ECourse() {
    const { id } = useParams();
    const [cValue, setCValue] = useState("")
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
            setCValue(data[0].course);

          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
        };
    
        fetchData();
    }, [id]);

    const handleCChange = (e) => {
        const {value} = e.target;
        setCValue(value); 
    };

    const handlePublish = () => {
        fetch('https://commoncourse.io/update-course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({id, cValue}),
          }).then(navigate(`/edit-profile/${id}`))
      }
      

    return <div className="column">
                <div className="feedback_top">
                    <div className="fback_btn" onClick={() => {window.history.back()}}></div>
                    <div className="ccourse_billet">Курс</div>
                </div>
                <span>Выберите Курс:</span>
                <select className="billet_course"
                    name="Course"
                    value={cValue}
                    onChange={handleCChange}>
                    <option>1 курс, 1 семестр</option>
                    <option>1 курс, 2 семестр</option>
                    <option>2 курс, 1 семестр</option>
                    <option>2 курс, 2 семестр</option>
                    <option>3 курс, 1 семестр</option>
                    <option>3 курс, 2 семестр</option>
                    <option>4 курс, 1 семестр</option>
                    <option>4 курс, 2 семестр</option>
                    <option>5 курс, 1 семестр</option>
                    <option>5 курс, 2 семестр</option>
                    <option>6 курс, 1 семестр</option>
                </select>
                <div className="publish" style={{marginTop: '25px'}}>
                    <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
                </div>
            </div>
}

export default ECourse;