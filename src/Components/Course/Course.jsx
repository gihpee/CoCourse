import React from "react";
import "./Course.css";

const course = {
    name: 'Econometrics (full guide)',
    rate: '4.6',
    univ: 'HSE',
    course: '1 курс',
    description: 'aweinfiwhiehbwfihifhwnfniwjenfijwefhiwebhfiwheiwfjenfiwjenfiwenfiwjenfiwjnefijwneijfwijenfijwefijwijf',
    subject: 'Экономика',
    topics: [
        {
            id: 1,
            content: 'traaash'
        },
        {
            id: 2,
            content: 'topic 2'
        },
        {
            id: 3,
            content: 'toooooooooooopic 3 :))))'
        },
        {
            id: 4,
            content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        }
    ]
}

const topics = course.topics.map((item) => {
    return (
        <div key={item.id} className="course_topics">

        </div>
    )
})

function Course() {
  return <div>Содержимое раздела курс</div>;
}

export default Course;