import { FC, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import { ICourse, IFeedback } from 'src/entities/course/model/types'
import fetchCourses from 'src/entities/feedback/model/fetchCourses'
import BottomSheet from 'src/shared/components/BottomSheet/BottomSheet'
import MainButton from 'src/shared/components/MainButton/MainButton'
import StarRating from 'src/shared/components/StarRating/StarRating'
import Camera from '../../shared/assets/feedback/Camera.svg'
import EmptyStar from '../../shared/assets/feedback/EmptyStar.svg'
import FillStar from '../../shared/assets/feedback/FillStar.svg'
import styles from './FeedbackPage.module.css'
import FeedbackCard from './ui/FeedbackCard/FeedbackCard'

const FeedbackPage: FC = () => {
	window.scrollTo(0, 0)

	const { id } = useParams()
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
	const [course, setCourse] = useState<ICourse>()
	const [isOpen, setIsOpen] = useState(false)
	const [userRating, setUserRating] = useState(0)

	console.log('userRating', userRating)

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
				setCourse(courseData)
				console.log('courseData.image', courseData.image)
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
				<MainButton
					onClickEvent={() => setIsOpen(true)}
					text='Оставить отзыв'
				/>
			</div>
			<BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<div className={styles['feedback-page__modal-title-wrapper']}>
					<h2 className={styles['feedback-page__modal-title']}>
						Оставить отзыв
					</h2>
					<div className={styles['feedback-page__modal-info']}>
						<div className={styles['feedback-page__modal-user']}>
							<img
								className={styles['feedback-page__modal-avatar']}
								src={course?.user.photo_url || ''}
								alt='Аватар пользователя'
							/>
							<h3 className={styles['feedback-page__modal-name']}>
								{course?.user.first_name + ' ' + course?.user.last_name}
							</h3>
						</div>
						<div className={styles['feedback-page__modal-course']}>
							<p className={styles['feedback-page__modal-course-name']}>
								{course?.name}
							</p>
							<p className={styles['feedback-page__modal-course-university']}>
								{course?.university}
							</p>
						</div>
					</div>

					<div className={styles['feedback-page__modal-image']}>
						{course?.image ? (
							<img
								src={course?.image}
								alt='Аватар курса'
								className={styles['feedback-page__modal-image-img']}
							/>
						) : (
							<div className={styles['feedback-page__modal-placeholder']}>
								<img
									src={Camera}
									alt=''
									className={styles['feedback-page__modal-placeholder-img']}
								/>
								<p className={styles['feedback-page__modal-placeholder-text']}>
									Обложка отсутствует
								</p>
							</div>
						)}
					</div>

					<div className={styles['feedback-page__modal-rating']}>
						<h2 className={styles['feedback-page__modal-rating-title']}>
							Как вам курс?
						</h2>

						<StarRating onRate={rating => setUserRating(rating)} />
					</div>

					<div className={styles['feedback-page__modal-comment']}>
						<h2 className={styles['feedback-page__modal-rating-title']}>
							Комментарий
						</h2>
						<textarea
							className={styles['feedback-page__modal-textarea']}
							name=''
							id=''
						></textarea>
					</div>

					<div className={styles['feedback-page__modal-actions']}>
						<button
							className={styles['feedback-page__modal-cancel']}
							onClick={() => setIsOpen(false)}
						>
							Отменить
						</button>
						<button className={styles['feedback-page__modal-submit']}>
							Отправить
						</button>
					</div>
				</div>
			</BottomSheet>
		</div>
	)
}

export default FeedbackPage
