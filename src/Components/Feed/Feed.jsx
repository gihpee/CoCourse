import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cam from "../assets/feed/camera.svg"
import calendarS from '../assets/feedback/calendarS.svg'
import hash from "../assets/feed/hash.svg"
import nb from "../assets/feed/notebook.svg"
import star from '../assets/feed/star.svg'
import "./Feed.css";


function Feed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://commoncourse.io/');
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const appCourses = data.map((item, index) => {

    var totalRate = 0;
    var averageRate = 0;

    if (item.feedback.length > 0) {
        for (var i = 0; i < item.feedback.length; i++) {
            totalRate += parseFloat(item.feedback[i].rate);
        }

        averageRate = totalRate / item.feedback.length;
        averageRate = Math.round(averageRate * 100) / 100;
    }

    return (
      <Link to={`/course/${item.id}`} key={index} className="course_card">
        <div className="course_img" style={{backgroundImage: `url(${item.image})`}}></div>
        <div className="card_info">
          <div className="rate"><img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '42.5%'}}/>{averageRate}</div>
          <div className="points">
            <div className="point"><img src={cam} alt='' style={{ marginRight: '10px' }}/><b>{item.name}</b></div>
            <div className="point"><img src={nb} alt='' style={{ marginRight: '10px' }}/>{item.university}</div>
            <div className="point"><img src={hash} alt='' style={{ marginRight: '10px' }}/>{(item.subjects).join(', ')}</div>
            <div className="point"><img src={calendarS} alt='' style={{ marginRight: '10px' }}/>{item.date}</div>
          </div>
        </div>
      </Link>
    )
  })

  return <>
    {appCourses}
    </>;
}

export default Feed;
