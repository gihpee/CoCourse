import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { calculateRating } from '../../entities/course/lib/calculateRating'
import { formatDate } from '../../entities/course/lib/formatDate'
import { ITransaction } from '../../entities/course/model/types'
import { fetchTransactionData } from '../../entities/wallet/model/fetchGetTransaction'
import { BASE_URL } from '../../shared/config/api'
import './Wallet.css'

function Transaction() {
	const navigate = useNavigate()
	const { tid } = useParams()
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [data, setData] = useState<ITransaction | null>(null)

	useEffect(() => {
		if (!tid) {
			console.error('Transaction ID is undefined')
			return
		}

		const fetchData = async () => {
			try {
				const result = await fetchTransactionData(tid)
				setData(result)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [tid])

	const averageRate =
		data?.course?.feedback &&
		Array.isArray(data.course.feedback) &&
		data.course.feedback.length > 0
			? calculateRating(data.course.feedback)
			: 0

	return (
		<>
			<div
				className='back_btn'
				onClick={() => {
					window.history.back()
				}}
			></div>
			<div className='column' style={{ minHeight: '100vh' }}>
				<span style={{ marginTop: '20px' }}>Объявление</span>

				<div className='course_card'>
					<div
						className='course_img'
						style={{
							backgroundImage: `url(https://${BASE_URL}.ru${data?.course.channel.photo})`,
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
								<b>{data?.course.channel.name}</b>
							</div>
							<div
								className='point'
								style={{ color: '#AAAAAA', fontSize: '14px' }}
							>
								{data?.course.university}
							</div>
							<div
								className='point'
								style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
							>
								{formatDate(data?.course.date || 'Дата не указана')}
							</div>
						</div>
						<div className='price_container'>
							<div className='price'>{data?.course.price} RUB</div>
							<div className='status_container'>
								<div className='student_amount'>
									{data?.course.amount_of_students}
								</div>
							</div>
						</div>
					</div>
				</div>

				<span style={{ marginTop: '8px' }}>Тип транзакции</span>
				<div className='field' style={{ marginTop: '0' }}>
					{data?.return_status === 0 &&
						(data?.buyer === id ? <p>Покупка</p> : <p>Продажа</p>)}
					{data?.return_status === 1 && <p>Возврат на рассмотрении</p>}
					{data?.return_status === 2 &&
						(data?.buyer === id ? (
							<p>Возврат (в вашу пользу)</p>
						) : (
							<p>Возврат (не в вашу пользу)</p>
						))}
				</div>

				<span style={{ marginTop: '8px' }}>Способ оплаты</span>
				<div className='field' style={{ marginTop: '0' }}>
					<p>{data?.method}</p>
					{/*<div className="discount_amount">-10%</div>*/}
				</div>

				<span style={{ marginTop: '8px' }}>Итог</span>
				<div className='pricecourse_container'>
					<div className='course_price'>
						{data?.price}
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
					<span style={{ margin: '0px', width: '100%', textTransform: 'none' }}>
						Вознаграждение продавца
					</span>
				</div>

				<span style={{ marginTop: '8px' }}>Дата транзакции</span>
				<div className='field' style={{ marginTop: '0' }}>
					<p>{formatDate(data?.date || 'Дата не указана')}</p>
				</div>
			</div>
			{data?.buyer === id &&
				data?.state === 'HOLD' &&
				data?.method === 'Card' &&
				data?.return_status === 0 && (
					<MainButton
						text='ОФОРМИТЬ ВОЗВРАТ'
						onClick={() => navigate('/return-form', { state: { data: data } })}
					/>
				)}
		</>
	)
}

export default Transaction
