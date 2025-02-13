import { FC } from 'react'
import StarFeedbackIcon from 'src/shared/assets/course/StarFeedback.svg'
import styles from './Feedback.module.css'

const Feedback: FC<{ averageRate: number }> = ({ averageRate }) => {
	return (
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
					<h3 className={styles['feedback__title']}>Мои отзывы</h3>
					<div className={styles['feedback__unread-feedbacks']}>12</div>
				</div>
				<p className={styles['feedback__rating']}>
					{averageRate.toFixed(1)} (20)
				</p>
			</div>
		</div>
	)
}

export default Feedback
