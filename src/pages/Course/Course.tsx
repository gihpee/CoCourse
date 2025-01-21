import MainButton from '@twa-dev/mainbutton'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { calculateRating } from '../../entities/course/lib/calculateRating'
import { formatDate } from '../../entities/course/lib/formatDate'
import { useCourseData } from '../../entities/course/model/useCourseData'
import { useUserCourses } from '../../entities/course/model/useUserCourses'
import blueWallet from '../../shared/assets/course/blue-wallet.svg'
import nf from '../../shared/assets/course/nfeedarrow.svg'
import redWallet from '../../shared/assets/course/red-wallet.svg'
import toggle from '../../shared/assets/profile/toggle.svg'
import './Course.css'

function Course() {
	window.scrollTo(0, 0)
	const { cid } = useParams()
	const {
		data: courseDataComponent,
		isLoading,
		error,
	} = useCourseData(cid || '')

	const userCourses = useUserCourses(window.Telegram.WebApp.initData)

	// const [userCoursesComponent, setUserCoursesComponent] = useState<
	// 	{ id: number }[]
	// >([])

	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (courseDataComponent) {
	// 		dispatch(setCourseData(courseDataComponent))
	// 	}

	// 	if (userCourses) {
	// 		const currentUser = userCourses.find(user => user.user_id === id)
	// 		if (currentUser) {
	// 			const coursesWithIds = currentUser.bought_courses.map(courseId => ({
	// 				id: courseId,
	// 			}))
	// 			setUserCoursesComponent(coursesWithIds)
	// 			dispatch(setUserCourses(coursesWithIds))
	// 		} else {
	// 			console.log('User not found.')
	// 		}
	// 	}
	// }, [courseDataComponent, id, dispatch, userCourses])

	if (isLoading) return <div className='loading'></div>
	if (error) return <div>{error}</div>

	if (!courseDataComponent?.id) {
		return <div className='loading'></div> // или что-то другое, пока данные загружаются
	}

	const copyToClipboard = () => {
		if (cid) {
			const courseLink = `t.me/CoCourseBot/CoCourseApp?startapp=course_${cid}`
			navigator.clipboard
				.writeText(courseLink)
				.then(() => {
					console.log('Ссылка успешно скопирована!')
				})
				.catch(err => {
					console.error('Ошибка копирования:', err)
				})
		} else {
			console.log('ID курса отсутствует. Невозможно скопировать ссылку.')
		}
	}

	const shareCourseLink = () => {
		if (cid) {
			const courseLink = `t.me/CoCourseBot/CoCourseApp?startapp=course_${cid}`
			if (navigator.share) {
				navigator
					.share({
						title: 'Курс',
						text: 'Посмотрите этот курс!',
						url: courseLink,
					})
					.then(() => console.log('Ссылка успешно поделена!'))
					.catch(error =>
						console.error('Ошибка при использовании функции поделиться:', error)
					)
			} else {
				console.log('Ваш браузер не поддерживает функцию "Поделиться".')
			}
		} else {
			console.log('ID курса отсутствует. Невозможно поделиться ссылкой.')
		}
	}

	const paid = userCourses?.bought_courses?.some(
		course => course.id === Number(cid)
	)

	//TODO: вынести в отдельный компонент
	const topics = courseDataComponent.topics?.map(
		(item: { topic: string; desc: string }, index: number) => {
			return (
				<div key={index} className='accordion-item'>
					<input
						type='checkbox'
						name='acor'
						id={`acor${index}`}
						className='accordion-checkbox'
					/>
					<label htmlFor={`acor${index}`} className='accordion-label'>
						{item.topic}
						<img src={toggle} className='icon' alt='Toggle' />
					</label>
					<div className='accordion-body'>
						<p>{item.desc}</p>
					</div>
				</div>
			)
		}
	)

	let averageRate = 0

	const feedback = courseDataComponent.feedback ?? []

	if (feedback.length > 0) {
		averageRate = calculateRating(feedback)
	}

	//TODO: вынести в отдельный компонент
	return (
		<>
			<div className='top_panel'>
				<div className='top_panel_back_btn' onClick={() => navigate(`/`)}></div>
				<div
					className='status_container'
					style={{
						padding: '8px',
						height: '32px',
						alignItems: 'center',
						borderRadius: '24px',
						background: 'rgba(16,16,16, 0.7)',
						backdropFilter: 'blur(10px)',
						right: '8px',
					}}
				>
					<div className='student_amount' style={{ borderRadius: '16px' }}>
						{courseDataComponent.amount_of_students}
					</div>
					{paid && (
						<div className='course_status' style={{ borderRadius: '16px' }}>
							Куплено
						</div>
					)}
				</div>
			</div>
			<div
				className='prev'
				style={{
					backgroundImage: `url(https://comncourse.ru${courseDataComponent.channel?.photo})`,
					marginTop: '-56px',
				}}
			>
				<p>{courseDataComponent.channel?.name}</p>
			</div>
			<div className='getContact_container' style={{ paddingBottom: '0px' }}>
				<span>ЦЕНА</span>
				<div className='pricecourse_container'>
					{Number(courseDataComponent.price) === 0 ? (
						<div className='course_price'>БЕСПЛАТНО</div>
					) : (
						<div className='course_price'>
							{courseDataComponent.price}
							<span
								style={{
									color: 'white',
									fontFamily: 'NeueMachina',
									fontSize: '14px',
									margin: 'auto',
								}}
							>
								{' '}
								RUB
							</span>
						</div>
					)}
					<span style={{ margin: '0px', width: '100%' }}>
						AD ID: {courseDataComponent.id}
					</span>
				</div>
				<div
					className='payment_method'
					style={{ marginTop: '8px', border: 'none' }}
				>
					<img src={blueWallet} alt='' />
					<p style={{ flexGrow: '1' }}>Оплата криптой</p>
					<div className='discount_amount'>-10%</div>
				</div>
				<div className='payment_method' style={{ border: 'none' }}>
					<img src={redWallet} alt='' />
					<p style={{ flexGrow: '1' }}>Оплата картой</p>
				</div>
			</div>
			<span style={{ marginTop: '16px' }}>Отзывы</span>
			<Link
				to={`/course-feedback/${cid}`}
				className='nfeedback'
				style={{
					width: 'calc(100% - 24px)',
					marginBottom: '8px',
					marginLeft: '8px',
				}}
			>
				<p>{averageRate.toFixed(1)}</p>
				<div className='nrow_grad_l' style={{ width: 'calc(100% - 120px)' }}>
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

			<span style={{ marginTop: '8px' }}>Поделиться Курсом</span>
			<div className='select_col'>
				{courseDataComponent.university?.length ? (
					<div className='selected_row'>
						t.me/CoCourseBot/CoCourseApp?startapp=course_{cid}
					</div>
				) : (
					<p>Не указано</p>
				)}
				<div className='wrapper_buttons'>
					<div className='button_share' onClick={copyToClipboard}>
						<p>Копировать</p>
					</div>
					<div className='button_share' onClick={shareCourseLink}>
						<p>Поделиться</p>
					</div>
				</div>
			</div>

			<span style={{ marginTop: '8px' }}>Описание</span>
			<div className='select_col'>
				<div
					className='select'
					style={{ height: 'auto', whiteSpace: 'pre-line' }}
				>
					<p>{courseDataComponent.description}</p>
				</div>
			</div>

			<span style={{ marginTop: '8px' }}>Университет</span>
			<div className='select_col'>
				<div className='select'>
					{courseDataComponent.university?.length ? (
						<div className='selected_row'>{courseDataComponent.university}</div>
					) : (
						<p>Не указано</p>
					)}
				</div>
			</div>

			<span style={{ marginTop: '8px' }}>Предмет</span>
			<div className='select_col'>
				<div className='select'>
					{courseDataComponent.subject ? (
						<div className='selected_row'>{courseDataComponent.subject}</div>
					) : (
						<p>Не указано</p>
					)}
				</div>
			</div>

			<span style={{ marginBottom: '8px', marginTop: '8px' }}>Содержание</span>
			{topics && topics.length > 0 ? (
				<div className='accordion'>{topics}</div>
			) : (
				<p style={{ alignSelf: 'center' }}>Не указано</p>
			)}

			<span style={{ marginBottom: '0px' }}>Ментор</span>
			<div className='card_mentor'>
				<Link
					to={`/user/${courseDataComponent.user?.user_id}`}
					className='card_wp'
				>
					<div
						style={{
							width: '40px',
							height: '40px',
							marginLeft: '8px',
							borderRadius: '8px',
							backgroundImage: `url(https://comncourse.ru${courseDataComponent.user?.photo_url})`,
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
							<b>
								{courseDataComponent.user?.first_name +
									' ' +
									courseDataComponent.user?.last_name}
							</b>
						</div>
						<div className='point_user'>
							{courseDataComponent.user?.university}
						</div>
					</div>
				</Link>
			</div>

			<span style={{ marginTop: '8px' }}>Дата публикации</span>
			<div className='field'>
				<p>
					{courseDataComponent.date
						? formatDate(courseDataComponent.date)
						: 'Дата не указана'}
				</p>
			</div>

			{paid || Number(courseDataComponent.price) === 0 ? (
				<MainButton
					text='К УЧЕБЕ'
					onClick={() => {
						if (courseDataComponent.channel?.url) {
							window.location.href = courseDataComponent.channel.url
						} else {
							console.log('URL не доступен')
						}
					}}
				/>
			) : (
				<MainButton
					text='ПРИСОЕДИНИТЬСЯ'
					onClick={() =>
						navigate('/buy-course', { state: courseDataComponent })
					}
				/>
			)}
		</>
	)
}

export default Course
