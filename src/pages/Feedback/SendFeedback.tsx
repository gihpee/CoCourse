import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IFeedback } from '../../entities/course/model/types'
import fetchCourses from '../../entities/feedback/model/fetchCourses'
import handlePublish from '../../entities/feedback/model/handlePublish'
import './SendFeedback.css'

function SendFeedback() {
	window.scrollTo(0, 0)
	const { id } = useParams()
	const { username } = window.Telegram.WebApp.initDataUnsafe.user
	const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
	const [sliderValue, setSliderValue] = useState(3)
	const [revValue, setRevValue] = useState('')
	const [modalFillOpen, setModalFillOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const course = await fetchCourses(id)

					if (course.feedback) {
						const transformedFeedbacks: IFeedback[] = course.feedback.map(
							feedback => ({
								user: course.user,
								author: course.user.user_id,
								course: course.id,
								date: new Date().toISOString(),
								rate: feedback.rate,
								review: feedback.review || '',
							})
						)

						setFeedbacks(transformedFeedbacks)
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [id])

	const userFeedback = feedbacks.find(item => item.user.username === username) //TODO: вынести или нет?

	useEffect(() => {
		if (userFeedback) {
			setSliderValue(prevValue =>
				prevValue !== userFeedback.rate ? userFeedback.rate : prevValue
			)
			setRevValue(prevValue =>
				prevValue !== userFeedback.review
					? userFeedback.review || ''
					: prevValue
			)
		}
	}, [userFeedback])

	const handleOkBtnClick = () => {
		setModalFillOpen(false)
	}

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSliderValue(Number(event.target.value))
	}

	const handleRevChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value, type } = e.target

		if (type === 'textarea') {
			if (e.target.scrollHeight === 32) {
				e.target.style.height = '24px'
			} else {
				e.target.style.height = '24px'
				e.target.style.height = e.target.scrollHeight + 'px'
			}
		}

		setRevValue(value)
	} // вынести после ui

	const handlePublishClick = () => {
		handlePublish(revValue, sliderValue, id, setModalFillOpen, navigate)
	}

	return (
		<div className='column'>
			{modalFillOpen && (
				<div className='modal' style={{ height: '120px', marginTop: '-120px' }}>
					<div className='modal-content'>
						<p>Заполните все обязательные поля</p>
						<button className='modal_btn' onClick={handleOkBtnClick}>
							Ок
						</button>
					</div>
				</div>
			)}

			<div className='feedback_top'>
				<div
					className='fback_btn'
					onClick={() => navigate(`/course/${id}`)}
				></div>
			</div>
			<span>ОЦЕНКА*</span>
			<div className='slider-container'>
				<input
					type='range'
					min='1'
					max='5'
					value={sliderValue}
					step='1'
					id='myRange'
					onChange={handleSliderChange}
				/>
			</div>
			<div className='row_grad'>
				<div
					className='grad'
					style={{
						width: `calc(48px * ${sliderValue} + (((100% - 240px) / 4) * ${
							sliderValue - 1
						}))`,
						background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(100% * ${
							6 - sliderValue
						}))`,
					}}
				></div>
			</div>
			<div className='fb_bg'>
				<div className='circle'></div>
				<div className='circle'></div>
				<div className='circle'></div>
				<div className='circle'></div>
				<div className='circle'></div>
			</div>

			<span style={{ marginTop: '12px' }}>КОММЕНТАРИЙ*</span>
			<div className='select_col'>
				<div className='select'>
					<textarea
						className='bio_textarea'
						placeholder='Поделись своим мнением...'
						name='fb_text'
						value={revValue}
						onChange={handleRevChange}
					/>
				</div>
			</div>

			<MainButton text='СОХРАНИТЬ' onClick={handlePublishClick} />
		</div>
	)
}

export default SendFeedback
