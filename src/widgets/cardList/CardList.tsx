import { ICourse } from '../../entities/course/model/types'
import Card from '../../shared/card/Card'

interface CardListProps {
	courses: ICourse[]
	userCourses: ICourse[]
}

const CardList: React.FC<CardListProps> = ({ courses, userCourses }) => {
	return (
		<>
			{courses.map((item, index) => (
				<Card
					itemCard={item}
					indexCard={index}
					userCoursesCard={userCourses}
					key={item.id}
				/>
			))}
		</>
	)
}

export default CardList
