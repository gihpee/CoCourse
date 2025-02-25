import { FC } from 'react'
import EmptyStar from '../../../../shared/assets/feedback/EmptyStar.svg'
import FillStar from '../../../../shared/assets/feedback/FillStar.svg'
import styles from './FeedbackCard.module.css'

interface IFeedbackCard {
	path: string
	username: string
	university: string
	date: string
	text: string
	rating: number
}

const FeedbackCard: FC<IFeedbackCard> = ({
	path,
	date,
	text,
	university,
	username,
	rating,
}) => {
	const stars = Array.from({ length: 5 }, (_, i) =>
		i < rating ? FillStar : EmptyStar
	)

	const formatDate = (isoString: string): string => {
		const dateNew = new Date(isoString)
		return dateNew.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	}

	return (
		<div className={styles['feedback-card']}>
			<div className={styles['feedback-card__header']}>
				<img
					className={styles['feedback-card__avatar']}
					src={path}
					alt='Картинка пользователя'
				/>
				<div className={styles['feedback-card__user-info']}>
					<p className={styles['feedback-card__username']}>{username}</p>
					<p className={styles['feedback-card__university']}>{university}</p>
				</div>
			</div>
			<div className={styles['feedback-card__content']}>
				<div className={styles['feedback-card__rating']}>
					<div className={styles['feedback-card__stars']}>
						{stars.map((star, index) => (
							<img
								key={index}
								className={styles['feedback-card__star']}
								src={star}
								alt='Рейтинг звезда'
							/>
						))}
					</div>
					<p className={styles['feedback-card__date']}>{formatDate(date)}</p>
				</div>
				<p className={styles['feedback-card__text']}>{text}</p>
			</div>
		</div>
	)
}

export default FeedbackCard
