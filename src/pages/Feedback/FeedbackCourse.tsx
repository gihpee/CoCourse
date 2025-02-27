import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IFeedback } from '../../entities/course/model/types'
import fetchCourses from '../../entities/feedback/model/fetchCourses'
import { BASE_URL } from '../../shared/config/api'
import './Feedback.css'

function FeedbackCourse() {
	window.scrollTo(0, 0)

	const { id } = useParams()
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
	const navigate = useNavigate()

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

	const cards = feedbacks.map((item, index) => {
		return (
			<div
				className='course_card'
				id={index.toString()}
				style={{ paddingTop: '0px' }}
			>
				<div className='card_mentor'>
					<div
						className='card_wp'
						style={{ backgroundColor: 'black', width: 'calc(100% - 16px)' }}
					>
						<div
							style={{
								width: '40px',
								height: '40px',
								marginLeft: '8px',
								borderRadius: '8px',
								backgroundImage: `url(https://${BASE_URL}.ru${item.user.photo_url})`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
							}}
						></div>
						<div className='points_user'>
							<div
								className='point_user'
								style={{
									fontFamily: 'NeueMachina',
									fontSize: '16px',
									color: 'white',
								}}
							>
								<b>{item.user.first_name + ' ' + item.user.last_name}</b>
							</div>
							<div className='point_user'>{item.user.university}</div>
						</div>
					</div>
				</div>
				<div className='card_info' style={{ paddingTop: '0px' }}>
					<div className='row_grad_l'>
						<div
							className='grad_l'
							style={{
								width: `calc((100% / 5) * ${item.rate})`,
								background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${item.rate}))`,
							}}
						></div>
					</div>
					<div
						style={{
							width: 'calc(100% - 16px)',
							backgroundColor: 'black',
							height: '16px',
							borderRadius: '16px',
							zIndex: '-10',
							marginTop: '-16px',
						}}
					></div>
				</div>
				<p
					style={{
						marginTop: '8px',
						width: 'calc(100% - 16px)',
						marginBottom: '8px',
					}}
				>
					{item.review}
				</p>
			</div>
		)
	})

	return (
		<div className='column'>
			<div className='feedback_top'>
				<div
					className='fback_btn'
					onClick={() => navigate(`/course/${id}`)}
				></div>
			</div>
			<span style={{ marginBottom: '8px' }}>Отзывы</span>
			{cards.length > 0 ? cards : <p>Пока нет ни одного отзыва</p>}
			<MainButton
				text='ОСТАВИТЬ ОТЗЫВ'
				onClick={() => (window.location.href = `/send-feedback/${id}`)}
			/>
		</div>
	)
}
export default FeedbackCourse
