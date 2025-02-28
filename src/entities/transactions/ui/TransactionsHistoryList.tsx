import { FC, useEffect, useState } from 'react'
import { ITransaction } from 'src/entities/course/model/types'
import { fetchUserTransactions } from 'src/entities/wallet/model/fetchUserTransactions'
import TransactionCard from 'src/shared/components/TransactionCard/TransactionCard'
import LogoTransaction from '../../../shared/assets/wallet/LogoTransaction.svg'
import styles from './TransactionsHistoryList.module.css'

export const TransactionsHistoryList: FC = () => {
	const { id } = window.Telegram.WebApp.initDataUnsafe.user

	const [coursesPaid, setCoursesPaid] = useState<ITransaction[]>([])
	const [coursesSelled, setCoursesSelled] = useState([])
	const [tType, setTType] = useState('')

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

	const allTransactions: ITransaction[] = [...coursesPaid, ...coursesSelled]

	console.log(allTransactions)

	const transactions = allTransactions.map((item, index) => {
		if (coursesPaid.some(transaction => transaction.id === item.id)) {
			setTType('Покупка')
		} else {
			setTType('Продажа')
		}
	})

	return (
		<>
			{allTransactions.length === 0 ? (
				<div className={styles['transactions-history-list__wrapper-empty']}>
					<p className={styles['transactions-history-list__empty-text']}>
						История транзакций пока пуста. Рассмотри возможность совершения
						покупки или продажи своего курса.
					</p>
				</div>
			) : null}
			<div className={styles['transactions-history-list']}>
				{allTransactions.map((item, index) => (
					<TransactionCard
						path={LogoTransaction}
						count={item.price}
						name='Commn Course'
						operationName={tType}
						sign={tType === 'Покупка' ? `-` : tType === 'Продажа' ? `+` : ''}
						typeCount={
							item.method === 'Card'
								? 'Криптовалюта'
								: item.method === 'Wallet'
								? '**5263'
								: ''
						}
						className={
							tType === 'Покупка'
								? styles['transactions-history-list__card_isActive_false']
								: tType === 'Продажа'
								? styles['transactions-history-list__card_isActive_true']
								: ''
						}
						key={index}
					/>
				))}
			</div>
		</>
	)
}
