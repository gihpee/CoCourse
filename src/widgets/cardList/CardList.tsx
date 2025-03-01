import { calculateRating } from '../../entities/course/lib/calculateRating'
import { ICourse } from '../../entities/course/model/types'
import CourseCard from '../../features/courses/components/CourseCard/CourseCard'
import styles from './CardList.module.css'

const CardList: React.FC<{ courses: ICourse[] }> = ({ courses }) => {
	console.log('courses', courses)
	console.log('courses.length', courses.length)

	return (
		<div className={styles['card-list']}>
			{courses.length > 0 ? (
				courses.map((item, index) => {
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
				})
			) : (
				<div className={styles['card-list__main-wrapper-empty-courses']}>
					<div className={styles['card-list__wrapper-empty-courses-texts']}>
						<h2 className={styles['card-list__empty-courses-title']}>
							Такого курса нет :(
						</h2>
						<p className={styles['card-list__empty-courses-text']}>
							Попробуй написать по-другому
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default CardList
