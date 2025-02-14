import { useEffect } from 'react'
//import { TonConnectButton } from '@tonconnect/ui-react';
import MainButton from '@twa-dev/mainbutton'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '../../entities/course/lib/formatDate'
import { ITransaction } from '../../entities/course/model/types'
import { fetchUserTransactions } from '../../entities/wallet/model/fetchUserTransactions'
import { fetchWithdraw } from '../../entities/wallet/model/fetchWithdraw'
import './Wallet.css'

function Wallet() {
	const navigate = useNavigate()
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const [coursesPaid, setCoursesPaid] = useState<ITransaction[]>([])
	const [coursesSelled, setCoursesSelled] = useState([])
	const [balance, setBalance] = useState(0)
	const [verifyed, setVerifyed] = useState(null)
	const [connectedPayments, setConnectedPayments] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
	// const userFriendlyAddress = useTonAddress()

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)

			if (result) {
				setCoursesPaid(result.paid_courses)
				setCoursesSelled(result.selled_courses)
				setBalance(result.balance)
				setVerifyed(result.verifyed)
				setConnectedPayments(result.connected)
			}
		}

		fetchData()
	}, [id])

	const handleConnectPayments = async () => {
		if (verifyed === 'Пройдена') {
			navigate('/connect-payments')
		} else {
			setModalOpen(true)
		}
	}

	const handleOkBtnClick = () => {
		setModalOpen(false)
		setWithdrawModalOpen(false)
	}

	const handleWithdraw = async () => {
		if (balance > 6000) {
			const success = await fetchWithdraw()

			if (success) {
				navigate('/profile')
			}
		}
		setWithdrawModalOpen(true)
	}

	const allTransactions = [...coursesPaid, ...coursesSelled]

	const transactions = allTransactions.map((item, index) => {
		var t_type = ''

		if (coursesPaid.some(transaction => transaction.id === item.id)) {
			t_type = 'Покупка'
		} else {
			t_type = 'Продажа'
		}

		return (
			<Link to={`/transaction/${item.id}`} className='transaction_card'>
				<div
					className='points'
					style={{
						backgroundColor: 'black',
						borderRadius: '8px',
						paddingBottom: '8px',
					}}
				>
					<div
						className='point_t'
						style={{
							fontFamily: 'NeueMachina',
							fontSize: '16px',
							lineHeight: '20px',
						}}
					>
						<b>{item.course.channel.name}</b>
					</div>
					<div
						className='point_t'
						style={{ color: '#AAAAAA', fontSize: '14px' }}
					>
						{item.course.university}
					</div>
					<div
						className='point_t'
						style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
					>
						{formatDate(item.course.date || 'Дата не указана')}
					</div>
				</div>
				<div className='points' style={{ marginTop: '0px' }}>
					<div
						className='point'
						style={{
							fontFamily: 'NeueMachina',
							fontSize: '16px',
							lineHeight: '20px',
							marginLeft: '4px',
						}}
					>
						<b>{t_type}</b>
					</div>
					<div
						className='point'
						style={{ color: '#AAAAAA', fontSize: '14px', marginLeft: '4px' }}
					>
						{item.method}
					</div>
					<div
						className='point'
						style={{
							color: '#AAAAAA',
							marginTop: '4px',
							fontSize: '14px',
							marginLeft: '4px',
						}}
					>
						{formatDate(item.date)}
					</div>
				</div>

				<div className='t_price_status' style={{ marginBottom: '8px' }}>
					<div className='t_price' style={{ marginLeft: '8px' }}>
						{item.price} RUB
					</div>
					{item.return_status === 0 && (
						<div className='course_status'>Успешно</div>
					)}
					{item.return_status === 1 && (
						<div className='course_status'>Возврат на рассмотрении</div>
					)}
					{item.return_status === 2 && (
						<div className='course_status'>Возврат</div>
					)}
				</div>
			</Link>
		)
	})

	return (
		<>
			<div className='back_btn' onClick={() => navigate(`/`)}></div>
			<div className='column' style={{ minHeight: '100vh' }}>
				{modalOpen && (
					<div className='blackout'>
						<div
							className='modal'
							style={{ height: '130px', marginTop: '-240px' }}
						>
							<div className='modal-content'>
								<p>Для подключения выплат необходимо пройти верификацию</p>
								<button className='modal_btn' onClick={handleOkBtnClick}>
									Ок
								</button>
							</div>
						</div>
					</div>
				)}

				{withdrawModalOpen && (
					<div className='blackout'>
						<div
							className='modal'
							style={{ height: '130px', marginTop: '-240px' }}
						>
							<div className='modal-content'>
								<p>Вывод средств возможен при балансе от 6000 рублей</p>
								<button className='modal_btn' onClick={handleOkBtnClick}>
									Ок
								</button>
							</div>
						</div>
					</div>
				)}

				<span style={{ marginTop: '20px' }}>Кошелек</span>
				{/*<TonConnectButton style={{marginBottom: '8px'}}/>*/}

				<div
					className='pricecourse_container'
					style={{
						height: 'auto',
						paddingTop: '8px',
						paddingBottom: '8px',
						marginBottom: '8px',
					}}
				>
					<div className='course_price'>
						{balance}
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
						Автоматический вывод денежных средств каждую пятницу при достижении
						минимального лимита 6000₽
					</span>
				</div>

				{verifyed === 'Не пройдена' ? (
					<Link
						to='/verificationN'
						className='field'
						style={{ marginTop: '0px' }}
					>
						<p>Пройдите верификацию</p>
						<div className='red_circle'>{verifyed}</div>
					</Link>
				) : (
					<div className='field' style={{ marginTop: '0px' }}>
						<p>Пройдите верификацию</p>
						{verifyed === 'На проверке' && (
							<div className='purple_circle'>{verifyed}</div>
						)}
						{verifyed === 'Пройдена' && (
							<div className='blue_box'>{verifyed}</div>
						)}
					</div>
				)}

				<div
					className='field'
					style={{ marginTop: '0px' }}
					onClick={handleConnectPayments}
				>
					<p>Подключите выплаты</p>
					{connectedPayments ? (
						<div className='blue_box'>Подключены</div>
					) : (
						<div className='red_circle'>Не подключены</div>
					)}
				</div>

				{/* {userFriendlyAddress ? (
					<div className='field' style={{ marginTop: '0px' }}>
						<p>Подключите кошелек</p>
						<div className='blue_box'>Подключен</div>
					</div>
				) : (
					<div
						className='field'
						style={{ marginTop: '0px' }}
						onClick={() => navigate('/connect-walletN')}
					>
						<p>Подключите кошелек</p>
						<div className='red_circle'>Не подключен</div>
					</div>
				)} */}

				{/*<button onClick={() => init()}>test</button>*/}

				<span style={{ marginTop: '8px' }}>История транзакций</span>
				{transactions}
			</div>
			<MainButton text='ВЫВОД СРЕДСТВ' onClick={handleWithdraw} />
		</>
	)
}

export default Wallet
