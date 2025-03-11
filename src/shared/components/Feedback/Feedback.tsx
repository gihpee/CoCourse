import { FC } from 'react'
import { Link } from 'react-router-dom'
import StarFeedbackIcon from 'src/shared/assets/course/StarFeedback.svg'
import styles from './Feedback.module.css'

const Feedback: FC<{
	averageRate: number
	isCoursePage: boolean
	isAuthor?: boolean
	path: string
	count: number
}> = ({ averageRate, isCoursePage, isAuthor, path, count }) => {
	return (
		<Link to={path}>
			<div className={styles['feedback']}>
				<div className={styles['feedback__icon']}>
					<img
						src={StarFeedbackIcon}
						alt='Мои отзывы'
						className={styles['feedback__icon-img']}
					/>
				</div>
				<div className={styles['feedback__content']}>
					<div className={styles['feedback__wrapper-title']}>
						<h3 className={styles['feedback__title']}>
							{isCoursePage ? 'Отзывы' : !isAuthor ? 'Отзывы' : 'Мои отзывы'}
						</h3>
					</div>
					<p className={styles['feedback__rating']}>
						{averageRate.toFixed(1)} ({count})
					</p>
				</div>
			</div>
		</Link>
	)
}

export default Feedback
