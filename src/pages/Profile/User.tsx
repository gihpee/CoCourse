import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { calculateRating } from '../../entities/course/lib/calculateRating'
import { formatDate } from '../../entities/course/lib/formatDate'
import { ICourse, ITelegramUser } from '../../entities/course/model/types'
import { fetchUser } from '../../entities/user/model/fetchUser'
import emptyHorizontalImage from '../../shared/assets/course/horizontalEmptyCourseImage.webp'
import nf from '../../shared/assets/course/nfeedarrow.svg'
import { BASE_URL } from '../../shared/config/api'
import './Profile.css'

function User() {
	window.scrollTo(0, 0)
	const { id } = useParams()

	const [userData, setUserData] = useState<ITelegramUser | null>(null)
	const [coursesData, setCoursesData] = useState<ICourse[]>([])
	const [feedbacks, setFeedbacks] = useState([])

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				try {
					const data = await fetchUser(id)

					const transformedCourses = data.created_courses.map(
						(course: ICourse) => ({
							...course,
							feedback: course.feedback.map(rate => ({
								rate: rate.toString(),
							})),
						})
					)

					setUserData(data)
					setCoursesData(transformedCourses)
					setFeedbacks(data.feedback)
				} catch (error) {
					console.error('Ошибка при запросе к серверу:', error)
				}
			}

			fetchData()
		}
	}, [id])

	let userCourses: JSX.Element[] = []

	if (coursesData) {
		userCourses = coursesData.map((item, index) => {
			const averageRate =
				item.feedback.length > 0 ? calculateRating(item.feedback) : 0

			const setImagePath = (imgPath: string | null): string => {
				if (!imgPath || imgPath.includes(`https://${BASE_URL}.runull`)) {
					return emptyHorizontalImage
				} else {
					return `url(https://${BASE_URL}.ru${item.image})`
				}
			}

			return (
				<Link to={`/course/${item.id}`} key={index} className='course_card'>
					<div
						className='course_img'
						style={{
							backgroundImage: setImagePath(item.image),
						}}
					></div>
					<div className='card_info'>
						<div className='row_grad_l'>
							<div
								className='grad_l'
								style={{
									width: `calc((100% / 5) * ${averageRate})`,
									background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`,
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
						<div className='points'>
							<div
								className='point'
								style={{
									fontFamily: 'NeueMachina',
									fontSize: '16px',
									lineHeight: '20px',
								}}
							>
								<b>{item.name}</b>
							</div>
							<div
								className='point'
								style={{ color: '#AAAAAA', fontSize: '14px' }}
							>
								{item.university}
							</div>
							<div
								className='point'
								style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
							>
								{item.date ? formatDate(item.date) : 'Дата не указана'}
							</div>
						</div>
						<div className='price_container'>
							<div className='price'>{item.price} RUB</div>
							<div className='status_container'>
								<div className='student_amount'>{item.amount_of_students}</div>
								<div className='course_status'>Куплено</div>
							</div>
						</div>
					</div>
				</Link>
			)
		})
	}

	const averageRate =
		feedbacks && feedbacks.length > 0 ? calculateRating(feedbacks) : 0

	return (
		<>
			<div
				className='back_btn'
				onClick={() => {
					window.history.back()
				}}
			></div>
			<div
				className='prev'
				style={{
					backgroundImage: `url(https://${BASE_URL}.ru${userData?.photo_url})`,
					marginTop: '-56px',
				}}
			>
				<p style={{ marginTop: '312px' }}>
					{userData?.first_name + ' ' + userData?.last_name}
				</p>
			</div>
			<div className='getContact_container'>
				<span>Отзывы</span>
				<Link to={`/user-feedback/${userData?.user_id}`} className='nfeedback'>
					<p>{averageRate.toFixed(1)}</p>
					<div className='nrow_grad_l'>
						<div
							className='ngrad_l'
							style={{
								width: `calc((100% / 5) * ${averageRate})`,
								background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`,
							}}
						></div>
					</div>
					<img src={nf} alt='' />
				</Link>
			</div>

			<span>Биография</span>
			<div className='select_col'>
				<div
					className='select'
					style={{ height: 'auto', whiteSpace: 'pre-line' }}
				>
					<p>{userData?.description ? userData.description : 'Не указано'}</p>
				</div>
			</div>

			<span>Университет</span>
			<div className='select_col'>
				<div className='select'>
					{userData?.university ? (
						<div className='selected_row'> {userData.university} </div>
					) : (
						<p>Не указано</p>
					)}
				</div>
			</div>

			<span>Предметы</span>
			<div className='select_col'>
				<div className='select'>
					{userData?.subjects ? (
						userData.subjects.map(option => (
							<div className='selected_row' key={option}>
								{option}
							</div>
						))
					) : (
						<p>Не указано</p>
					)}
				</div>
			</div>

			<div className='about'>
				<span>Курсы</span>
				{userCourses.length > 0 ? (
					userCourses
				) : (
					<p>Пользователь пока не опубликовал ни один курс</p>
				)}
			</div>

			<MainButton
				text='НАПИСАТЬ В ТЕЛЕГРАМ'
				onClick={() =>
					(window.location.href = `https://t.me/${userData?.username}`)
				}
			/>
		</>
	)
}

export default User
