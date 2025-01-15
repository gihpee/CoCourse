import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { calculateRating } from '../../entities/course/lib/calculateRating'
import { formatDate } from '../../entities/course/lib/formatDate'
import { fetchUserCourses } from '../../entities/course/model/fetchUserCourses'
import { ITelegramUser } from '../../entities/course/model/types'
import nf from '../../shared/assets/course/nfeedarrow.svg'
import './Profile.css'

function Home() {
	window.scrollTo(0, 0)
	const { id, first_name, last_name, username } =
		window.Telegram.WebApp.initDataUnsafe.user

	const navigate = useNavigate()

	const [userData, setUserData] = useState<ITelegramUser | null>(null)
	const [coursesData, setCoursesData] = useState<ITelegramUser | number[]>()
	const [feedbacks, setFeedbacks] = useState<number[]>([])
	const [selectedOptions, setSelectedOptions] = useState<string[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const userDataArray = await fetchUserCourses(
				window.Telegram.WebApp.initData
			)
			if (userDataArray && userDataArray[0]) {
				const telegramUser = userDataArray[0]

				const userData: ITelegramUser = {
					user_id: telegramUser.user_id,
					username: telegramUser.username,
					first_name: telegramUser.first_name,
					last_name: telegramUser.last_name,
					university: telegramUser.university || '',
					description: telegramUser.description || '',
					subjects: telegramUser.subjects || [],
					feedback: telegramUser.feedback || [],
					notify: telegramUser.notify,
					photo_url: telegramUser.photo_url || '',
					created_courses: telegramUser.created_courses || [],
					bought_courses: telegramUser.bought_courses || [],
					registrated: telegramUser.registrated,
					verifyed: telegramUser.verifyed,
					connected_payments: telegramUser.connected_payments,
					comn: telegramUser.comn,
					balance: telegramUser.balance,
					is_staff: telegramUser.is_staff,
					is_active: telegramUser.is_active,
				}

				setUserData(userData)
				setFeedbacks(userData.feedback || [])
				setCoursesData(userData.created_courses || [])
			} else {
				console.log('No user data found.')
			}
		}

		fetchData()
	}, [id, first_name, last_name, username])

	let userCourses: JSX.Element[] = []

	if (coursesData) {
		userCourses = coursesData.map((item, index) => {
			var averageRate = item.feedback ? calculateRating(item.feedback) : 0

			return (
				<Link
					to={`/edit-course/${item.id}`}
					key={index}
					className='course_card'
				>
					<div
						className='course_img'
						style={{
							backgroundImage: `url(https://comncourse.ru${item.image})`,
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
								{formatDate(item.date)}
							</div>
						</div>
						<div className='price_container'>
							<div className='price'>{item.price} RUB</div>
							<div className='status_container'>
								{!item.is_draft && (
									<div className='student_amount'>
										{item.amount_of_students}
									</div>
								)}
								{item.is_draft ? (
									<div className='course_status'>Черновик</div>
								) : (
									item.on_moderation && (
										<div className='course_status'>На модерации</div>
									)
								)}
							</div>
						</div>
					</div>
				</Link>
			)
		})
	}

	var averageRate = feedbacks.length > 0 ? calculateRating(feedbacks) : 0

	if (!userData) {
		return <div className='loading'></div>
	}

	return (
		<>
			<div className='top_panel'>
				<div className='top_panel_back_btn' onClick={() => navigate(`/`)}></div>
				<Link to={`/edit-profile/${userData?.id}`} className='edit_btn'></Link>
			</div>
			<div
				className='prev'
				style={{
					backgroundImage: `url(https://comncourse.ru${userData?.photo_url})`,
					marginTop: '-56px',
				}}
			>
				<p style={{ marginTop: '312px' }}>
					{userData?.first_name + ' ' + userData?.last_name}
				</p>
			</div>
			{/*<Link to={`/edit-profile/${userData.id}`} className="edit_container">
              <div className="billet">
                <img src={pencil} alt='' />
                <p>Редактор</p>
              </div>
              </Link>*/}
			<div className='getContact_container'>
				<span>Отзывы</span>
				<Link to={`/user-feedback/${userData.user_id}`} className='nfeedback'>
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
					<p>{userData.description ? userData.description : 'Не указано'}</p>
				</div>
			</div>

			<span>Университет</span>
			<div className='select_col'>
				<div className='select'>
					{userData.university ? (
						<div className='selected_row'> {userData.university} </div>
					) : (
						<p>Не указано</p>
					)}
				</div>
			</div>

			<span>Предметы</span>
			<div className='select_col'>
				<div className='select'>
					{userData.subjects ? (
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
					<p>Вы пока не опубликовали ни один курс</p>
				)}
			</div>

			<MainButton
				text='CОЗДАТЬ КУРС'
				onClick={() => navigate('/connect-bot')}
			/>
		</>
	)
}

export default Home
