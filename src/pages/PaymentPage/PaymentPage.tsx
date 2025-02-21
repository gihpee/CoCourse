import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { FC, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { calculateRating } from 'src/entities/course/lib/calculateRating'
import { fetchExchangeRate } from 'src/entities/course/model/fetchExchangeRate'
import { fetchPaymentLink } from 'src/entities/course/model/fetchLink'
import { handlePay } from 'src/entities/course/model/paymentHandler'
import { createTransaction } from 'src/entities/course/model/transaction'
import { ICourse } from 'src/entities/course/model/types'
import { useCourseData } from 'src/entities/course/model/useCourseData'
import { useUserCourses } from 'src/entities/course/model/useUserCourses'
import CourseCard from 'src/features/courses/components/CourseCard/CourseCard'
import { WalletBalance } from 'src/features/WalletBalance/WalletBalance'
import Feedback from 'src/shared/components/Feedback/Feedback'
import MainButton from 'src/shared/components/MainButton/MainButton'
import Sales from 'src/shared/components/Sales/Sales'
import Credit_Card from '../../shared/assets/course/Credit_Card.svg'
import Wallet_Card from '../../shared/assets/course/Wallet_Card.svg'
import PaymentButton from '../CoursePage/ui/PaymentButton/PaymentButton'
import styles from './PaymentPage.module.css'

const PaymentPage: FC = () => {
	window.scrollTo(0, 0)
	const location = useLocation()
	const navigate = useNavigate()
	const { id } = window.Telegram.WebApp.initDataUnsafe.user
	const { cid } = useParams()
	const { data: courseDataComponent } = useCourseData(cid || '')

	console.log(cid)
	const data = location.state

	const [exchangeRate, setExchangeRate] = useState(null)
	const [paymentLink, setPaymentLink] = useState(null)
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

	const averageRate = useMemo(() => {
		const feedback = courseDataComponent?.feedback ?? []
		return feedback.length > 0 ? calculateRating(feedback) : 0
	}, [courseDataComponent?.feedback])

	const isAuthor = courseDataComponent?.user.user_id === userCourses?.user_id

	const handlePaymentMethod = (method: 'Card' | 'Wallet') => {
		if (paymentMethod !== method) {
			setPaymentMethod(method)
		}
	}

	return (
		<div className={styles['payment']}>
			<CourseCard
				isCoursePage={true}
				chanelName={courseDataComponent?.channel.name || 'Название курса'}
				chanelPhoto={courseDataComponent?.channel.photo || ''}
				price={courseDataComponent?.price || 0}
				university={userCourses?.university || ''}
				itemCard={courseDataComponent as ICourse}
				isAuthor={isAuthor}
			/>

			<section className={styles['payment__stats']}>
				<Sales />
				<Feedback averageRate={averageRate} isCoursePage={true} />
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

			<div className={styles['payment__wallet']}>
				<h2 className={styles['payment__wallet-title']}>Кошелёк</h2>
				<WalletBalance />
			</div>

			<MainButton onClickEvent={handlePayment} text='Оплатить' />
		</div>
	)
}

export default PaymentPage
