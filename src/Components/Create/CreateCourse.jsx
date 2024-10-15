import React, {useState, useEffect} from "react";
import prev from '../assets/course/preview.png'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./CreateCourse.css";
import { useTonAddress } from '@tonconnect/ui-react';
import { optionsUniv } from '../optionsUniv';
import { optionsSubject } from '../optionsSubject';
import plus from '../assets/course/plus.svg'
import MainButton from '@twa-dev/mainbutton';

function CreateCourse() {

    const { cid } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: '',
        Univ: '',
        Course: '1 курс, 1 семестр',
        Desc: '',
        Price: null,
        ChannelUrl: '',
        Subject: '',
        topics: [],
    });

    const [imageSrc, setImageSrc] = useState(prev);

    useEffect(() => {
      const fetchChannel = async () => {
        if (cid) {
          try {
            const response = await fetch(`https://commoncourse.io/api/get-channel/?id=${cid}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },
            });
            const result = await response.json();
    
            setFormData((prevData) => {
              return {
                  ...prevData,
                  Name: result.name,
                  ChannelUrl: result.url,
              }
            });

            setImageSrc(result.photo);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };
  
      fetchChannel();
  }, [cid])

    const [modalFillOpen, setModalFillOpen] = useState(false);
    const [modalDraftOpen, setModalDraftOpen] = useState(false);

    const address = useTonAddress();

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'textarea') {
            if (e.target.scrollHeight === 32) {
              e.target.style.height = '24px';
            } else {
              e.target.style.height = '24px';
              e.target.style.height = e.target.scrollHeight + 'px';
            }
          }
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const addEl = () => {
        setFormData((prevData) => ({
          ...prevData,
          topics: [...prevData.topics, { topic: '', desc: '' }],
        }));
    };

    const handleOkBtnClick = () => {
      setModalFillOpen(false);
    }
    
    const handleTopicChange = (index, e) => {
        const { name, value, type } = e.target;

        if (type === 'textarea') {
            if (e.target.scrollHeight === 32) {
              e.target.style.height = '24px';
            } else {
              e.target.style.height = '24px';
              e.target.style.height = e.target.scrollHeight + 'px';
            }
          }

        setFormData((prevData) => {
            const newTopics = [...prevData.topics];
            const [field] = name.split('_'); 
            newTopics[index][field] = value;
            return {
                ...prevData,
                topics: newTopics,
            };
        });
    };

    const handlePublish = async () => {
      if (formData.Name === '' || formData.Univ === '' || formData.Desc === '' || formData.Subject === '')
      {
        setModalFillOpen(true);
      } else {
          let university = formData.Univ || 'Не указано';
          let description = formData.Desc || 'Не указано';
          let subjects = formData.Subject || 'Не указано';
          let topics = formData.topics; 
          let price = formData.Price || 0;
          let channel_id = cid;
          let is_draft = false;

          await fetch('https://commoncourse.io/api/create-course/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `tma ${window.Telegram.WebApp.initData}`
              },

              body: JSON.stringify({university, description, subjects, topics, price, channel_id, is_draft, address}),
          }).then(navigate('/profile'))
      }
        
    };

    const handleSaveDraft = async () => {
      let university = formData.Univ;
      let description = formData.Desc;
      let subjects = formData.Subject;
      let topics = formData.topics; 
      let price = formData.Price || 0;
      let channel_id = cid;
      let is_draft = true;

      await fetch('https://commoncourse.io/api/create-course/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `tma ${window.Telegram.WebApp.initData}`
          },

          body: JSON.stringify({university, description, subjects, topics, price, channel_id, is_draft, address}),
      }).then(navigate('/profile'))
        
    };

    const [boxIsVisibleSubject, setBoxIsVisibleSubject] = useState(false);
    const [inputValueSubject, setInputValueSubject] = useState('');

    const handleSelectChangeSubject = (event) => {
        const value = event.target.value;
        setInputValueSubject(value);
        setBoxIsVisibleSubject(true);
    };
    
    const handleOptionClickSubject = (option) => {
        if (formData.Subject !== option) {
          setFormData((prevData) => {
            return {
                ...prevData,
                Subject: option,
            }
        });
        }
        setInputValueSubject('');
        setBoxIsVisibleSubject(false);
    };
    
    const handleRemoveOptionSubject = (optionToRemove) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                Subject: '',
            }
        });
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
      if (formData.Univ !== option) {
        setFormData((prevData) => {
            return {
                ...prevData,
                Univ: option,
            }
        })
      }
      setInputValueUniv('');
      setBoxIsVisibleUniv(false);
    };
  
    const handleRemoveOptionUniv = (optionToRemove) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                Univ: "",
            }
        })
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

    return <>
        <div className="back_btn" onClick={() => setModalDraftOpen(true)}></div>

        {modalFillOpen && (
            <div className="modal" style={{height: '120px', marginTop: '-120px'}}>
                <div className="modal-content">
                    <p>Заполните все обязательные поля</p>
                    <button className='modal_btn' onClick={handleOkBtnClick}>Ок</button>
                </div>
            </div>
        )}

        {modalDraftOpen && (
          <div className="modal">
          <div className="modal-content">
              <p>Сохранить черновик?</p>
              <p style={{color: '#aaaaaa', 
                      fontSize: '14px', 
                      fontWeight: '400', 
                      lineHeight: '18.2px', 
                      marginTop: '16px'}}>Восстановить публикацию будет невозможно</p>
              <button className='modal_btn_n' onClick={() => window.history.back()}>Нет</button>
              <button className='modal_btn_y' onClick={handleSaveDraft}>Да</button>
          </div>
      </div>
        )}

        <div className="prev" style={{backgroundImage: `url(https://commoncourse.io${imageSrc})`, marginTop: '-56px'}}>
            <p>{ formData.Name }</p>
        </div>

        <div className="getContact_container">   
            <span>СУММА К ПОЛУЧЕНИЮ (RUB)*</span>
            <input 
                className='field'
                style={{border: 'none', outline: 'none'}}
                type='number' 
                placeholder="0"
                name="Price"
                value={formData.Price || null}
                onChange={handleChange} />

            <span>УНИВЕРСИТЕТ*</span>

            <div className="select_col">
                    <div className="select">
                    {formData.Univ.length > 0 ? (<div className="selected_row" onClick={() => handleRemoveOptionUniv(formData.Univ)}> {formData.Univ} </div>) : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название университета" onChange={handleUniChange} onFocus={() => {setBoxIsVisibleUniv(true); setBoxIsVisibleSubject(false)}} value={inputValueUniv} />

                    </div>
                </div>

                {boxIsVisibleUniv ? (<div className="vars_box">{varsUniv}</div>) : (<></>)}

            <span>ПРЕДМЕТ*</span>

            <div className="select_col">
                <div className="select">
                {formData.Subject.length > 0 ? (<div className="selected_row" onClick={() => handleRemoveOptionSubject(formData.Subject)}>{formData.Subject}</div> ) : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название" onChange={handleSelectChangeSubject} onFocus={() => {setBoxIsVisibleSubject(true); setBoxIsVisibleUniv(false)}} value={inputValueSubject} />

                </div>
            </div>
            {boxIsVisibleSubject ? (<div className="vars_box">{varsSubject}</div>) : (<></>)}

            <span>ОПИСАНИЕ*</span>
            <div className="select_col">
                <div className="select">
                  <textarea className='bio_textarea' type='text' placeholder="Описание" name="Desc" value={formData.Desc} onChange={handleChange}/>
                </div>
            </div>

            <span>СОДЕРЖАНИЕ</span>
            {formData.topics.map((topic, index) => (
                <div key={index} className="column" style={{width: '100%'}} name='topics'>
                    <input
                        className='field'
                        style={{border: 'none', outline: 'none'}}
                        type='text'
                        placeholder={`Тема ${index + 1}`}
                        name={`topic_${index}`}
                        value={topic.topic}
                        onChange={(e) => handleTopicChange(index, e)}
                    />
                    <textarea
                      className='field'
                      style={{border: 'none', outline: 'none', minHeight: '48px', lineHeight: '20px'}}
                      type='text'
                      placeholder={`Описание темы ${index + 1}`}
                      name={`desc_${index}`}
                      value={topic.desc}
                      onChange={(e) => handleTopicChange(index, e)}
                    />
                </div>
            ))}

        </div>
        <div className="column" style={{marginBottom: '200px'}}>
            <div className='field' onClick={addEl}>
              <p>Добавить тему</p>
              <img src={plus} alt='' />
            </div>
        </div>
        <MainButton text="Опубликовать" onClick={handlePublish} />
        </>
}

export default CreateCourse;