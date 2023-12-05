import React from "react";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import "./SendFeedback.css";

function SendFeedback() {
  const { id } = useParams();

  const [sliderValue, setSliderValue] = useState(3);
  const [revValue, setRevValue] = useState("")

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    console.log(event.target.value)
  };

  const handleRevChange = (e) => {
    const {name, value} = e.target;
    setRevValue(value); 
  };

  const handlePublish = () => {
    console.log(sliderValue, revValue);
    let feedback = [{rate: sliderValue, 
                    review: revValue}];
    fetch('http://80.90.189.96:3001/sf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({id, feedback}),
      })
      .then(response => {
        return response.text();
    })
  }

  return <div className="column">
          <div className="feedback_top">
            <div className="back_btn" onClick={() => {window.history.back()}}></div>
            <div className="fb_billet">Отзывы</div>
          </div>
          <span>Понравилась ли работать с заказчиком?</span>
          <div className="slider-container">
            <input type="range" min="1" max="5" value={sliderValue} step="1" id="myRange" onChange={handleSliderChange} />
          </div>
          <div className="row_grad">
            <div className="grad" style={{width: `calc(48px * ${sliderValue} + (((100% - 240px) / 4) * ${sliderValue - 1}))`, 
                                  background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(100% * ${6 - sliderValue}))`}}></div>
          </div>
          <div className="fb_bg">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <input type="textarea" 
                className="fb_rev" 
                placeholder="Оставить комментарий. Это очень поможет развитию нашего сервиса."
                name="fb_rev"
                onChange={handleRevChange}></input>
          <div className="publish" style={{marginTop: '25px'}}>
            <button className='sf_btn' onClick={handlePublish}>СОХРАНИТЬ</button>
          </div>
          </div>;
}

export default SendFeedback;