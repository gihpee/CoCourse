import { FC } from 'react'
import styles from './CourseRating.module.css'

interface CourseInfoProps {
	title: string
	university: string
}

const CourseInfo: FC<CourseInfoProps> = ({ title, university }) => {
	return (
		<div className={styles['course-info']}>
			<h2 className={styles['course-info__title']}>{title}</h2>
			<p className={styles['course-info__university']}>{university}</p>
		</div>
	)
}

export default CourseInfo
