import { calculateRating } from '../../entities/course/lib/calculateRating'
import { ICourse } from '../../entities/course/model/types'
import CourseCard from '../../features/courses/components/CourseCard/CourseCard'
import styles from './CardList.module.css'

const CardList: React.FC<{ courses: ICourse[] }> = ({ courses }) => {
	return (
		<div className={styles['card-list']}>
			{courses.map((item, index) => {
				const averageRate = item.feedback?.length
					? calculateRating(item.feedback)
					: 0

				return (
					<CourseCard
						key={index}
						itemCard={item}
						amountOfStudents={item.amount_of_students ?? 0}
						averageRate={averageRate}
						chanelName={item.name ?? ''}
						chanelPhoto={item.image ?? ''}
						price={item.price ?? 0}
						university={item.university ?? ''}
						isCoursePage={false}
						cid={String(item.id)}
						count={item.feedback?.length}
						isFeedPage={true}
					/>
				)
			})}
		</div>
	)
}

export default CardList
