import React from "react";
import pencil from '../assets/profile/pencil.svg'
import star from '../assets/profile/star.svg'
import nb from '../assets/profile/nb.svg'
import chart from '../assets/profile/chart.svg'
import hash from '../assets/profile/hash.svg'
import { useState, useEffect } from 'react';
import "./Profile.css";

function Home() {
  const { id, first_name, last_name, username, photo_url } = window.Telegram.WebApp.initDataUnsafe.user;

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://commoncourse.io/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id}),
        });

        if (!response.ok) {
          throw new Error('Ошибка при запросе к серверу');
        }

        const data = await response.json();

        if (data == {}) {
          setUserData({id: id, first_name: first_name, last_name: last_name, photo_url: photo_url, university: '', course: '', description: ''})

          fetch('https://commoncourse.io/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({id, first_name, last_name, username, photo_url}),
            })
            .then(response => {
              return response.text();
          })
        }
        else {
          setUserData(data);
        }

      } catch (error) {
        console.error('Ошибка при запросе к серверу:', error);
      }
    };

    fetchData();
  }, [id, first_name, last_name, username, photo_url]);

  return <>
          <div className="prev" style={{backgroundImage: `url(${userData.photo_url})`}}>
            <p>{ userData.first_name + ' ' + userData.last_name }</p>
          </div>
          <div className="edit_container">
            <div className="billet">
              <img src={pencil} alt='' />
              <p>Редактор</p>
            </div>
          </div>
          <span>Отзывы</span>
            <div className="feedback">
              <div className="rate">
                <img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '38%'}}/>
              </div>
            </div> 
            <div className="about">
                <span>Университет</span>
                <div className="billet">
                    <img src={nb} alt='' />
                    <p>{userData.university}</p>
                </div>
                <span>Курс</span>
                <div className="billet">
                    <img src={chart} alt='' />
                    <p>{userData.course}</p>
                </div>
                <span>Биография</span>
                <div className="description">
                    <p>{userData.description}</p>
                </div>
                <span>Предмет</span>
                <div className="billet">
                    <img src={hash} alt='' />
                </div>
            </div>
        </>;
}

export default Home;
