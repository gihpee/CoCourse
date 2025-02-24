import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import { IFeedback } from 'src/entities/course/model/types'
import fetchCourses from 'src/entities/feedback/model/fetchCourses'
import MainButton from 'src/shared/components/MainButton/MainButton'
import EmptyStar from '../../shared/assets/feedback/EmptyStar.svg'
import FillStar from '../../shared/assets/feedback/FillStar.svg'
import styles from './FeedbackPage.module.css'
import FeedbackCard from './ui/FeedbackCard/FeedbackCard'

const FeedbackPage: FC = () => {
	window.scrollTo(0, 0)

	const { id } = useParams()
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	useEffect(() => {
		const loadCourses = async () => {
			try {
				const courseData = await fetchCourses(id || 'defaultId')

				const feedbackData = courseData.feedback

				setFeedbacks(feedbackData)
			} catch (error) {
				console.error('Error loading courses or feedbacks:', error)
			}
		}

		loadCourses()
	}, [id])

	const averageRate = useMemo(() => {
		return feedbacks.length > 0 ? calculateRating(feedbacks) : 0
	}, [feedbacks])

	const stars = Array.from({ length: 5 }, (_, i) =>
		i < averageRate ? FillStar : EmptyStar
	)

	return (
		<div className={styles['feedback-page']}>
			<div className={styles['feedback-page__header']}>
				<div className={styles['feedback-page__title-wrapper']}>
					<h1 className={styles['feedback-page__title']}>Отзывы</h1>
					<p className={styles['feedback-page__count']}>{feedbacks.length}</p>
				</div>
				<div className={styles['feedback-page__rating']}>
					<h2 className={styles['feedback-page__rating-value']}>
						{averageRate}
					</h2>
					<div className={styles['feedback-page__rating-info']}>
						<div className={styles['feedback-page__rating-bar']}>
							{stars.map((star, index) => (
								<img
									key={index}
									className={styles['feedback-page__star']}
									src={star}
									alt='Рейтинг звезда'
								/>
							))}
						</div>
						<p className={styles['feedback-page__rating-text']}>
							Мнение пользователей
						</p>
					</div>
				</div>
			</div>
			<div className={styles['feedback-page__list']}>
				{feedbacks.map((item, index) => (
					<FeedbackCard
						date={item.date}
						path={item.user.photo_url || ''}
						text={item.review || ''}
						university={item.user.university || ''}
						username={item.user.first_name + ' ' + item.user.last_name}
						rating={item.rate}
						key={index}
					/>
				))}
			</div>
			<div className={styles['feedback-page__button']}>
				<MainButton onClickEvent={() => console.log(1)} text='Оставить отзыв' />
			</div>
		</div>
	)
}

export default FeedbackPage
