import { FC, useEffect, useState } from 'react'
import { ITransaction } from 'src/entities/course/model/types'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import styles from './TransactionsHistoryList.module.css'

export const TransactionsHistoryList: FC = () => {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	const [coursesPaid, setCoursesPaid] = useState<ITransaction[]>([])
	const [coursesSelled, setCoursesSelled] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)
			console.log(result)

			if (result) {
				setCoursesPaid(result.paid_courses)
				setCoursesSelled(result.selled_courses)
			}
		}

		fetchData()
	}, [id])

	const allTransactions = [...coursesPaid, ...coursesSelled]

	console.log(allTransactions)

	{
		!allTransactions ? (
			<div className={styles['transactions-history-list__wrapper-empty']}>
				<p className={styles['transactions-history-list__empty-text']}>
					История транзакций пока пуста. Рассмотри возможность совершения
					покупки или продажи своего курса.
				</p>
			</div>
		) : null
	}

	// 	const transactions = allTransactions.map((item, index) => {
	// 		var t_type = ''
	// if (coursesPaid.some(transaction => transaction.id === item.id)) {
	// 			t_type = 'Покупка'
	// 		} else {
	// 			t_type = 'Продажа'
	// 		}
	// return (
	// 			<Link to={`/transaction/${item.id}`} className='transaction_card'>
	// 				<div
	// 					className='points'
	// 					style={{
	// 						backgroundColor: 'black',
	// 						borderRadius: '8px',
	// 						paddingBottom: '8px',
	// 					}}
	// 				>
	// 					<div
	// 						className='point_t'
	// 						style={{
	// 							fontFamily: 'NeueMachina',
	// 							fontSize: '16px',
	// 							lineHeight: '20px',
	// 						}}
	// 					>
	// 						<b>{item.course.channel.name}</b>
	// 					</div>
	// 					<div
	// 						className='point_t'
	// 						style={{ color: '#AAAAAA', fontSize: '14px' }}
	// 					>
	// 						{item.course.university}
	// 					</div>
	// 					<div
	// 						className='point_t'
	// 						style={{ color: '#AAAAAA', marginTop: '4px', fontSize: '14px' }}
	// 					>
	// 						{formatDate(item.course.date || 'Дата не указана')}
	// 					</div>
	// 				</div>
	// 				<div className='points' style={{ marginTop: '0px' }}>
	// 					<div
	// 						className='point'
	// 						style={{
	// 							fontFamily: 'NeueMachina',
	// 							fontSize: '16px',
	// 							lineHeight: '20px',
	// 							marginLeft: '4px',
	// 						}}
	// 					>
	// 						<b>{t_type}</b>
	// 					</div>
	// 					<div
	// 						className='point'
	// 						style={{ color: '#AAAAAA', fontSize: '14px', marginLeft: '4px' }}
	// 					>
	// 						{item.method}
	// 					</div>
	// 					<div
	// 						className='point'
	// 						style={{
	// 							color: '#AAAAAA',
	// 							marginTop: '4px',
	// 							fontSize: '14px',
	// 							marginLeft: '4px',
	// 						}}
	// 					>
	// 						{formatDate(item.date)}
	// 					</div>
	// 				</div>

	// 				<div className='t_price_status' style={{ marginBottom: '8px' }}>
	// 					<div className='t_price' style={{ marginLeft: '8px' }}>
	// 						{item.price} RUB
	// 					</div>
	// 					{item.return_status === 0 && (
	// 						<div className='course_status'>Успешно</div>
	// 					)}
	// 					{item.return_status === 1 && (
	// 						<div className='course_status'>Возврат на рассмотрении</div>
	// 					)}
	// 					{item.return_status === 2 && (
	// 						<div className='course_status'>Возврат</div>
	// 					)}
	// 				</div>
	// 			</Link>
	// 		)
	// 	})

	return (
		<div className={styles['transactions-history-list']}>
			<h3 className={styles['transactions-history-list__title']}>Сегодня</h3>
		</div>
	)
}
