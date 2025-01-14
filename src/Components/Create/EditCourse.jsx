import React, {useState} from "react";
import prev from '../assets/course/preview.png'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { optionsUniv } from '../optionsUniv';
import { optionsSubject } from '../optionsSubject';
import { useTonAddress } from '@tonconnect/ui-react';
import MainButton from '@twa-dev/mainbutton';
import plus from '../assets/course/plus.svg'
import krest from '../assets/create/ckrest.svg'
import "./EditCourse.css";

function EditCourse() {
    const { cid } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: '',
        Univ: '',
        Course: '',
        Desc: '',
        Price: null,
        ChannelUrl: '',
        is_draft: false,
        Subject: '',
        topics: [],
    });

    const [imageSrc, setImageSrc] = useState(prev);

    const [isModalOpen, setModalOpen] = useState(false);

    const [modalFillOpen, setModalFillOpen] = useState(false);
    const [modalDraftOpen, setModalDraftOpen] = useState(false);

    const userFriendlyAddress = useTonAddress();
    const [verifyed, setVerifyed] = useState(false);
    const [modalVOpen, setModalVOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalLink, setModalLink] = useState("");
    const [modalButton, setModalButton] = useState("");

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleLaterBtnClick = () => {
        setModalVOpen(false);
    }

    const handleConfirmDelete = async () => {
        setModalOpen(false);

        await fetch('https://comncourse.ru/api/delete-course/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `tma ${window.Telegram.WebApp.initData}`
            },

            body: JSON.stringify({cid}),
        }).then(navigate('/profile'))
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
    };

    const handleOkBtnClick = () => {
        setModalFillOpen(false);
    }

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await fetch(`https://comncourse.ru/api/get-courses/?id=${cid}`);
            const data = await response.json();
    
            setFormData(() => {
                return {
                    Name: data.channel.name,
                    Univ: data.university,
                    Desc: data.description,
                    Subject: data.subject,
                    topics: data.topics,
                    Price: data.price,
                    is_draft: data.is_draft
                }
            });
            setImageSrc(data.channel.photo)
            setVerifyed(data.user.verifyed)

            /*const textarea = document.querySelector('.bio_textarea');

            if (textarea.scrollHeight > 40)
            {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }*/

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchCourses();
    }, [cid])

    /*useEffect(() => {
        const textarea = document.querySelector('.bio_textarea');
        if (textarea && formData.Desc) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, [formData.Desc]);*/

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'textarea') {
            e.target.style.height = 'auto'; // Сброс высоты
            e.target.style.height = e.target.scrollHeight - 16 + 'px';
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

    const handleRemoveTopic = (indexToRemove) => {
        setFormData((prevData) => ({
          ...prevData,
          topics: prevData.topics.filter((_, index) => index !== indexToRemove),
        }));
    };
    
    const handleTopicChange = (index, e) => {
        const { name, value, type } = e.target;
        
        if (type === 'textarea') {
            e.target.style.height = 'auto'; // Сброс высоты
            e.target.style.height = e.target.scrollHeight - 16 + 'px';
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

    const handlePublishDraft = async () => {
        if (!userFriendlyAddress && !verifyed) {
            setModalText("Для создания курса необходимо пройти верификацию и подключить выплаты");
            setModalLink("/connect-wallet")
            setModalButton("Пройти")
            setModalVOpen(true);
          }
          else if (!userFriendlyAddress) {
            setModalText("Для создания курса необходимо подключить выплаты");
            setModalLink("/connect-walletN")
            setModalButton("Подключить")
            setModalVOpen(true);
          }
          else if (!verifyed) {
            setModalText("Для создания курса необходимо пройти верификацию");
            setModalLink("/verificationN")
            setModalButton("Пройти")
            setModalVOpen(true);
          }
          else {
                if (formData.Name === '' || formData.Univ === '' || formData.Desc === '' || formData.Subject === '')
                {
                setModalFillOpen(true);
                } else {
                    let price = formData.Price;
                    let university = formData.Univ;
                    let description = formData.Desc;
                    let subjects = formData.Subject;
                    let topics = formData.topics; 
                    let is_draft = false;

                    await fetch('https://comncourse.ru/api/edit-course/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `tma ${window.Telegram.WebApp.initData}`
                        },

                        body: JSON.stringify({cid, university, description, subjects, topics, is_draft, price}),
                    }).then(navigate('/profile'))
                }}
          
      };

    const handlePublish = async () => {
        if (!formData.is_draft) {
            if (formData.Name === '' || formData.Univ === '' || formData.Desc === '' || formData.Subject === '')
            {
                setModalFillOpen(true);
                console.log('here')
            } else {
                let price = formData.Price;
                let university = formData.Univ;
                let description = formData.Desc;
                let subjects = formData.Subject;
                let topics = formData.topics; 
                let is_draft = false;

                await fetch('https://comncourse.ru/api/edit-course/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `tma ${window.Telegram.WebApp.initData}`
                    },

                    body: JSON.stringify({cid, university, description, subjects, topics, is_draft, price}),
                }).then(navigate('/profile'))
            }
        } else {
            let price = formData.Price;
            let university = formData.Univ;
            let description = formData.Desc;
            let subjects = formData.Subject;
            let topics = formData.topics; 
            let is_draft = false;

            await fetch('https://comncourse.ru/api/edit-course/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `tma ${window.Telegram.WebApp.initData}`
                },

                body: JSON.stringify({cid, university, description, subjects, topics, is_draft, price}),
            }).then(navigate('/profile'))
        }
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
        <div className="top_panel">
            <div className="top_panel_back_btn" onClick={() => setModalDraftOpen(true)}></div>
            <div className="delete_btn" onClick={handleDeleteClick}></div>
        </div>

        {modalFillOpen && (
            <div className="blackout">
            <div className="modal" style={{height: '120px', marginTop: '-240px'}}>
                <div className="modal-content">
                    <p>Заполните все обязательные поля</p>
                    <button className='modal_btn' onClick={handleOkBtnClick}>Ок</button>
                </div>
            </div>
            </div>
        )}

        {modalVOpen && (
            <div className="blackout">
            <div className="modal" style={{height: '140px', marginTop: '-280px'}}>
                <div className="modal-content">
                    <p>{modalText}</p>
                    <div className="mbtns_container">
                      <button className='mbtn' onClick={handleLaterBtnClick}>Позже</button>
                      <button className='mbtn' onClick={() => navigate(modalLink)}>{modalButton}</button>
                    </div>
                </div>
            </div>
            </div>
            )}

        {modalDraftOpen && (
            <div className="blackout">
          <div className="modal" style={{height: '120px', marginTop: '-240px'}}>
          <div className="modal-content">
              <p>Сохранить изменения?</p>
              <div className="mbtns_container">
                  <button className='mbtn' onClick={() => window.history.back()}>Нет</button>
                  <button className='mbtn' onClick={handlePublish}>Да</button>
              </div>
          </div>
        </div>
        </div>
        )}

        {isModalOpen && (
            <div className="blackout">
            <div className="modal">
                <div className="modal-content">
                    <p>Уверены что хотите удалить публикацию?</p>
                    <p style={{color: '#aaaaaa', 
                            fontSize: '14px', 
                            fontWeight: '400', 
                            lineHeight: '18.2px', 
                            marginTop: '16px'}}>Восстановить публикацию будет невозможно</p>
                    <div className="mbtns_container">
                        <button className='mbtn' onClick={handleCancelDelete}>Нет</button>
                        <button className='mbtn' onClick={handleConfirmDelete}>Да</button>
                    </div>
                </div>
            </div>
            </div>
        )}

        <div className="prev" style={{backgroundImage: `url(https://comncourse.ru${imageSrc})`, marginTop: '-56px'}}>
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
                    {formData.Univ ? (<div className="selected_row" onClick={() => handleRemoveOptionUniv(formData.Univ)}> {formData.Univ} </div>) : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название университета" onChange={handleUniChange} onFocus={() => {setBoxIsVisibleUniv(true); setBoxIsVisibleSubject(false)}} value={inputValueUniv} />

                    </div>
                </div>

                {boxIsVisibleUniv ? (<div className="vars_box">{varsUniv}</div>) : (<></>)}

                <span>ПРЕДМЕТ*</span>

                <div className="select_col">
                <div className="select">
                {formData.Subject ? <div className="selected_row" key={formData.Subject} onClick={() => handleRemoveOptionSubject(formData.Subject)}>{formData.Subject}</div> : (<></>)}

                    <input className="select_input" placeholder="Начните вводить название" onChange={handleSelectChangeSubject} onFocus={() => {setBoxIsVisibleSubject(true); setBoxIsVisibleUniv(false)}} value={inputValueSubject} />

                </div>
                </div>
                {boxIsVisibleSubject ? (<div className="vars_box">{varsSubject}</div>) : (<></>)}
                
            <span>ОПИСАНИЕ*</span>
                <div className="fieldt" style={{minHeight: '48px'}}>
                    <textarea
                        type='text'
                        placeholder={`Описание`}
                        name={`Desc`}
                        value={formData.Desc}
                        onChange={handleChange}
                    />
                </div>

            <span>СОДЕРЖАНИЕ</span>
            {formData.topics && formData.topics.map((topic, index) => (
                <div key={index} className="column" style={{width: '100%'}} name='topics'>
                    <div className="field">
                        <input
                            type='text'
                            placeholder={`Тема ${index + 1}`}
                            name={`topic_${index}`}
                            value={topic.topic}
                            onChange={(e) => handleTopicChange(index, e)}
                        />
                        <img src={krest} alt='' style={{position: 'absolute', right: '16px'}} onClick={() => handleRemoveTopic(index)}/>
                    </div>
                    <div className="fieldt" style={{minHeight: '48px'}}>
                        <textarea
                        type='text'
                        placeholder={`Описание темы ${index + 1}`}
                        name={`desc_${index}`}
                        value={topic.desc}
                        onChange={(e) => handleTopicChange(index, e)}
                        />
                    </div>
                </div>
            ))}

        </div>
        <div className="column" style={{marginBottom: '200px'}}>
            <div className='field' onClick={addEl}>
              <p>Добавить тему</p>
              <img src={plus} alt='' style={{position: 'absolute', right: '16px'}} />
            </div>
        </div>
        {formData.is_draft ? <MainButton text="ОПУБЛИКОВАТЬ" onClick={handlePublishDraft} /> : <MainButton text="ОПУБЛИКОВАТЬ" onClick={handlePublish} />}
        </>
}

export default EditCourse;