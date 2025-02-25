import { FC } from 'react'
import BuyersIcon from '../../../shared/assets/course/Buyers.svg'
import StarFeedbackIcon from '../../../shared/assets/course/StarFeedback.svg'
import { CourseRatingProps } from '../model/types'
import styles from './CourseRating.module.css'

const CourseRating: FC<CourseRatingProps> = ({
	amountOfStudents,
	averageRate,
	count,
}) => {
	return (
		<div className={styles['course-rating']}>
			<div className={styles['course-rating__buyers']}>
				<img
					src={BuyersIcon}
					alt='Количество покупателей'
					className={styles['course-rating__buyers-img']}
				/>
				<p className={styles['course-rating__buyers-text']}>
					Купили: {amountOfStudents} раз
				</p>
			</div>
			<div className={styles['course-rating__stars']}>
				<img
					src={StarFeedbackIcon}
					alt='Рейтинг курса'
					className={styles['course-rating__stars-img']}
				/>
				<p className={styles['course-rating__stars-text']}>
					{averageRate?.toFixed(1)} ({count} отзывов)
				</p>
			</div>
		</div>
	)
}

export default CourseRating
