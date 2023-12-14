import React, {useState} from "react";
import prev from '../assets/course/preview.png'
import { useNavigate } from 'react-router-dom';
import "./CreateCourse.css";

function CreateCourse() {

    const { id } = window.Telegram.WebApp.initDataUnsafe.user;

    var currentDate = new Date();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: '',
        Univ: '',
        Course: '',
        Desc: '',
        Subject: '',
        topics: [],
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
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
    
    const handleTopicChange = (index, e) => {
        const { name, value } = e.target;
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

    const [imageSrc, setImageSrc] = useState(prev);

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

    const handlePublish = async () => {
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        let name = formData.Name;
        let university = formData.Univ;
        let course = formData.Course;
        let description = formData.Desc;
        let subjects = formData.Subject;
        let topics = formData.topics; 
        let user = id;
        let date = day + '-' + month + '-' + year
        let image = imageSrc;
        let feedback = [];

        const response = await fetch('https://commoncourse.io/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({name, university, course, description, subjects, topics, date, user, feedback, image}),
        });
        
        if (response.ok) {
            navigate('/');
        } else {
            console.error('error 1')
        }
    };

    return <>
        <div className="upload-container">
            <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange}/>
            <div className="preview-container" id="previewContainer" style={{ backgroundImage: `url(${imageSrc})` }}></div>
        </div>
        <div className="back_btn" onClick={() => {window.history.back()}}></div>
        <div className="column" id='main' style={{marginTop: '-64px', borderRadius: '24px',
        borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', backgroundColor: 'black', paddingTop: '8px'}}>
            <span>ТЕМА</span>
            <input 
                className='billet_name'
                type='text' 
                placeholder="Economics"
                name="Name"
                value={formData.Name || ''}
                onChange={handleChange} />
            <span>УНИВЕРСИТЕТ</span>
            <select className="billet_univ"
                    name="Univ"
                    value={formData.Univ}
                    onChange={handleChange}>
                <option>Пункт 1</option>
                <option>Пункт 2</option>
            </select>
            <span>КУРС</span>
            <select className="billet_course"
                    name="Course"
                    value={formData.Course}
                    onChange={handleChange}>
                <option>Пункт 1</option>
                <option>Пункт 2</option>
            </select>
            <span>ОПИСАНИЕ</span>
            <input className='billet_desc'
                    type='text'
                    placeholder="Economics"
                    name="Desc"
                    value={formData.Desc}
                    onChange={handleChange} />

            <span>ПРЕДМЕТ</span>
            <select className="billet_subject"
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleChange}>
                <option>Пункт 1</option>
                <option>Пункт 2</option>
            </select>

            <span>СОДЕРЖАНИЕ</span>
            {formData.topics.map((topic, index) => (
                <div key={index} className="column" style={{width: '100%'}} name='topics'>
                    <input
                        className='billet_topic'
                        type='text'
                        placeholder={`Topic ${index + 1}`}
                        name={`topic_${index}`}
                        value={topic.topic}
                        onChange={(e) => handleTopicChange(index, e)}
                    />
                    <input
                    className='billet_desc'
                    type='text'
                    placeholder={`Topic ${index + 1} info`}
                    name={`desc_${index}`}
                    value={topic.desc}
                    onChange={(e) => handleTopicChange(index, e)}
                    />
                </div>
            ))}

        </div>
        <div className="column">
            <button className='billet_add' onClick={addEl}>Add topic</button>
        </div>
        <div className="publish">
            <button className='publish_btn' onClick={handlePublish}>ОПУБЛИКОВАТЬ</button>
        </div>
        </>
}

export default CreateCourse;