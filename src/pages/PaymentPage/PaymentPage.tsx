import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { FC, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import { fetchExchangeRate } from 'src/entities/course/model/fetchExchangeRate'
import { fetchPaymentLink } from 'src/entities/course/model/fetchLink'
import { handlePay } from 'src/entities/course/model/paymentHandler'
import { createTransaction } from 'src/entities/course/model/transaction'
import { ICourse } from 'src/entities/course/model/types'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'
import CourseCard from 'src/features/courses/components/CourseCard/CourseCard'
import Feedback from 'src/shared/components/Feedback/Feedback'
import MainButton from 'src/shared/components/MainButton/MainButton'
import ModalNotification from 'src/shared/components/ModalNotification/ModalNotification'
import Sales from 'src/shared/components/Sales/Sales'
import Credit_Card from '../../shared/assets/course/Credit_Card.svg'
import Wallet_Card from '../../shared/assets/course/Wallet_Card.svg'
import PaymentButton from '../CoursePage/ui/PaymentButton/PaymentButton'
import styles from './PaymentPage.module.css'

const PaymentPage: FC = () => {
	window.scrollTo(0, 0)

	var BackButton = window.Telegram.WebApp.BackButton
	BackButton.show()
	BackButton.onClick(function () {
		BackButton.hide()
	})
	window.Telegram.WebApp.onEvent('backButtonClicked', function () {
		window.history.back()
	})

	function handleFail() {
		setNotification(false)
		window.document.body.style.overflow = 'visible'
		document.documentElement.style.overflow = 'visible'
	}

	const location = useLocation()
	const navigate = useNavigate()
	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	const data = location.state

	const [exchangeRate, setExchangeRate] = useState(null)
	const [paymentLink, setPaymentLink] = useState(null)
	const [notification, setNotification] = useState(false)
	const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Wallet'>('Card')

	const userCourses = useUserCourses(window.Telegram.WebApp.initData)

	const address = useTonAddress()

	useEffect(() => {
		if (address) {
			setPaymentMethod('Wallet')
		} else {
			setPaymentMethod('Card')
		}
	}, [address])

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
		if ((paymentMethod === 'Wallet' && address) || paymentMethod === 'Card') {
			handlePay(
				paymentMethod,
				tonConnectUI,
				myTransaction,
				data,
				address,
				navigate,
				paymentLink ?? ''
			)
		} else if (paymentMethod === 'Wallet' && !address) {
			setNotification(true)
			window.document.body.style.overflow = 'hidden'
			document.documentElement.style.overflow = 'hidden'
		}
	}

	const averageRate = useMemo(() => {
		const feedback = data?.feedback ?? []
		return feedback.length > 0 ? calculateRating(feedback) : 0
	}, [data?.feedback])

	const isAuthor = data?.user.user_id === userCourses?.user_id

	const handlePaymentMethod = (method: 'Card' | 'Wallet') => {
		if (paymentMethod !== method) {
			setPaymentMethod(method)
		}
	}

	return (
		<div className={styles['payment']}>
			<CourseCard
				isCoursePage={true}
				chanelName={data?.channel.name || 'Название курса'}
				chanelPhoto={data?.channel.photo || ''}
				price={
					paymentMethod === 'Wallet' ? data?.price * 0.9 : data?.price || 0
				}
				university={userCourses?.university || ''}
				itemCard={data as ICourse}
				isAuthor={isAuthor}
				cid={data.cid || ''}
			/>

			<section className={styles['payment__stats']}>
				<Sales count={data?.amount_of_students || 0} />
				<Feedback
					averageRate={averageRate}
					isCoursePage={true}
					path={`/course-feedback/${data.cid || ''}`}
					count={data?.feedback.length || 0}
				/>
			</section>

			<div className={styles['payment__section']}>
				<h2 className={styles['payment__section-title']}>
					Выберите способ оплаты курса
				</h2>
				<div className={styles['payment__variants']}>
					<PaymentButton
						isCrypto={false}
						path={Credit_Card}
						isActive={paymentMethod === 'Card'}
						onClick={() => handlePaymentMethod('Card')}
					/>
					<PaymentButton
						isCrypto={true}
						pathCrypto={Wallet_Card}
						isActive={paymentMethod === 'Wallet'}
						onClick={() => handlePaymentMethod('Wallet')}
					/>
				</div>
			</div>

			{/* <div className={styles['payment__wallet']}>
				<h2 className={styles['payment__wallet-title']}>Кошелёк</h2>
				<WalletBalance />
			</div> */}

			{notification && (
				<div className={styles['payment__notification']}>
					<ModalNotification
						text='Подключите криптокошелёк в профиле'
						title='Внимание'
						onClose={handleFail}
					/>
				</div>
			)}

			<MainButton onClickEvent={handlePayment} text='Оплатить' />
		</div>
	)
}

export default PaymentPage
