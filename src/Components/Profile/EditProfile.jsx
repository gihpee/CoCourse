import React from "react";
import nb from '../assets/profile/nb.svg'
import chart from '../assets/profile/chart.svg'
import hash from '../assets/profile/hash.svg'
import bio from '../assets/profile/bio.svg'
import copy from '../assets/profile/copy.svg'
import sun from '../assets/profile/sun.svg'
import bulb from '../assets/profile/bulb.svg'
import chat from '../assets/profile/chat.svg'
import magic from '../assets/profile/magic.svg'
import bell from '../assets/profile/bell.svg'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./EditProfile.css";

function EditProfile() {
    const { id } = useParams();

    const [imageSrc, setImageSrc] = useState("");

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
            setImageSrc(data[0].photo_url);

          } catch (error) {
            console.error('Ошибка при запросе к серверу:', error);
          }
        };
    
        fetchData();
      }, [id]);

      console.log(imageSrc)

      const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.result) {
              setImageSrc(reader.result);
            }
          };
    
          reader.readAsDataURL(file);
        } else {
          setImageSrc(null);
        }
    };

    return <>
            <div className="upload-container">
                <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange}/>
                <div className="preview-container" id="previewContainer" style={{backgroundImage: `url(${imageSrc})`, opacity: 0.6}}></div>
                <div className="prev_filter"></div>
            </div>
            <div className="back_btn" onClick={() => {window.history.back()}}></div>
            <div className="prop_container">
              <Link to={`/edit-bio/${id}`} className="billet">
                <img src={bio} alt='' />
                <p>Биография</p>
              </Link>
              <Link to={`/edit-univ/${id}`} className="billet">
                <img src={nb} alt='' />
                <p>Университет</p>
              </Link>
              <Link to={`/edit-ecourse/${id}`} className="billet">
                <img src={chart} alt='' />
                <p>Курс</p>
              </Link>
              <Link to={`/edit-subj/${id}`} className="billet">
                <img src={hash} alt='' />
                <p>Предметы, которые вы изучаете</p>
              </Link>
              <span>Оповещения о новых курсах</span>
              <div className="billet">
                <img src={bell} alt='' />
                <p>Уведомления</p>
              </div>
              <span>Обратная связь</span>
              <div className="billet">
                <img src={magic} alt='' />
                <p>Сообщить о баге</p>
              </div>
              <div className="billet">
                <img src={chat} alt='' />
                <p>Предложить идею</p>
              </div>
              <span>О проекте</span>
              <div className="billet">
                <img src={bulb} alt='' />
                <p>Unicon FAQ</p>
              </div>
              <div className="billet">
                <img src={sun} alt='' />
                <p>Что нового?</p>
              </div>
              <div className="billet">
                <img src={copy} alt='' />
                <p>Агентское соглашение</p>
              </div>
              <div className="billet">
                <img src={copy} alt='' />
                <p>Политика конфиденциальности</p>
              </div>
              <div className="billet">
                <img src={copy} alt='' />
                <p>Кодекс чести</p>
              </div>
              <div className="billet">
                <img src={copy} alt='' />
                <p>Правила пользования</p>
              </div>
              <div className="billet">
                <img src={copy} alt='' />
                <p>Лицензии</p>
              </div>
            </div>
           </>
}

export default EditProfile;