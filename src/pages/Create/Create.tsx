import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import plus from '../../shared/assets/create/plus.svg'
import './Create.css'

function Create() {
	window.scrollTo(0, 0)
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	// const [coursesData, setCoursesData] = useState<ICourse[]>([])
	// const userFriendlyAddress = useTonAddress(false)
	const [modalOpen, setModalOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				console.log(1)
				// const result = await fetchCoursesData(id)
				// setCoursesData(result)
				// setCoursesData([])
			} catch (error) {
				console.error('Error fetching courses data:', error)
			}
		}

		fetchCourses()
	}, [id])

	const skipCheckWallet = () => {
		// if (!userFriendlyAddress) {
		// 	setModalOpen(true)
		// } else {
		navigate('/create-course')
		// }
	}

	const handleOkBtnClick = () => {
		setModalOpen(false)
	}

	var userCourses

	// if (coursesData) {
	// 	userCourses = coursesData.map((item, index) => {
	// 		const averageRate = item.feedback ? calculateRating(item.feedback) : 0

	// 		return (
	// 			<Link
	// 				to={`/edit-course/${item.id}`}
	// 				key={index}
	// 				className='course_card'
	// 			>
	// 				<div
	// 					className='course_img'
	// 					style={{ backgroundImage: `url(${item.image})` }}
	// 				></div>
	// 				<div className='card_info'>
	// 					<div className='row_grad_l'>
	// 						<div
	// 							className='grad_l'
	// 							style={{
	// 								width: `calc((100% / 5) * ${averageRate})`,
	// 								background: `linear-gradient(to right, #EA4A4F 0%, #D8BB55, #7EBB69 calc(500% / ${averageRate}))`,
	// 							}}
	// 						></div>
	// 					</div>
	// 					<div
	// 						style={{
	// 							width: 'calc(100% - 16px)',
	// 							backgroundColor: 'black',
	// 							height: '16px',
	// 							borderRadius: '16px',
	// 							zIndex: '-10',
	// 							marginTop: '-16px',
	// 						}}
	// 					></div>
	// 					<div className='points'>
	// 						<div
	// 							className='point'
	// 							style={{
	// 								fontFamily: 'NeueMachina',
	// 								fontSize: '16px',
	// 								lineHeight: '20px',
	// 							}}
	// 						>
	// 							<b>{item.name}</b>
	// 						</div>
	// 						<div
	// 							className='point'
	// 							style={{ color: '#AAAAAA', fontSize: '14px' }}
	// 						>
	// 							{item.university}
	// 						</div>
	// 						<div
	// 							className='point'
	// 							style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
	// 						>
	// 							{formatDate(item.date || 'Дата не указана')}
	// 						</div>
	// 					</div>
	// 					<div className='price_container'>
	// 						<div className='price'>{item.price} RUB</div>
	// 						<div className='status_container'>
	// 							{!item.is_draft && (
	// 								<div className='student_amount'>
	// 									{item.amount_of_students}
	// 								</div>
	// 							)}
	// 							{item.is_draft ? (
	// 								<div className='course_status'>Черновик</div>
	// 							) : (
	// 								<div className='course_status'>Мой</div>
	// 							)}
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</Link>
	// 		)
	// 	})
	// }

	return (
		<div style={{ minHeight: '100vh' }}>
			<div className='create_button' onClick={skipCheckWallet}>
				<div className='billet_cb'>
					<img src={plus} alt='' />
					<p>Создать курс</p>
				</div>
			</div>
			<div className='column'>
				{modalOpen && (
					<div
						className='modal'
						style={{ height: '140px', marginTop: '-140px' }}
					>
						<div className='modal-content'>
							<p>Для создания курса необходимо подключить кошелек</p>
							<button className='modal_btn' onClick={handleOkBtnClick}>
								Ок
							</button>
						</div>
					</div>
				)}
				{userCourses}
			</div>
		</div>
	)
}

export default Create
