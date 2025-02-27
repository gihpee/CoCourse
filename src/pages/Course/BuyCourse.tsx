import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import MainButton from '@twa-dev/mainbutton'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { calculateRating } from '../../entities/course/lib/calculateRating'
import { formatDate } from '../../entities/course/lib/formatDate'
import { fetchExchangeRate } from '../../entities/course/model/fetchExchangeRate'
import { fetchPaymentLink } from '../../entities/course/model/fetchLink'
import { handlePay } from '../../entities/course/model/paymentHandler'
import { createTransaction } from '../../entities/course/model/transaction'
import emptyHorizontalImage from '../../shared/assets/course/horizontalEmptyCourseImage.webp'
import redWallet from '../../shared/assets/course/red-wallet.webp'
import './Course.css'

import { BASE_URL } from '../../shared/config/api'

function BuyCourse() {
	const location = useLocation()
	const navigate = useNavigate()
	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	const data = location.state

	const [exchangeRate, setExchangeRate] = useState(null)
	const [paymentLink, setPaymentLink] = useState(null)
	const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Wallet'>('Card')

	const address = useTonAddress()

	/*useEffect(() => {
        if (address) {setPaymentMethod('Wallet')} else {setPaymentMethod('Card')}
    }, [address])*/

	const [tonConnectUI, setOptions] = useTonConnectUI()
	setOptions({ language: 'ru' })

	useEffect(() => {
		const fetchLink = async () => {
			try {
				const link = await fetchPaymentLink(data.id, id)
				setPaymentLink(link)
			} catch (error) {
				console.error('Ошибка при получении ссылки на оплату:', error)
			}
		}

		fetchLink()
	}, [id, data])

	useEffect(() => {
		const fetchRate = async () => {
			const rate = await fetchExchangeRate()
			setExchangeRate(rate)
		}

		fetchRate()
	}, [])

	const myTransaction = createTransaction(data, exchangeRate ?? 0)

	const handlePayment = () => {
		handlePay(
			paymentMethod,
			tonConnectUI,
			myTransaction,
			data,
			address,
			navigate,
			paymentLink ?? ''
		)
	}

	const averageRate =
		data?.feedback.length > 0 ? calculateRating(data.feedback) : 0

	const setImagePath = (imgPath: string | null): string => {
		if (!imgPath || imgPath.includes(`https://${BASE_URL}.runull`)) {
			return emptyHorizontalImage
		} else {
			return `url(https://${BASE_URL}.ru${data?.channel.photo})`
		}
	}

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
							backgroundImage: setImagePath(data?.channel.photo),
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
								<b>{data?.name}</b>
							</div>
							<div
								className='point'
								style={{ color: '#AAAAAA', fontSize: '14px' }}
							>
								{data?.university}
							</div>
							<div
								className='point'
								style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
							>
								{formatDate(data?.date)}
							</div>
						</div>
						<div className='price_container'>
							<div className='price'>{data?.price} RUB</div>
							<div className='status_container'>
								<div className='student_amount'>{data?.amount_of_students}</div>
							</div>
						</div>
					</div>
				</div>

				<span>Способ оплаты</span>
				{paymentMethod === 'Card' ? (
					<div
						className='payment_method'
						style={{ border: '1px solid #FF6117' }}
					>
						<div className='red_wallet'>
							<img src={redWallet} className='red_wallet_img' alt='' />
						</div>
						<p style={{ flexGrow: '1' }}>Оплата картой</p>
					</div>
				) : (
					<div
						className='payment_method'
						onClick={() => {
							setPaymentMethod('Card')
						}}
					>
						<div className='red_wallet'>
							<img src={redWallet} className='red_wallet_img' alt='' />
						</div>
						<p style={{ flexGrow: '1' }}>Оплата картой</p>
					</div>
				)}

				{/* {address && (
					<>
						{paymentMethod === 'Wallet' ? (
							<div
								className='payment_method'
								style={{ border: '1px solid #FF6117' }}
							>
								<img src={blueWallet} alt='' />
								<p style={{ flexGrow: '1' }}>Оплата криптой</p>
								<div className='discount_amount'>-10%</div>
							</div>
						) : (
							<div
								className='payment_method'
								onClick={() => {
									setPaymentMethod('Wallet')
								}}
							>
								<img src={blueWallet} alt='' />
								<p style={{ flexGrow: '1' }}>Оплата криптой</p>
								<div className='discount_amount'>-10%</div>
							</div>
						)}
						<span style={{ textTransform: 'none' }}>
							При оплате через Кошелек комиссия платформы не взимается, однако
							мы не предоставляем никаких гарантий возврата денежных средств.
						</span>
					</>
				)} */}

				<div className='pricecourse_container'>
					<div className='course_price'>
						{paymentMethod === 'Wallet' ? data?.price * 0.9 : data?.price}
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

				<MainButton text='ОПЛАТИТЬ' onClick={handlePayment} />
			</div>
		</>
	)
}

export default BuyCourse
