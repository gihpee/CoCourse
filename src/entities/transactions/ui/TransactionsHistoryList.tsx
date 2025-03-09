import { format, isToday, isYesterday, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { FC, useEffect, useState } from 'react'
import { ITransaction } from 'src/entities/course/model/types'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import TransactionCard from 'src/shared/components/TransactionCard/TransactionCard'
import LogoTransaction from '../../../shared/assets/wallet/LogoTransaction.svg'
import styles from './TransactionsHistoryList.module.css'

const formatDate = (dateString: string) => {
	const date = parseISO(dateString)

	if (isToday(date)) return 'Сегодня'
	if (isYesterday(date)) return 'Вчера'

	return format(date, 'd MMMM, EEEE', { locale: ru })
}

const groupTransactionsByDate = (transactions: ITransaction[]) => {
	return transactions.reduce((acc, transaction) => {
		const dateKey = formatDate(transaction.date)
		if (!acc[dateKey]) {
			acc[dateKey] = []
		}
		acc[dateKey].push(transaction)
		return acc
	}, {} as Record<string, ITransaction[]>)
}

export const TransactionsHistoryList: FC<{
	onSelectTransaction: (data: {
		transaction: ITransaction
		tType: string
	}) => void
}> = ({ onSelectTransaction }) => {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	const [coursesPaid, setCoursesPaid] = useState<ITransaction[]>([])
	const [coursesSelled, setCoursesSelled] = useState<ITransaction[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchUserTransactions(id)

			if (result) {
				setCoursesPaid(result.paid_courses)
				setCoursesSelled(result.selled_courses)
			}
		}

		fetchData()
	}, [id])

	const allTransactions: ITransaction[] = [...coursesPaid, ...coursesSelled]

	const groupedTransactions = Object.entries(
		groupTransactionsByDate(allTransactions)
	).sort(
		(a, b) =>
			new Date(b[1][0].date).getTime() - new Date(a[1][0].date).getTime()
	)

	return (
		<>
			{allTransactions.length === 0 ? (
				<div className={styles['transactions-history-list__wrapper-empty']}>
					<p className={styles['transactions-history-list__empty-text']}>
						История транзакций пока пуста. Рассмотри возможность совершения
						покупки или продажи своего курса.
					</p>
				</div>
			) : (
				<div className={styles['transactions-history-list']}>
					{groupedTransactions.map(([date, transactions]) => (
						<div
							className={styles['transactions-history-list__wrapper-day']}
							key={date}
						>
							<h3 className={styles['transactions-history-list__title']}>
								{date}
							</h3>
							<div
								className={
									styles['transactions-history-list__wrapper-day-cards']
								}
							>
								{transactions.map((item, index) => {
									const tType = coursesPaid.some(
										transaction => transaction.id === item.id
									)
										? 'Покупка'
										: 'Продажа'

									return (
										<TransactionCard
											key={item.id}
											path={LogoTransaction}
											count={item.price}
											name={
												item.return_status === 2 && item.buyer === id
													? 'Возврат средств'
													: 'Commn Course'
											}
											operationName={
												item.return_status === 2 && item.buyer === id
													? 'Возврат'
													: tType
											}
											sign={
												item.return_status === 2 && item.buyer === id
													? '+'
													: tType === 'Покупка'
													? `-`
													: `+`
											}
											typeCount={
												item.method === 'Card'
													? 'Карта'
													: item.method === 'Wallet'
													? 'Криптовалюта'
													: ''
											}
											className={
												item.return_status === 2 && item.buyer === id
													? styles[
															'transactions-history-list__card_isActive_true'
													  ]
													: tType === 'Покупка'
													? styles[
															'transactions-history-list__card_isActive_false'
													  ]
													: styles[
															'transactions-history-list__card_isActive_true'
													  ]
											}
											onClick={() =>
												onSelectTransaction({ transaction: item, tType })
											}
										/>
									)
								})}
							</div>
						</div>
					))}
				</div>
			)}
		</>
	)
}
