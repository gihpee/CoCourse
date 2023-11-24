import React from "react";
import cam from "../assets/feed/camera.svg"
import chart from "../assets/feed/chart.svg"
import hash from "../assets/feed/hash.svg"
import nb from "../assets/feed/notebook.svg"
import star from '../assets/feed/star.svg'
import "./Feed.css";

const courses = [
  {
    id: 1,
    rate: 5.0,
    name: 'Econometrics (Full guide)',
    university: 'HSE',
    tags: 'Экономика, Эконометрика, Теория игр',
    course: '1 курс, 1 семестр'
  },
  {
    id: 2,
    rate: 4.0,
    name: 'Mathematics (Full guide)',
    university: 'MSU',
    tags: 'Математический анализ, Функциональный анализ, Теория вероятностей',
    course: '2 курс, 1 семестр'
  },
  {
    id: 3,
    rate: 3.6,
    name: 'Physics (Full guide)',
    university: 'Oxford',
    tags: 'Динамика, Статика',
    course: '1 курс, 2 семестр'
  },
  {
    id: 3,
    rate: 3.6,
    name: 'Physics (Full guide)',
    university: 'Oxford',
    tags: 'Динамика, Статика',
    course: '1 курс, 2 семестр'
  }
]

const appCourses = courses.map((item) => {
  return (
    <div key={item.id} className="course_card"><a href='/course'>
      <div className="course_img"></div>
      <div className="card_info">
        <div className="rate"><img src={star} alt='' style={{ marginLeft: '2.5%', marginRight: '42.5%'}}/>{item.rate}</div>
        <div className="points">
          <div className="point"><img src={cam} alt='' style={{ marginRight: '10px' }}/><b>{item.name}</b></div>
          <div className="point"><img src={chart} alt='' style={{ marginRight: '10px' }}/>{item.university}</div>
          <div className="point"><img src={hash} alt='' style={{ marginRight: '10px' }}/>{item.tags}</div>
          <div className="point"><img src={nb} alt='' style={{ marginRight: '10px' }}/>{item.course}</div>
        </div>
      </div></a>
    </div>
  )
})

function Feed() {

  return <>
    {appCourses}
    </>;
}

export default Feed;
